'use strict'
var express = require("express");
var UserController = require("../controllers/user");
var md_auth = require("../middlewares/authenticated");
var api = express.Router();

api.get('/home', UserController.home);
api.post("/register", UserController.saveUser);
api.post("/login", UserController.loginUser);
api.get("/user/:id",md_auth.ensureAuth, UserController.getUser);
api.put("/add/:id", md_auth.ensureAuth, UserController.addSave);
api.put("/substract/:id", md_auth.ensureAuth, UserController.removeSave);
module.exports = api;