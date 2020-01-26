// IMPORTS

import React from 'react';
import PartieDescription from './PartieDescription';
import '../App.css';
import {withRouter} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getRooms, createPartie } from '../utils/Api';


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
    this.handleCreatePartie = this.handleCreatePartie.bind(this);
  }



  componentDidMount () {
    getRooms().then( (res) => {
      this.setState({
      rooms: res.data.data
      });
    });
  }

  handleCreatePartie() {
    //1 should be userID of the logged in person after we have implemented the authentication methods
    createPartie(1).then( response => {
      this.props.history.push(`/partie/${response.data.data}`);
    })
  }

  render() {

    // Mapping des rooms disponibles
    const listPartiesDisplay = this.state.rooms.map((room) =>
    <PartieDescription 
      id={room.id}
    />
    );

      return(
        <div className="App-body">
          <br/>
          <Button variant="primary" onClick={this.handleCreatePartie}> Créer un nouvelle partie </Button>
          <br/>
          <h3> Pour jouer rapidement, voilà les parties disponibles :</h3>
          <br/>
          <ul> {listPartiesDisplay} </ul>
          <br/>
        </div>

);
  }
}

export default HomePage;
