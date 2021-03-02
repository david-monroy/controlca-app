const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    leader: { type: String },
    code: { type: String, required: true },
    area: { type: String, required: true },
    total_hours: { type: Number, default: 0 },

    
});

module.exports = mongoose.model('Project', ProjectSchema);