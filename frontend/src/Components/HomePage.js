// IMPORTS

import React from 'react';
import '../App.css';
import {withRouter} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PartieCard from './PartieCard';
import { getRooms, createPartie } from '../utils/Api';

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
    const id_user = localStorage.getItem('id_user') 
    createPartie(id_user).then( (response) => {
      this.props.history.push(`/partie/${response.data.data}`);
    })
  }

  render() {
    // Mapping des rooms disponibles
    const listPartiesDisplay = this.state.rooms.map( (room) => <PartieCard id={room.id}/> );

    return(
      <div className="App-body">
        <br/>
        <h3> Bonjour {localStorage.getItem('username')} !</h3>
        <br/>
        <Button variant="primary" onClick={this.handleCreatePartie}> Créer un nouvelle partie </Button>
        <br/>
        <h5> Pour jouer rapidement, voilà les parties disponibles :</h5>
        
        <ul> {listPartiesDisplay} </ul>
        <br/>
      </div>

    );
  }
}

export default withRouter(HomePage);
