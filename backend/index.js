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
const PORT = process.env.PORT || 5000;
const frontendPath = path.join(__dirname, '../frontend');

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(frontendPath));

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

//app.get('*', (req, res, next) => {
//  if (req.path.startsWith('/api')) return next();
  //res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
    //if (err) {
      //console.error('Failed to send index.html:', err);
      //res.status(500).send('Frontend not found');
    //}
  //});
//});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API: http://localhost:${PORT}`);
    console.log(`Frontend: http://localhost:5500`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));
