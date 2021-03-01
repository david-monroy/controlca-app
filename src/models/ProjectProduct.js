const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectProductSchema = new Schema({
    project: { type: String, required: true },
    product: { type: String, required: true },
});

module.exports = mongoose.model('ProjectProduct', ProjectProductSchema);