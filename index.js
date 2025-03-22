const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose'); // Import Mongoose

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const path = require('path'); // Add this line
const app = express();
const PORT = 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views')); // Add this line

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Add this line

// Middleware for session management
app.use(session({
    secret: 'your_secret_key', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let habits = []; // In-memory storage for habits

// Route to get all habits
app.get('/habits', (req, res) => {
    res.json(habits); // Send the list of habits as a JSON response
});

// Route to create a new habit
app.post('/habits', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Habit name is required' });
    }

    const newHabit = { id: habits.length + 1, name, completed: false };
    habits.push(newHabit);
    res.status(201).json(newHabit); // Respond with the newly created habit
});

// Route to update a habit's status
app.put('/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex(habit => habit.id === habitId);

    if (habitIndex !== -1) {
        habits[habitIndex].completed = true; // Mark the habit as completed
        res.json({ message: `Habit ${habitId} marked as done` });
    } else {
        res.status(404).json({ error: 'Habit not found' });
    }
});

// Route to delete a habit
app.delete('/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex(habit => habit.id === habitId);

    if (habitIndex !== -1) {
        habits.splice(habitIndex, 1); // Remove the habit from the array
        res.json({ message: `Habit ${habitId} deleted` });
    } else {
        res.status(404).json({ error: 'Habit not found' });
    }
});

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

// Use the authentication routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
