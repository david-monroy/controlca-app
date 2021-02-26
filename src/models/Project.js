const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);