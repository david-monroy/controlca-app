const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/controlca-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));