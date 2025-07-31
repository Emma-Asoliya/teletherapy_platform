const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/cloudinary'); // Ensure this is the correct path to your upload middleware
const verifyToken = require('../middleware/auth');
const crypto = require('crypto');


const getUserData = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  profilePicture: user.profilePicture,
  gender: user.gender,
  dob: user.dob,
  ...(user.role === 'therapist' && {
    qualifications: user.qualifications,
    specializations: user.specializations
  })
});

router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, email, password, role, gender, dob, qualifications, specializations } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      gender,
      dob,
      profilePicture: req.file?.path,
      ...(role === 'therapist' && {
        qualifications,
        specializations
      })
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture || '' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: getUserData(user)
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error during signup' 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, profilePicture: user.profilePicture || '' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: getUserData(user)
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Server error during login' 
    });
  }
});

router.put('/update-profile', verifyToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email, bio, specializations, qualifications } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(bio && { bio }),
      ...(qualifications && { qualifications }),
      ...(specializations && {
        specializations: Array.isArray(specializations)
          ? specializations
          : specializations.split(',').map(s => s.trim())
      })
    };

    if (req.file) {
      updateData.profilePicture = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: getUserData(updatedUser),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
    });
  }
});


router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Access granted to protected route',
    user: req.user
  });
});

router.get('/therapists', async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist' }).select('_id name specializations qualifications profilePicture');
    res.status(200).json({ success: true, therapists });
  } catch (err) {
    console.error('Error fetching therapists:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch therapists' });
  }
});

const resetTokens = new Map();
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: 'No user with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600 * 1000; 

    resetTokens.set(token, { userId: user._id.toString(), expires });

    console.log(`Password reset token for ${email}: ${token}`);

    res.json({
      success: true,
      message: 'Password reset link sent to your email (simulated)',
      token,
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword)
    return res.status(400).json({ success: false, message: 'Token and new password required' });

  const record = resetTokens.get(token);

  if (!record) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }

  if (Date.now() > record.expires) {
    resetTokens.delete(token);
    return res.status(400).json({ success: false, message: 'Token expired' });
  }

  try {
    const user = await User.findById(record.userId);
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    resetTokens.delete(token);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




module.exports = router;
