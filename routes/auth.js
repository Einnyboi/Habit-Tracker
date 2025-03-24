const express = require("express");
const router = express.Router();
const { habitList, addHabit,
    markDone, deleteHabit } = require
    ('../services/sheet'); // Import functions from sheet.js

router.get("/login", async function(req, res){
    if(req.session.user){
        res.redirect("/");
    }else{
        res.render('pages/login');
    }
});

router.post("/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if (username === "admin" && password === "admin"){
        // Impement sessions to check user is logged in
        req.session.user = "admin";
        // Redirecting to member area
        res.redirect("/");
    } else {
        // redirect and render login page with error message
        return res.render ("pages/login", {
            error : "Wrong username or password"
        });
    }
});

router.get('/logout', (req,res) =>{
    //destroy all session
    req.session.destroy();

    //redirect to login page
    res.redirect('/auth/login');
})

router.get('/habits', async (req, res) => {
    try {
        const habits = await habitList(); // Call the habitList function
        console.log('Habits to render:', habits); // Log the habits before rendering
        res.render('pages/main', { habits }); // Render the main page with habits
    } catch (error) {
        console.error('Error fetching habits:', error); // Log any errors
        res.status(500).render('pages/main', { error: 'Failed to fetch habits', habits: [] }); // Render with an error message
    }
});


// Route to add a new habit
router.post('/habits', async (req, res) => {
    const { name } = req.body;
    console.log('Received habit name:', name); // Log the received habit name

    try {
        await addHabit(name); // Call the addHabit function
        res.status(201).json({ message: `Habit added: ${name}` }); // Return a JSON response
    } catch (error) {
        console.error('Error adding habit:', error); // Log any errors
        res.status(500).json({ error: 'Failed to add habit' }); // Return an error response
    }
});


// Route to mark a habit as done
router.post('/habits/:id/done', (req, res) => {
    const { id } = req.params;
    markDone(id); // Call the markDone function
    res.send(`Habit ${id} marked as done.`);
});

// Route to delete a habit
router.delete('/habits/:id', (req, res) => {
    const { id } = req.params;
    deleteHabit(id); // Call the deleteHabit function
    res.send(`Habit ${id} deleted.`);
});


module.exports = router;
