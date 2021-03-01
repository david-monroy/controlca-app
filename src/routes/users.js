const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

const User = require('../models/User');

const passport = require('passport');

router.get('/users', isAuthenticated, (req, res) => {
    res.render('users/users-menu');
});

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/users/signup', isAuthenticated, (req, res) => {
    res.render('users/new-user');
});

router.post('/users/signup', isAuthenticated, async (req, res) => {
    const { name, lastname, email, password, confirmPassword } = req.body;
    const errors = [];
    if ( name.length == 0 || lastname.length == 0 || email.length == 0 || password.length == 0 || confirmPassword.length == 0 ){
        errors.push({text: 'Por favor complete todos los campos.'});
    }
    if (password != confirmPassword) {
        errors.push({text: 'Las contraseñas no coinciden.'});
    }
    if (errors.length > 0){
        res.render('users/new-user', {errors, name, email, password, confirmPassword});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', '¡El email ya está en uso!');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, lastname, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado');
            res.redirect('/users');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;