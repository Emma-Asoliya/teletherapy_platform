const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointments');
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

router.post('/book', verifyToken, async (req, res) => {
  try {
    const { therapist, time, sessionType } = req.body;

    if (!therapist || !time) {
      return res.status(400).json({ success: false, message: 'Therapist and time are required.' });
    }

    const appointment = new Appointment({
      client: req.user.userId,
      therapist,
      time,
      sessionType: sessionType || 'Therapy Session',
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      appointment,
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ success: false, message: 'Failed to book appointment.' });
  }
});

router.get('/therapists', verifyToken, async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist' }).select('-password');
    res.status(200).json({ success: true, therapists });
  } catch (err) {
    console.error('Error fetching therapists:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch therapists' });
  }
});

router.get('/client', verifyToken, async (req, res) => {
  try {
    const clientId = req.user.userId;
    const appointments = await Appointment.find({ client: clientId })
      .populate('therapist', 'name email profilePicture');

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    console.error('Fetch client appointments error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
});

router.get('/therapist', verifyToken, async (req, res) => {
  try {
    const therapistId = req.user.userId;
    const appointments = await Appointment.find({ therapist: therapistId })
      .populate('client', 'name email profilePicture')
      .populate('therapist', 'name email profilePicture');

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    console.error('Fetch therapist appointments error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
});

router.put('/:id/reschedule', verifyToken, async (req, res) => {
  const appointmentId = req.params.id;
  const { newTime } = req.body;

  if (!newTime)
    return res.status(400).json({ success: false, message: 'New time is required' });

  try {
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      $or: [{ client: req.user.userId }, { therapist: req.user.userId }],
    });

    if (!appointment)
      return res.status(404).json({ success: false, message: 'Appointment not found or unauthorized' });

    appointment.time = newTime;
    await appointment.save();

    res.json({ success: true, message: 'Appointment rescheduled', appointment });
  } catch (err) {
    console.error('Reschedule error:', err);
    res.status(500).json({ success: false, message: 'Failed to reschedule appointment' });
  }
});

router.delete('/:id/cancel', verifyToken, async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      $or: [{ client: req.user.userId }, { therapist: req.user.userId }],
    });

    if (!appointment)
      return res.status(404).json({ success: false, message: 'Appointment not found or unauthorized' });

    await Appointment.findByIdAndDelete(appointmentId);

    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (err) {
    console.error('Cancel error:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel appointment' });
  }
});

module.exports = router;
