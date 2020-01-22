//IMPORTS

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// "HOMEMADE" COMPONENTS IMPORTS
import HeadBand from './Components/HeadBand';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Partie from './Components/Partie';
import NouvellePartie from './Components/NouvellePartie';
import Register from './Components/Register';


//COMPONENTS :

class App extends React.Component {
    render() {
      return(
        <div className="App">
          
          <HeadBand/>

          <Router>
            <Route path='/homepage' component={HomePage} />
            <Route path='/login' component={Login}/>
            <Route path='/partie/:id_partie' component={Partie}/>
            <Route path='/nouvellepartie' component={NouvellePartie}/>
            <Route path='/register' component={Register}/>
          </Router>

          <footer> Site Web conçu par © Tanguy Houette</footer>
        </div>
      );
    }
}

export default App;

//react-cookie pour la gestion de droit 
