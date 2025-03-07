const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

const dbPath = 'db.json';

// Load data dari db.json saat server start
let habits = loadHabits();

function loadHabits() {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('⚠️ Gagal membaca database, membuat baru...');
        return [];
    }
}

// Fungsi untuk mengambil data habits
app.get('/habits', (req, res) => {
    res.json(habits);
});

// Fungsi untuk membuat habit baru
app.post('/habits', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Habit name is required' });
    }

    const newHabit = { id: habits.length + 1, name, completed: false };
    habits.push(newHabit);

    await saveHabits();

    res.status(201).json(newHabit);
});

// Fungsi untuk mengubah status habit
app.put('/habits/:id', async (req, res) => {
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
        await saveHabits();
        res.json({ message: `Habit ${habitId} marked as done` });
    } else {
        res.status(404).json({ error: 'Habit not found' });
    }
});

// Fungsi untuk menyimpan habits
async function saveHabits() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                fs.writeFileSync(dbPath, JSON.stringify(habits, null, 2));
                console.log('✅ Habits saved!');
                resolve();
            } catch (error) {
                console.error('❌ Gagal menyimpan habits:', error);
                reject(error);
            }
        }, 2000);
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
