const express = require("express");
const router = express.Router();
const { habitList, addHabit, markDone, deleteHabit } = require('../services/sheet');

// Return habits as JSON for frontend JS
router.get('/api/habits', async (req, res) => {
    try {
        const habits = await habitList(req.session.user._id);
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
});

// Renders the main habit list page
router.get('/', async (req, res) => {
    if (!req.session.user || !req.session.user._id) {
        return res.redirect("/auth/login");
    }
    try {
        const habits = await habitList(req.session.user._id);
        res.render('pages/main', { habits });
    } catch (error) {
        console.error(error);
        res.status(500).render('pages/main', { habits: [], error: 'Failed to load habits' });
    }
});

// Adds a new habit
router.post("/", async (req, res) => {
    if (!req.session.user || !req.session.user._id) {
        return res.status(401).json({ error: "User not logged in or session expired" });
    }

    const { name, category } = req.body;
    try {
        await addHabit(name, req.session.user._id, category); 
        res.status(201).json({ message: 'Habit added' });
    } catch (error) {
        console.error("Error adding habit:", error);
        res.status(500).json({ error: "Failed to add habit" });
    }
});

// Mark a habit as done
router.put('/:id/done', async (req, res) => {
    if (!req.session.user || !req.session.user._id) {
        return res.status(401).json({ error: "User not logged in" });
    }
    try {
        await markDone(req.params.id, req.session.user._id);
        res.status(200).json({ message: 'Habit marked as done' });
    } catch (error) {
        console.error("Mark done error:", error);
        res.status(500).json({ error: 'Failed to mark habit done' });
    }
});

// Delete a habit
router.delete('/:id', async (req, res) => {
    if (!req.session.user || !req.session.user._id) {
        return res.status(401).json({ error: "User not logged in" });
    }
    try {
        await deleteHabit(req.params.id, req.session.user._id);
        res.status(200).json({ message: 'Habit deleted' });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: 'Failed to delete habit' });
    }
});

module.exports = router;
