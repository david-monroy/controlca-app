const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/users/login');
};

helpers.isAdmin = (req, res, next) => {
    if (req.user.rol == 'Administrador'){
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/');
};

module.exports = helpers;