const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../helpers/auth');

const User = require('../models/User');

const passport = require('passport');

router.get('/users', isAdmin, isAuthenticated, async (req, res) => {
    const users = await User.find().lean();
    res.render('users/all-users', {users});
});

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/new-user');
});

router.post('/users/signup', isAdmin, isAuthenticated, async (req, res) => {
    const { name, lastname, email, password, confirmPassword, rol } = req.body;
    const errors = [];
    if ( name.length == 0 || lastname.length == 0 || email.length == 0 || password.length == 0 || confirmPassword.length == 0 ){
        errors.push({text: 'Por favor complete todos los campos.'});
    }
    if (password != confirmPassword) {
        errors.push({text: 'Las contraseñas no coinciden.'});
    }
    if (errors.length > 0){
        res.render('users/new-user', {errors, name, email, password, confirmPassword, rol});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', '¡El email ya está en uso!');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, lastname, email, password, rol});
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

router.get('/users/edit/:id', isAdmin, isAuthenticated, async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/edit-user', {user});
});

router.put('/users/edit/:id', isAdmin, isAuthenticated, async (req, res) => {
    const { name, lastname, email, rol } = req.body;
    await User.findByIdAndUpdate(req.params.id, {name, lastname, email, rol});
    req.flash('success_msg', '¡Usuario editado correctamente!')
    res.redirect('/users');
});

router.delete('/users/delete/:id', isAdmin, isAuthenticated, async (req, res) => {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', '¡Usuario eliminado correctamente!')
    res.redirect('/users');
});

module.exports = router;