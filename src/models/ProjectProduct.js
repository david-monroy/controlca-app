const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectProductSchema = new Schema({
    project: { type: String, required: true },
    product: { type: String, required: true },
    employee: [
        { type: Employee }
    ]
});

module.exports = mongoose.model('ProjectProduct', ProjectProductSchema);