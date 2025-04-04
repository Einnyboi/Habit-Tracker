const express = require("express");
const router = express.Router();
const { loginUser, registration } = require('../services/sheet');

// GET login page
router.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render('pages/login');
    }
});

// POST login logic
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        req.session.user = user.name;
        res.redirect("/habits");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET register page
router.get("/register", (req, res) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.render('pages/register');
    }
});

// POST register logic
router.post("/register", async (req, res) => {
    const { username, email, password, confPass } = req.body;
    try {
        await registration(username, email, password, confPass);
        res.redirect("/auth/login");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");
});

module.exports = router;
