const express = require('express');
const router = express.Router();

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.get('/users', (req, res) => {
    res.render('users/users-menu');
});

module.exports = router;