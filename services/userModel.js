const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from environment variables
const connect = mongoose.connect(MONGO_URI); // Connect to MongoDB database

// Check if it successfully connected to the correct database
connect.then(() => {
    console.log("Users database connected successfully!")
})
.catch(() => {
    console.log("Users database connection failed!")
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
