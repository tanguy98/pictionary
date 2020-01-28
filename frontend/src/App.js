//IMPORTS

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';

// "HOMEMADE" COMPONENTS IMPORTS
import HeadBand from './Components/HeadBand';
import Routes from './Components/Routes';

//COMPONENTS :

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="App">
        <Router>
          <HeadBand/>
            <Routes/>
        </Router>

        <div className="BandeNoire"/>
        <footer> Site Web conçu par © Tanguy Houette</footer>
      </div>
    );
  }
}

export default App;

//react-cookie pour la gestion de droit 
