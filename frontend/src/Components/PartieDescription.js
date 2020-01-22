//IMPORTS :

import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../App.css';
import {joinPartie} from '../utils/Api';

class PartieDescription extends React.Component {

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
        joinPartie(1,1).then(response => { 
          this.props.history.push(`/partie/${response.data}`);
        })
      }

    render() {
        return(
        <div className="Partie-description">
            <div className="Bloc-partie-caract">
                <h3>Partie n° {this.props.id} : </h3>
            </div>
            <div/>
            <Button variant="primary" onClick={this.handleJoin}> Rejoindre </Button>
        </div>
    )
}
}

PartieDescription.propTypes = {
    id: PropTypes.string
}


export default withRouter(PartieDescription);