const express = require("express");
const router = express.Router();
const { habitList, addHabit, markDone, deleteHabit } = require('../services/sheet');

// Return habits as JSON for frontend JS
router.get('/api/habits', async (req, res) => {
    try {
        const habits = await habitList();
        res.json(habits); // Just send raw data
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
});

router.get('/', async (req, res) => {
    try {
        const habits = await habitList(); // get data
        res.render('pages/main', { habits }); // render EJS page
    } catch (error) {
        console.error(error);
        res.status(500).render('pages/main', { habits: [], error: 'Failed to load habits' });
    }
});

router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        await addHabit(name);
        res.status(201).json({ message: 'Habit added' });
    } catch (error) {
        console.error("Error adding habit:", error);
        res.status(500).json({ error: "Failed to add habit" });
    }
});

router.post('/:id/done', async (req, res) => {
    try {
        await markDone(req.params.id);
        res.status(200).json({ message: 'Habit marked as done' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark habit done' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteHabit(req.params.id);
        res.status(200).json({ message: 'Habit deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
});

module.exports = router;
