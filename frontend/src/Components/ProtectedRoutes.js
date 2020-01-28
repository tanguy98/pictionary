//IMPORTS
import React from 'react';
import { Redirect, Route, withRouter, Switch} from 'react-router-dom';
import {isAuthenticated} from '../utils/auth';

// "HOMEMADE" COMPONENTS IMPORTS
import AdminPage from './AdminPage';
import HomePage from './HomePage';
import Login from './Login';
import Partie from './Partie';
import NouvellePartie from './NouvellePartie';
import Register from './Register';


// Component :

class ProtectedRoutes extends React.Component {

    constructor(props) {
        super(props);
        // DEF STATE
        this.state= {
            isAuthenticated: 'false',
            id_user: null,
            username: '',
            isAdmin: false
        }
        // Binding des fonctions

    }

    async componentDidMount () {
        const isAuth = await isAuthenticated();
        this.setState( isAuth );
    }

    render() {
        if (this.state.isAuthenticated) {
            // L'utilisateur est connecté

            if (this.state.isAdmin) {
                //L'utilisateur connecté dispose des droits d'administrateur
                return(
                    <Switch>
                        <Route path='/adminpage' component={AdminPage}/>
                        <Route path='*' component={() => "404 NOT FOUND"}/>
                    </Switch>
                )
            } else {
                //L'utilisateur n'est pas admin
                return(
                    <Switch>
                        <Route path='/homepage' component={HomePage} />
                        <Route path='/partie/:id_partie' component={Partie}/>
                        <Route path='/nouvellepartie' component={NouvellePartie}/>
                        <Route path='*' component={() => "404 NOT FOUND"}/>
                    </Switch>
                )
            }
        } else {
            // l'utilisateur n'est pas connecté
            return (
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='*' component={() => "404 NOT FOUND"}/>
                </Switch>
            )
        }
    }
}

export default withRouter(ProtectedRoutes);