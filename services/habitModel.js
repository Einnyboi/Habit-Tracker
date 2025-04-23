const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from environment variables
const connect = mongoose.connect(MONGO_URI); // Connect to MongoDB database

//to check if it successfully connected to the correct database
connect.then(() => {
    console.log("Habits database connected successfully!")
})
.catch(()=>{
    console.log("Habits database connection failed!")
});

const habitSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true
    },
    target: {
      type: Number,
      default: 1,
      min: 1
    },
    current: {
      type: Number,
      default: 0
    },
    lastCompleted: {
      type: Date // optional, for tracking cooldowns
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
