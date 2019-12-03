'use strict'


const mongoose = require('mongoose');
var app = require("./app");
var port = 3800;
mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/Money', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');

        app.listen(port, () => {
            console.log('App listening on port 3800!');
        });
    } else {
        console.log('Error in DB connection: ' + err);
    }
});
