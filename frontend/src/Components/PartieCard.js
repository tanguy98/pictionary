//IMPORTS :

import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import '../App.css';
import {joinPartie} from '../utils/Api';

class PartieCard extends React.Component {

    constructor (props) {
        super (props);
        // DECLARATIONS STATE
        this.state = {
            rooms: [],
            error: null
        }
        // BINDING DES FONCTIONS 
        this.handleJoin = this.handleJoin.bind(this);
  
      }

    handleJoin() {
      const id_user = localStorage.getItem('id_user'); // user connecté
      const id_partie = this.props.id;
      joinPartie(id_user,id_partie)
      .then( (response) => { 
        this.props.history.push(`/partie/${response.data.data}`);
      });
      }

    render() {
        return(
          <div>
            <br/>
          <Card border="secondary" style={{ width: '50rem' }}>
            <Card.Header as="h5">Partie n°{this.props.id}</Card.Header>
            <Card.Body>
              <Card.Text>
                Cette partie est en cours, vous pouvez la rejoindre !
              </Card.Text>
              <Button variant="primary" onClick={this.handleJoin}> Rejoindre </Button>
            </Card.Body>
          </Card>
          </div>
    )
}
}

export default withRouter(PartieCard);