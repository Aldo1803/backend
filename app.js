'use strict'
 const express = require('express');
const app = express();
const bodyParser = require("body-parser");

//Cargar Rutas
var user_routes = require("./routes/user");
var movement_routes = require("./routes/movement.js")
//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use("/api", user_routes);
app.use("/api", movement_routes);



module.exports = app;
