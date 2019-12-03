'use strict'
var jwt = require("jwt-simple");
var moment = require("moment");
var key = "My_name_is_Yoshikage_Kira._I'm_33_years_old."
exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surnam: user.surname,
        email: user.email,
        amount: user.amount,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, key );
}