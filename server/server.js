require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messages');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
const SERVER_URL = process.env.RENDER_URL || `https://rat-server-2299.onrender.com`; // Replace with your Render URL

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Keep server awake by pinging itself every 14 minutes
  setInterval(() => {
    axios.get(SERVER_URL)
      .then(response => {
        console.log(`Self-ping at ${new Date().toISOString()}: Status ${response.status}`);
      })
      .catch(error => {
        console.error(`Self-ping failed at ${new Date().toISOString()}:`, error.message);
      });
  }, 740000); // 14 minutes (Render auto-spins down after 15 mins)
});
