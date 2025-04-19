// services/sheet.js
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const User = require('./userModel'); // Import the user model
// Example function to get the list of habits
const Habit = require('./habitModel'); // Import the Mongoose model

const habitList = async (userId) => {
        const habits = await Habit.find({ userId }); // Retrieve habits from MongoDB
        console.log('Retrieved habits:', habits); // Log the retrieved habits
        return habits;
};

const addHabit = async (name, userId, category) => {
    const newHabit = new Habit({ name, userId, category});
    await newHabit.save(); // Save the new habit to MongoDB
    return newHabit; //return the newly added habits
};

const markDone = async (id, userId) => {
    const updatedHabit = await Habit.findOneAndUpdate(
        { _id: id, userId },
        { completed: true },
        { new: true }
    );
    if (!habit) throw new Error("Habit not found or unauthorized");
    return updatedHabit;
};

const deleteHabit = async (id, userId) => {
    const habit = await Habit.findOneAndDelete({ _id: id, userId });
    if (!habit) throw new Error("Habit not found or unauthorized");
    return habit;
};

//Checks if the user input meets the requirement
const validateUser = async (username, email, password, confPass) => {
    if(!username || !email || !password){
        throw new Error('All fields are required');
    }
    if(password.length<8){
        throw new Error('Password must be at least 8 characters long');
    }
    if(confPass != password){
        throw new Error('Password does not match');
    }
};

const hashPassword = async (password) => {
    const saltRounds = 10; // Number of rounds for hashing
    return await bcrypt.hash(password, saltRounds); // Hash the password
};

const registerUser = async (username, email, password, confPass) => {
    await validateUser(username, email, password, confPass); // Ensure this function is awaited
    const hashedPassword = await hashPassword(password); // Hash the password
    const newUser = new User({
        name: username,
        email,
        password: hashedPassword
    });
    await newUser.save(); // Save the user to MongoDB
    console.log('User registered:', newUser);
};

const registration = async (username, email, password, confPass) => {
    return await registerUser(username, email, password, confPass);
};

// Function to log in a user
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
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
