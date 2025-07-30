const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['client', 'therapist'],
    default: 'client'
  },

  
  // budget: {
  //   type: String,
  //   default: ''
  // },


  qualifications: {
    type: String,
    default: ''
  },

  specializations: {
    type: String,
    default: ''
  },

  profilePicture: {
    type: String, 
    default: null,
  },

  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
