const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('📩 New Contact Message:', { name, email, message });
   
    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
