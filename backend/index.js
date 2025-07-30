const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const appointmentRoutes = require('./routes/appointments');

dotenv.config();

const app = express();

console.log("index.js loaded");

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use(express.static(path.join(__dirname, '../public')));

//app.get('*', (req, res) => {
 // res.sendFile(path.join(__dirname, '../public/index.html'));
//});

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Frontend should be running on: http://localhost:5500`); 
});
