const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/', isAuthenticated, (req, res) => {
    const userRol = req.user.rol;
    const userName = req.user.name;
    var isAdmin = false;
    var isLeader = false;

    // Saber el rol del usuario que acaba de loguearse
    if (userRol == "Administrador"){
        isAdmin = true;
        isLeader = true;
    } else if (userRol == "Líder"){
        isLeader = true;
    }
    res.render('index', {isAdmin, isLeader, userName});
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;