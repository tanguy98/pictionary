import React from 'react';
import HeadBand from './Components/HeadBand';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Partie from './Components/Partie';
import NouvellePartie from './Components/NouvellePartie';
import Register from './Components/Register';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {

  return(
    <div className="App">
      
      <HeadBand/>

      <Router>
        <Route path='/homepage' component={HomePage}/>
        <Route path='/login' component={Login}/>
        <Route path='/partie' component={Partie}/>
        <Route path='/nouvellepartie' component={NouvellePartie}/>
        <Route path='/register' component={Register}/>
      </Router>

      <footer> Site Web concu par Tanguy Houette</footer>
    </div>
  );
}

export default App;
