const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/auth/login');
    }else{
        res.redirect('/auth/habits');
    }
});

module.exports = router;