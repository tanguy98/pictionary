import React from 'react';
import HeadBand from './Components/HeadBand/HeadBand.js';
import Partie from './Components/Partie/Partie.js';
import './App.css';

function App() {

  const listeParties = [
    { id_partie: 1,
      titre: 'titre de la partie 1',
      creator:'créateur partie 1'
    },
    { id_partie: 2,
      titre: 'titre de la partie 2',
      creator:'créateur partie 2'
    },
    { id_partie: 1,
      titre: 'titre de la partie 3',
      creator:'créateur partie 3'
    }
      ];

  const listeItems = listeParties.map( (partie) => <Partie partie={partie} /> );

  return(
    <div className="App">
     
      <HeadBand/>
      
      <body className="App-body">
        <button> Créer un nouvelle partie </button>
        <ul> {listeItems} </ul>
      </body>

      <footer/>

    </div>
  );
}

export default App;
