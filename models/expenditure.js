'use strict'
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var expenditureSchema = new mongoose.Schema({
    concept: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },
    amount: {
        type: Number,
        required: true,
        unique: false,
        index: true,
    },
    date: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },
    description: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
});

//Export the model
module.exports = mongoose.model('Expenditure', expenditureSchema);