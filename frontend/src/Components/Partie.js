//IMPORTS
import React from 'react';
import io from 'socket.io-client';
// import { connect } from 'react-redux';
import {Form, Col, Button} from 'react-bootstrap';

import {getWords} from '../utils/Api';
// créer une route get 1 seule partie (les joueurs)
//import CanvasComponent from '../Components/CanvasComponent';
import Canvas from './Canvas';


// CONSTS :

const nbManches = 3;

// Component :

class Partie extends React.Component {

  constructor(props) {
    super(props);

    // Params :
    this.socket = io('http://localhost:8080');

    // Initializing state :
    this.state = {
      guessedWord:"",
      currentManche: 1,
      score: 0,

      currentWord: null,
      words: []
    };

    //Initializing values

    this.id_partie = this.props.location.state.id_partie; // marche pas
    this.isCreator = this.props.location.state.isCreator;

    this.username = localStorage.getItem('username');
    this.id_user = localStorage.getItem('idUser');
    this.token = localStorage.getItem('token');

    this.currentWord = "raté";
    this.currentManche = 1;
    this.words = [];



    // Binding des fonctions :

    this.endPartie = this.endPartie.bind(this);
    this.nextManche = this.nextManche.bind(this);

    if (this.isCreator) {
        //Binding des fonctions du dessinateur
    } else {
        //Binding des fonctions du guesser
        this.handleChange = this.handleChange.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.onSuccesfulGuess = this.onSuccesfulGuess.bind(this);
    }

  }

    componentDidMount () {
        
        if (this.isCreator) {

            // CHOIX AU HASARD DES MOTS A FAIRE DEVINER :
            getWords().then( (res) => {
                // Shuffle array
                const shuffled = res.data.data.sort(() => { return 0.5 - Math.random() });
                // Get sub-array of first nbManches elements after shuffled
                let selected = shuffled.slice(0, nbManches);
                const wordsMapped = selected.map( (word) => {return word.word});
                this.setState({
                    words: wordsMapped,
                    word: wordsMapped[0]
                });
                this.socket.emit('initiate-partie', {
                    id_partie: this.id_partie,
                    players: [{
                        username: this.username,
                        score: 0,
                        isCreator: true
                    }],
                    drawHistory: [],
                    currentManche: 1,
                    words: wordsMapped,
                    currentWord: wordsMapped[0],
                });
            });
            
        } else {

            this.socket.emit('join', { username: this.username, id_partie: this.id_partie });
            this.socket.on('joined', (data) => {

                this.currentWord = data.currentWord;
                this.currentManche = data.currentManche;
                this.words = data.words;
                this.setState({
                    currentWord: data.currentWord,
                    currentManche: data.currentManche,
                    words: data.words
                });
                console.log('joined')
            });
        }

        this.socket.on('next-manche', this.nextManche);
        
        // TO IMPLEMENT
    }

    componentWillUnmount() {
        this.socket.close();
    }

    nextManche() {

        const lastManche = this.state.currentManche;
        const words = this.state.words;
        alert (`Manche Terminée`)

        if ( lastManche + 1 < 3 ) {
            // Il reste au moins une manche à jouer
            alert ('Manche Terminée, prochaine manche !')
            this.socket.emit('clear');
            // On update le state :
            this.setState({
                currentManche: lastManche + 1,
                word: words[lastManche] //attention au décalage des indices
            });
            //La partie continue
        } else {
            //Fin de la partie : le dire à tt le monde
            this.socket.emit('end-of-game');
            alert ('Partie terminée');
            this.endPartie();
            this.props.history.push('/homepage');

        }
    }

    onSuccesfulGuess() {
        // Augmenter le score de celui qui a bon
        const score = this.state.score;
        this.setState({
            score: score + 1
        });
        //+ passer à la manche suivante : POUR TT LE MONDE !
        this.socket.emit('succesful-guess', {id_user: this.id_user });
        //+ prévenir le dessinateur que son mot à changer !
    }


    endPartie() {
        // to implement
    }

    //onChange de l'input "GUESS THE WORD"
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    handleGuess (event) {
        event.preventDefault();
        this.socket.on('guess-answer')
        this.socket.emit('guess',{guessedWord: this.state.guessedWord})
        //on vérifie si le mot est correct :
        console.log('coucou')
        console.log(this.state.currentWord);
        console.log(this.currentWord)
        console.log(this.state.guessedWord);
        if (this.state.currentWord === this.state.guessedWord) {
            this.onSuccesfulGuess();
        } else {
            //Raté !
            alert('Wrong word... Try again !')
        }
        // Reset de la valeur dans l'input
        this.setState({
            guessedWord: ""
        });
    }

    render() {

    // to implement

        return (
            <div>

                <h3> Bienvenue dans la partie !</h3>
                
                <p> Manche : {this.state.currentManche}/{nbManches} </p>
                {this.isCreator && <p>Fais deviner le mot : {this.state.word}</p>}

                <Canvas socket={this.socket} id_partie={1} isCreator={this.isCreator} />
                
                {!this.isCreator &&
                <Form onSubmit={this.handleGuess}>
                <Form.Row>
                    <Col><br/></Col>
                    <Col>
                    <Form.Control
                        type="text"
                        placeholder="Guess the word !"
                        onChange={this.handleChange}
                        value={this.state.guessedWord}
                        name="guessedWord"
                        />
                    </Col>
                    <Col>
                    <Button variant="primary" type="submit" > Guess the word </Button>
                    </Col>
                    <Col><br/></Col>
                </Form.Row>
                <br/>
                </Form>}

            </div>
        );
    }

  
}



export default Partie;
