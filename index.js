const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Dummy database
let habits = [];

//Fungsi untuk mengambil data habits
app.get('/habits', (req, res) => {
    res.json(habits);
});

//Fungsi untuk membuat habit baru
app.post('/habits', (req, res) => {
    const { name } = req.body;
    //memastikan nama habit tidak kosong
    if (!name) {
        return res.status(400).json({ error: 'Habit name is required' });
    }

    saveHabits(() => {
        console.log('New habit saved!');
    });

    const newHabit = { id: habits.length + 1, name, completed: false };
    habits.push(newHabit);

    res.status(201).json(newHabit);
});

//Fungsi untuk mengubah status habit
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
        saveHabits(() => {
            console.log(`Habit ${habitId} marked as done and saved.`);
        });
        res.json({ message: `Habit ${habitId} marked as done` });
    } else {
        res.status(404).json({ error: 'Habit not found' });
    }
});

//Fungsi untuk menyimpan habits
const fs = require('fs');

async function saveHabits() {
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.writeFileSync('db.json', JSON.stringify(habits, null, 2));
            console.log('Habits saved!');
            resolve();
        }, 2000); //menunggu 2 detik baru lanjut
    });
}


// Start server dari port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
