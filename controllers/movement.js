'use strict'

var path = require("path");
var fs = require('fs');
var moment = require('moment');
var pagination = require('mongoose-pagination');
var Income = require('../models/income.js');
var Expenditure = require('../models/expenditure.js');
var User = require('../models/user');



function newIncome(req,res){
    

    var params = req.body;
    

    if (!params.concept) return res.status(200).send({message: "Debe tener un titulo"});
    if (!params.amount) return res.status(200).send({message: "Debes introducir un monto "});

    var income = new Income();
    income.amount = params.amount;
    income.concept = params.concept;
    
    income.description = params.description;
    income.user = req.user.sub;
    income.date = moment().format("MMM Do YY"); 
   

    income.save((err, incomeStored) => {
        if (err) return console.log(err)//res.status(500).send({message: 'Error al guardar el movimiento'})
        
        if (!incomeStored) return res.status(404).send({message: "no se pudo guardar el movimiento"});
        console.log(income);
        return res.status(200).send({income: incomeStored});
    });
      

   
}

function newExpenditure(req, res) {


    var params = req.body;
    

    if (!params.concept) return res.status(200).send({ message: "Debe tener un titulo" });
    if (!params.amount) return res.status(200).send({ message: "Debes introducir un monto " });

    var expenditure = new Expenditure();
    expenditure.amount = params.amount;
    expenditure.concept = params.concept;
    expenditure.user = req.user.sub;
    expenditure.date = moment().format("MMM Do YY"); 
    
    expenditure.description = params.description;

    expenditure.save((err, expenditureStored) => {
        if (err) return console.log(err)//res.status(500).send({ message: 'Error al guardar el movimiento' })
        if (!expenditureStored) return res.status(404).send({ message: "no se pudo guardar el movimiento" });
        return res.status(200).send({ expenditure: expenditureStored });
    });



}

function addIncome(req, res) {
    var user = new User();
    var userId = req.params.id;
    
    var newAmount = parseInt(req.body.amount);  
    user.name = req.user.name;
    user.surname = req.user.surname;
    user.amount = newAmount;
    user.email = req.user.email;
    user._id = req.user.sub; 
    if (userId != req.user.sub) {
        return res.status(200).send({message: 'No tienes permiso para hacer la transferencia'});
    }

    User.findByIdAndUpdate(userId, user, {new: true}, (err, userUpdated) =>{
if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!userUpdated) return res.status(404).send({ message: 'No existe el usuario' });

        return res.status(200).send({user: userUpdated})
    

    });
}

function addExpenditure(req, res) {
    var user = new User();
    var userId = req.params.id;
    
    var newAmount =  parseInt(req.body.amount);
    user.name = req.user.name;
    user.surname = req.user.surname;
    user.amount = newAmount;
    user.email = req.user.email;
    user._id = req.user.sub; 
    if (userId != req.user.sub) {
        return res.status(200).send({ message: 'No tienes permiso para hacer la transferencia' });
    }

    User.findByIdAndUpdate(userId, user,{new: true}, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!userUpdated) return res.status(404).send({ message: 'No existe el usuario' });

        return res.status(200).send({ user: userUpdated })


    });
}

function getIncomes(req, res) {
    var userId = req.params.id;
    Income.find({user:userId},(err, income) => {
        if (err) return res.status(500).send({message: "Error en la peticion"});
        if (!income) return res.status(404).send({message: "No hay publicaciones"});
        return res.status(200).send({income: income});
    });
    
}

function getExpenditures(req, res) {
    var userId = req.params.id;
    Expenditure.find({ user: userId }, (err, income) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });
        if (!income) return res.status(404).send({ message: "No hay publicaciones" });
        return res.status(200).send({ income: income });
    });

}


module.exports = {
    newIncome,
    addIncome,
    addExpenditure,
    newExpenditure,
    getIncomes,
    getExpenditures
};



