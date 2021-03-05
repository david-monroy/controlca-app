const helpers = {};

// Métodos de autorización de accesos

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

helpers.isLeader = (req, res, next) => {
    if (req.user.rol == 'Líder' || req.user.rol == 'Administrador'){
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/');
};

module.exports = helpers;