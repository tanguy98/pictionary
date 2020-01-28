//Imports
import assertAuthorisation from './Api';

//Déclaration des fonctions

function isAuthenticated() {
    const token = localStorage.getItem('token');
    let auth = {
        isAuthenticated: 'false',
        id_user: null,
        username: '',
        isAdmin: false
    };
    if (!token) {
        return auth

    } else {
        //requête au près du serveur pour vérifier le token
        assertAuthorisation()
        .then( (res) => {
            auth = res.data.data // objet comme dans le return ci-dessus rempli par ce qui a été décodé du token
        });
    }
    return auth
}


//Export

export {isAuthenticated}
