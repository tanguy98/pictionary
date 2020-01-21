// Imports

var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'dzg92b6tsmos8ipotjl2qn77kpc03odh2mwfwbnb14s5cc8y8blt8fs2z7hx6u2dp2016mt39ij8ie36tt6ss0fl3cnmslvq1bb3p3hrhv4fag6i3x7raz7';

//Exported functions

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            user_id: userData.user_id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        }) 
    }
}