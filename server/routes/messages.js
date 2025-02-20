const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET messages by country
router.get('/:country', async (req, res) => {
  try {
    const messages = await Message.find({ 
      country: req.params.country 
    }).sort({ timestamp: -1 });
    
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new message
router.post('/', async (req, res) => {
  const message = new Message({
    name: req.body.name,
    country: req.body.country,
    message: req.body.message
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;