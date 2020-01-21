import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import '../App.css';

function PartieDescription(props) {

    //props est les propriétés du composant partie, il contient un seul argument : partie
    // une partie est de la forme { id_partie: 1 , titre: 'titre de la partie 1', creator:'créateur partie 1'}
    let history = useHistory();
    function onNavigatePartie() {
      console.log("Je veux rejoindre la partie !")
      history.push('/partie');
    };

    return(
        <div className="Partie-description">
            <div className="Bloc-partie-caract">
                <h3>Ceci est la partie {props.id},</h3>
                {/*<p>créée par {props.creator} </p>*/}
            </div>
            <div/>
            <Button onClick={onNavigatePartie}> Rejoindre </Button>
        </div>
    )
};


export default PartieDescription;