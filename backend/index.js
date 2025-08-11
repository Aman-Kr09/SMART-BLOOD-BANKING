// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/contact', contactRoutes);  // POST goes to /api/contact

app.post('/predict', async (req, res) => {
  try {
    // Forward the request to the Python backend
    const response = await axios.post('http://localhost:4000/predict', req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Prediction service unavailable.' });
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/donation_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});
