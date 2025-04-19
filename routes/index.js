// routes/index.js
const express = require('express');
const router = express.Router();

// Always show the landing page when visiting "/"
router.get('/', (req, res) => {
    res.render('pages/homepage'); // or 'home', whichever your EJS is called
});

module.exports = router;
