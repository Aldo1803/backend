'use strict'
var jwt = require("jwt-simple");
var moment = require("moment");
var key = "My_name_is_Yoshikage_Kira._I'm_33_years_old.";

exports.ensureAuth = function(req, res, next){
    if (!req.headers.authorization) {
        return res.status(403).send({message: "La peticion no tiene la cabecera de autenticacion"});
    }

    var token = req.headers.authorization.replace(/["']+/g, '' );


    try {
        var payload = jwt.decode(token, key);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({message: "El token a expirado"});
        }
    } catch (error) {
        return res.status(401).send({ message: "El token no es valido" });
    }

    req.user = payload;

    next();
    


}