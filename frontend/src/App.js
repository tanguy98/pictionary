//IMPORTS

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// "HOMEMADE" COMPONENTS IMPORTS
import HeadBand from './Components/HeadBand';
import AdminPage from './Components/AdminPage';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Partie from './Components/Partie';
import NouvellePartie from './Components/NouvellePartie';
import Register from './Components/Register';
//import ProtectedRoutes from './Components/ProtectedRoutes';

//COMPONENTS : 

class App extends React.Component {



  render() {
    return(
      <div className="App">
        <Router>
          <HeadBand/>
            <Switch> 
              <Route path='/adminpage' component={AdminPage}/>
              <Route path='/homepage' component={HomePage} />
              <Route path='/partie/:id_partie' component={Partie}/>
              <Route path='/nouvellepartie' component={NouvellePartie}/>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route path='/' component={() => <Redirect to='/login'/>}/>
              <Route path='*' component={() => "404 NOT FOUND"}/>
          </Switch>
        </Router>

        <div className="BandeNoire"/>
        <footer> Site Web conçu par © Tanguy Houette</footer>
      </div>
    );
  }
}

export default App;

//react-cookie pour la gestion de droit 
