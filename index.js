// Simple Habit Tracker (Backend + Basic Frontend Example)
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Dummy database
let habits = [];

// Function to get all habits
app.get('/habits', (req, res) => {
    res.json(habits);
});

// Function to add a new habit
app.post('/habits', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Habit name is required' });
    }
    const newHabit = { id: habits.length + 1, name, completed: false };
    habits.push(newHabit);
    res.status(201).json(newHabit);
});

// Function to mark a habit as completed
app.put('/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    let found = false;

    for (let i = 0; i < habits.length; i++) {
        if (habits[i].id === habitId) {
            habits[i].completed = true;
            found = true;
            break;
        }
    }

    if (found) {
        res.json({ message: `Habit ${habitId} marked as completed` });
    } else {
        res.status(404).json({ error: 'Habit not found' });
    }
});

// Simulating async operation (saving habits)
function saveHabits(callback) {
    console.log('Saving habits...');
    setTimeout(() => {
        console.log('Habits saved!');
        callback();
    }, 2000);
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
