const express = require("express");
const router = express.Router();

router.get('/projects/add', (req, res) => {
    res.render('projects/new-project');
});

router.post('/projects/new-project', (req, res) => {
    const { name, description } = req.body;
    const errors = [];
    if (!name){
        errors.push({text: 'Por favor inserte un nombre'});
    }
    if (!description){
        errors.push({text: 'Por favor ingrese una descripcion'});
    }
    if(errors.length > 0){
        res.render('projects/new-project', {
            errors,
            name,
            description
        });
    }else{
        res.send('OK');
    }
});

router.get('/projects', (req, res) => {
    res.send('Bien');
});

module.exports = router;