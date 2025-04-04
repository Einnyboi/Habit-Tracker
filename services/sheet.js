// services/sheet.js
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

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
    return newHabit; //return the newly added habits
};

const markDone = async (id) => {
    const updatedHabit = await Habit.findByIdAndUpdate(id, { completed: true }, {new : true}); // Mark the habit as completed
    return updatedHabit;
};

const deleteHabit = async (id) => {
    await Habit.findByIdAndDelete(id); // Delete the habit from MongoDB
    return deletedHabit;
};

//need to import the user model
const collection = require('./userModel'); // Import the user model

//Checks if the user input meets the requirement
const validateUser = async (username, email, password, confPass) => {
    if(!username || !email || !password){
        throw new Error('All fields are required');
    }
    if(password.length<4){
        throw new Error('Password must be at least 8 characters long');
    }
    if(confPass != password){
        throw new Error('Password does not match');
    }
};

const hashPassword = async (password) => {
    const saltRounds = 10; // Number of rounds for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
    return hashedPassword;
};

const User = require('./userModel'); // Import the user model

const registerUser = async (username, email, password, confPass) => {
    await validateUser(username, email, password, confPass); // Ensure this function is awaited
    const hashedPassword = await hashPassword(password); // Hash the password
    const newUser = new User({
        name: username,
        email: email,
        password: hashedPassword
    });
    await newUser.save(); // Save the user to MongoDB
    console.log('User registered:', newUser);
};

const registration = async (username, email, password, confPass) => {
    await registerUser(username, email, password, confPass);
};

// Function to log in a user
const loginUser = async (email, password) => {
    const user = await collection.findOne({ email : email });
    if (!user) {
        throw new Error('Email not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid password');
    }
    return user; // Return user upon success
};


// Export the functions
module.exports = {
    habitList,
    addHabit,
    markDone,
    deleteHabit,
    validateUser,
    hashPassword,
    registerUser,
    registration,
    loginUser,
    // Add other functions as needed
};
