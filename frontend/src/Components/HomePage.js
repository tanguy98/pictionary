// IMPORTS

import React from 'react';
import PartieDescription from './PartieDescription';
import '../App.css';
import {useHistory} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { getRooms } from '../utils/Api';


// PARAMETRES


// COMPONENT

class HomePage extends React.Component {

  constructor (props) {
    super (props);
    // DECLARATIONS STATE
    this.state = {
        rooms: [],
        error: null
    }
    // BINDING DES FONCTIONS 
    this.handleError = this.handleError.bind(this);
    this._refresh = this._refresh.bind(this);
  }

  handleError(error) {
    //to implement
  }

  async _refresh () {
    const rooms = await getRooms(this.props.token, this.handleError);
    this.setState({
      rooms: rooms
    });
  }

  render() {
/*
  listPartiesDispaly = this.rooms.map((room) => {
    <PartieDescription 
      id={room.id}
      nbRounds={room.nbRounds}
      players={room.players}
      places={room.places}
      partieName={room.partieName}
      creatorId={room.creatorId}
      createdAt={room.createdAt}
      isEnded={room.isEnded}
      onJoin={this.props.onJoin}
      onSupprime={this.props.onSupprime}
      type={this.props.type}
    />
  });
  */
      



    const listeParties = [
      { id_partie: 1,
        titre: 'titre de la partie 1',
        creator:'créateur partie 1'
      },
      { id_partie: 2,
        titre: 'titre de la partie 2',
        creator:'créateur partie 2'
      },
      { id_partie: 3,
        titre: 'titre de la partie 3',
        creator:'créateur partie 3'
      }
        ];
  
    const listeItems = listeParties.map( (partie) => <PartieDescription partie={partie} /> );

    /*
    let history = useHistory();
    function onNavigateCreatePartie() {
      console.log("Je veux créer une nouvelle partie !")
      history.push('/nouvellepartie');
    };*/

      return(
        <body className="App-body">
          <LinkContainer to="/nouvellepartie">
            <Button> Créer un nouvelle partie </Button>
          </LinkContainer>
          
          <ul> {listeItems} </ul>
        </body>

);
  }

}

export default HomePage;
