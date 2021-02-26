const express = require("express");
const router = express.Router();

const Project = require('../models/Project');

router.get('/projects/add', (req, res) => {
    res.render('projects/new-project');
});

router.post('/projects/new-project', async (req, res) => {
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
        const newProject = new Project({ name, description });
        await newProject.save();
        res.redirect('/projects');
    }
});

router.get('/projects', async (req, res) => {
    const projects = await Project.find().lean();
    res.render('projects/all-projects', {projects});
});

router.get('/projects/edit/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.render('projects/edit-project', {project});
});

router.put('/projects/edit-project/:id', async (req, res) => {
    const { name, description } = req.body;
    await Project.findByIdAndUpdate(req.params.id, {name, description});
    res.redirect('/projects');
});

router.delete('/projects/delete/:id', async (req, res) => {
    console.log(req.params.id);
    await Project.findByIdAndDelete(req.params.id);
    
    res.redirect('/projects');
});

module.exports = router;