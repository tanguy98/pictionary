import React from 'react';
import HeadBand from './Components/HeadBand/HeadBand.js';
import './App.css';

function App() {

  const listeParties = ['Partie 1', 'partie 2','partie 3', 'partie 4'];
  const listeItems = listeParties.map( (partie) => <li>{partie}</li> )

  return(
    <div className="App">
     
      <HeadBand/> 
      
      <body className="App-body">
         <ul> {listeItems} </ul>
      </body>

    </div>
  );
}

export default App;
