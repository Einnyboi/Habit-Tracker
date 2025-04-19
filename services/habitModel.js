const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/mydb"); // Connect to MongoDB database

//to check if it successfully connected to the correct database
connect.then(() => {
    console.log("Habits database connected successfully!")
})
.catch(()=>{
    console.log("Habits database connection failed!")
});

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // Reference to the User model's ObjectId
    category: String,
    streak: { type: Number, default: 0 },
    lastCompleted: Date
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
