const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductTypeSchema = new Schema({
    name: { type: String, required: true },
    consecutive: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductTypeSchema);