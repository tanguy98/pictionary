// IMPORTS

import React from 'react';
import PartieDescription from './PartieDescription';
import '../App.css';
import {withRouter} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
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
    this.handleError = this.handleError.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleError(error) {
    //to implement
  }

  componentDidMount () {
    getRooms(this.props.token, this.handleError).then( (res) => {
      console.log(res); // à effacer quand ça ira mieux
      this.setState({
      rooms: res.data
    });
    }

    );
    
  }

  handleCreate() {
    createPartie(1).then(response => {
      this.props.history.push(`/partie/${response.data}`);
    })
  }

  render() {
  const listPartiesDisplay = this.state.rooms.map((room) =>
    <PartieDescription 
      id={room.id}
    />
  );

      return(
        <div className="App-body">
          <LinkContainer to="/nouvellepartie">
            <Button variant="primary" onClick={this.handleCreate}> Créer un nouvelle partie </Button>
          </LinkContainer>
          
          <ul> {listPartiesDisplay} </ul>
        </div>

);
  }

}

export default withRouter(HomePage);
