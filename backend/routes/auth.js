const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');

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
      profilePicture: req.file?.filename,
      ...(role === 'therapist' && {
        qualifications,
        specializations
      })
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
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
      { userId: user._id, email: user.email, role: user.role },
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

const authMiddleware = require('../middleware/auth');
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Access granted to protected route',
    user: req.user
  });
});

module.exports = router;