'use strict'
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    surname: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    amount:{
        type:Number,
        required:true,
        
        index:true,
    },
    saving: {
        type: Number,
        required: false,

        index: true,
    },
    password:{
        type:String,
        required:true,
        index:true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);