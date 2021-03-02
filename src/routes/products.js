const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../helpers/auth');

const Product = require('../models/ProductType');

router.get('/products/add', isAuthenticated, isAdmin, (req, res) => {
    res.render('products/new-product');
});

router.post('/products/add', isAuthenticated, isAdmin, async (req, res) => {
    const { name, consecutive } = req.body;
    const errors = [];
    if (!name){
        errors.push({text: 'Por favor inserte un nombre'});
    }
    if (!consecutive){
        errors.push({text: 'Por favor ingrese un consecutivo'});
    }
    if(errors.length > 0){
        res.render('products/new-product', {
            errors,
            name,
            consecutive
        });
    }else{
        const newProduct = new Product({ name, consecutive });
        await newProduct.save();
        req.flash('success_msg', 'Producto agregado!')
        res.redirect('/products');
    }
});

router.get('/products', isAuthenticated, isAdmin, async (req, res) => {
    const products = await Product.find().lean();
    res.render('products/all-products', {products});
});

router.get('/products/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit-product', {product});
});

router.put('/products/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { name, consecutive } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {name, consecutive });
    req.flash('success_msg', 'Producto editado correctamente!')
    res.redirect('/products');
});

router.delete('/products/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
    console.log(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Producto eliminado correctamente!')
    res.redirect('/products');
});

module.exports = router;