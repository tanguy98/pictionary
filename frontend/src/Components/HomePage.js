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
    getRooms().then( (res) => {
      this.setState({
      rooms: res.data.data
    });
    }
  ).catch(function(e) {
    console.error(e.message);
  });
}

  handleCreate() {
    createPartie(1).then(response => {
      this.props.history.push(`/partie/${response.data}`);
    })
  }

  render() {
    console.log('dans render')
    console.log(this.state.rooms)
    const listPartiesDisplay = this.state.rooms.map((room) =>
    <PartieDescription 
      id={room.id}
    />
    );

      return(
        <div className="App-body">
            <Button variant="primary" onClick={this.handleCreate}> Créer un nouvelle partie </Button>
          <ul> {listPartiesDisplay} </ul>
        </div>

);
  }

}

export default withRouter(HomePage);
