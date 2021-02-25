const express = require('express');
const router = express.Router();

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

module.exports = router;