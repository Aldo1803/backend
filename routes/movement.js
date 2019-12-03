'use strict'
var express = require("express");
var MovementController = require('../controllers/movement');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.post('/income',md_auth.ensureAuth, MovementController.newIncome);
api.post('/expenditure', md_auth.ensureAuth, MovementController.newExpenditure);
api.put('/newexpenditure/:id', md_auth.ensureAuth, MovementController.addExpenditure);
api.put('/newincome/:id', md_auth.ensureAuth, MovementController.addIncome);
api.get('/incomes/:id', md_auth.ensureAuth, MovementController.getIncomes);
api.get('/expenditures/:id', md_auth.ensureAuth, MovementController.getExpenditures);
module.exports = api;
