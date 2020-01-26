//IMPORTS
import React from 'react';
import { Route, withRouter, Switch} from 'react-router-dom';

// "HOMEMADE" COMPONENTS IMPORTS
import AdminPage from './AdminPage';
import HomePage from './HomePage';
import Login from './Login';
import Partie from './Partie';
import NouvellePartie from './NouvellePartie';
import Register from './Register';


// Component :

// On pensera à créer des protected routes
//(qui vérifient si un utilisateur est bien logged in,
// sinon qui le renvoient vers la page de login)

class Routes extends React.Component {

    render() {

        return (
            <Switch>
                <Route path='/homepage' component={HomePage} />
                <Route path='/login' component={Login}/>
                <Route path='/partie/:id_partie' component={Partie}/>
                <Route path='/nouvellepartie' component={NouvellePartie}/>
                <Route path='/register' component={Register}/>
                <Route path='/adminpage' component={AdminPage}/>
                <Route path='*' component={() => "404 NOT FOUND"}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);