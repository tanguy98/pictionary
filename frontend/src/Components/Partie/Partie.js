import React from 'react';

function Partie(props) {
    //props est les propriétés du composant partie, il contient un seul argument : partie
    // une partie est de la forme { id_partie: 1 , titre: 'titre de la partie 1', creator:'créateur partie 1'} 

    return(
        <div>
            <p>Ceci est la partie {props.partie.id_partie} </p>
            <p>créée par {props.partie.creator} </p>
            <button>Rejoindre</button>
        </div>
    )
};

export default Partie;