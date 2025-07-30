const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  sessionType: {
    type: String,
    default: 'Therapy Session'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
