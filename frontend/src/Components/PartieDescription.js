import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../App.css';

class PartieDescription extends React.Component {

    //props est les propriétés du composant partie, il contient un seul argument : partie
    // une partie est de la forme { id_partie: 1 , titre: 'titre de la partie 1', creator:'créateur partie 1'}

    render() {
        return(
        <div className="Partie-description">
            <div className="Bloc-partie-caract">
                <h3>Ceci est la partie {this.props.id},</h3>
                {/*<p>créée par {props.creator} </p>*/}
            </div>
            <div/>
            <Button> Rejoindre </Button>
        </div>
    )
}
}

PartieDescription.propTypes = {
    id: PropTypes.string
}


export default withRouter(PartieDescription);