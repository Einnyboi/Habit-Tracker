// services/sheet.js

// Example function to get the list of habits
const Habit = require('./habitModel'); // Import the Mongoose model

const habitList = async () => {
    const habits = await Habit.find(); // Retrieve habits from MongoDB
    console.log('Retrieved habits:', habits); // Log the retrieved habits
    return habits;
};


const addHabit = async (name) => {
    const newHabit = new Habit({ name });
    await newHabit.save(); // Save the new habit to MongoDB
};

const markDone = async (id) => {
    await Habit.findByIdAndUpdate(id, { completed: true }); // Mark the habit as completed
};

const deleteHabit = async (id) => {
    await Habit.findByIdAndDelete(id); // Delete the habit from MongoDB
};


// Export the functions
module.exports = {
    habitList,
    addHabit,
    markDone,
    deleteHabit,
    // Add other functions as needed
};
