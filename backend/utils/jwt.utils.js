// Imports

var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'dzg92b6tsmos8ipotjl2qn77kpc03odh2mwfwbnb14s5cc8y8blt8fs2z7hx6u2dp2016mt39ij8ie36tt6ss0fl3cnmslvq1bb3p3hrhv4fag6i3x7raz7';

// Déclarations des fonctions :

function generateToken (userData) {
    return jwt.sign({
        user_id: userData.id_user,
        username: userData.username,
        isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {expiresIn: '7d'}
    )
}

function parseAuthorization (authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

//fusionner les deux du dessous :
function readToken (req) {
    // Extraction du token :
    const authorization = req.get('Authorization');
    let token = parseAuthorization(authorization);

    let response = {
        isAuthenticated: false,
        id_user: null,
        username: '',
        isAdmin: false
    }
    // Vérifications :
    if (token != null) {
        try {
            let decryptedToken = jwt.verify(token, JWT_SIGN_SECRET);
            if (jwtToken != null) {
                response.isAuthenticated = true;
                response.id_user = decryptedToken.id_user;
                response.username = decryptedToken.username;
                response.isAdmin = decryptedToken.isAdmin;
            } 
        } catch (err) {console.log(err)}
    }
    return response
}

// EXPORT :
module.exports = {
    generateToken,
    parseAuthorization,
    readToken
}

