const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
        trim: true,
    },
    description: {
        type: String,
        default: 'Empty String',
        max: 255,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        max: 50,
        trim: true,
    },
    price: {
        type: Number,
        required: true, 
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
 
module.exports = mongoose.model('Product', productSchema);
