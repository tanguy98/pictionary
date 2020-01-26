// Imports

var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'dzg92b6tsmos8ipotjl2qn77kpc03odh2mwfwbnb14s5cc8y8blt8fs2z7hx6u2dp2016mt39ij8ie36tt6ss0fl3cnmslvq1bb3p3hrhv4fag6i3x7raz7';

// EXPORT :
module.exports = {

    generateToken: function(userData) {
        return jwt.sign({
            user_id: userData.id_user,
            isAdmin: userData.isAdmin
            },
            JWT_SIGN_SECRET,
            {expiresIn: '1h'}
        )
    },

    /*
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },*/

    getUserId: function (authorization) {
        let id_user = -1;
        let token = module.exports.parseAuthorization(authorization);

        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    id_user = jwtToken.id_user;
                }
            } catch (err) {}
        }
        return id_user;
    },

    getIsAdmin: function (authorization) {
        let isAdmin = 0;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    isAdmin = jwtToken.isAdmin;
                }
            } catch (err) {}
        }
        return isAdmin;
    }
}

