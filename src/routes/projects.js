const express = require("express");
const router = express.Router();
const { isAuthenticated, isLeader, isAdmin } = require('../helpers/auth');

const Project = require('../models/Project');
const Product = require('../models/ProductType');

// PROYECTOS

// Agregar - GET
router.get('/projects/add', isAuthenticated, async (req, res) => {
    res.render('projects/new-project');
});

// Agregar - POST
router.post('/projects/add', isAuthenticated, async (req, res) => {
    const { name, description, code, area } = req.body;
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
            description,
            code,
            area
        });
    }else{
        const newProject = new Project({ name, description, code, area });
        newProject.leader = req.user.id;
        // await newProject.save();
        // req.flash('success_msg', '¡Proyecto agregado!');
        console.log(newProject);
        res.render('projects/new-project-2', {newProject});
    }
});

// Listar Proyectos - GET
router.get('/projects', isAuthenticated, async (req, res) => {
    var projects = '';
    if (req.user.rol == 'Líder'){
        projects = await Project.find({leader: req.user.id}).lean();
    } else if (req.user.rol == 'Administrador'){
        projects = await Project.find().lean();
    }
    res.render('projects/all-projects', {projects});
});

// Editar Proyectos - GET
router.get('/projects/edit/:id', isAuthenticated, async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.render('projects/edit-project', {project});
});

// Editar Proyectos - PUT
router.put('/projects/edit/:id', isAuthenticated, async (req, res) => {
    const { name, description, code, area } = req.body;
    await Project.findByIdAndUpdate(req.params.id, {name, description, code, area });
    req.flash('success_msg', '¡Proyecto editado correctamente!')
    res.redirect('/projects');
});

// Eliminar Proyectos - DELETE
router.delete('/projects/delete/:id', isAuthenticated, async (req, res) => {
    const newStatus = 'Eliminado';
    await Project.findByIdAndUpdate(req.params.id), {newStatus};
    req.flash('success_msg', '¡Proyecto eliminado correctamente!')
    res.redirect('/projects');
});

// Agregar PRODUCTOS a un Proyecto - GET
router.get('/projects/add-products', isAuthenticated, async (req, res) => {
    const project = req.body;
    res.render('projects/new-project-2', {project});
});

// Agregar PRODUCTOS a un Proyecto - POST
router.post('/projects/add-product', isAuthenticated, async (req, res) => {
    const product = req.body;
    // const newProduct = new Product({ name, estHours });
    res.redirect('/projects/add');
});

module.exports = router;