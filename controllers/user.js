'use strict'
var User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
function home(req, res) {
    res.status(200).send({message: "wea fome"});
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    if (params.name && params.surname && params.email && params.password && params.amount ) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.amount = params.amount;
        user.saving = 0;
        bcrypt.hash(params.password, null, null, (err, hash)=>{
            user.password = hash;
        });
        user.save((err,userStored) => {
            if(err) return res.status(500).send({message: "error al guardar el usuario"});
            if(userStored){
                res.status(200).send({user: userStored});
            } else {
                res.status(404).send({message : "No se ha registrado el usuario"});
            }
        });
    } else {
        res.status(200).send({message: "Error en la peticion"});
    }
}

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email
        
    }, (err, user) => {
        if (err) return res.status(500).send({ message: "error al ingresar" });
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    
                    if (params.gettoken) {
                       return res.status(200).send({
                           token: jwt.createToken(user)
                       })
                    } else {
                        user.password = undefined;
                        return res.status(200).send({ user });
                    }
                   
                } else {
                    return res.status(404).send({ message: "usuario no encontrado" });
                }
            });

        } else {
            return res.status(404).send({ message: "usuario no encontrado!!" });
        }
        ;
    })
       
}


function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
       if(err) return res.status(500).send({message: "Error en la peticion"})
       
         if(!user) return res.status(404).send({message: "Usuario no encontrado"})
          
        return res.status(200).send({user});
         
      
    });
}

function addSave(req, res) {
    var user = new User()
  
    var userId = req.params.id;
    var saving = parseFloat(req.body.saving);
    var amount = parseFloat(req.body.amount);
    

    console.log(req.user);
    user.name = req.user.name;
    user.surname = req.user.surname;
    user.amount = req.body.amount;
    user.email = req.user.email;
    user.saving = saving;
    user._id = req.user.sub; 
    if (userId != req.user.sub) {
        return res.status(200).send({message: 'No tienes permiso para hacer la transferencia'});
    }

    User.findByIdAndUpdate(userId,user,{new:true} ,(err, userUpdated) =>{
        if (err) res.status(500).send({message: 'Error en la peticion'});
        if (!userUpdated) return res.status(404).send({ message: 'No existe el usuario' });
        return res.status(200).send({user: userUpdated})
    } );
}

function removeSave(req, res) {
  var user = new User();

  var userId = req.params.id;
  var saving = parseFloat(req.body.saving);
  
  var amountToSave = saving - amount;

  console.log(req.user);
  user.name = req.user.name;
  user.surname = req.user.surname;
  user.amount = req.body.amount;
  user.email = req.user.email;
  user.saving = saving;
  user._id = req.user.sub;
  if (userId != req.user.sub) {
    return res
      .status(200)
      .send({ message: "No tienes permiso para hacer la transferencia" });
  }

  User.findByIdAndUpdate(userId, user, { new: true }, (err, userUpdated) => {
    if (err) res.status(500).send({ message: "Error en la peticion" });
    if (!userUpdated)
      return res.status(404).send({ message: "No existe el usuario" });
    return res.status(200).send({ user: userUpdated });
  });
}
module.exports = {
    home,
    saveUser ,
    loginUser,
    getUser,
    addSave,
    removeSave
}