//IMPORTS
import React from 'react';
import io from 'socket.io-client';
import random from 'random';
import { connect } from 'react-redux';
import {Form, Col, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import {getWords, leavePartie} from '../utils/Api';
// créer une route get 1 seule partie (les joueurs)
//import CanvasComponent from '../Components/CanvasComponent';
import Canvas from './Canvas';


// CONSTS :

const INFOTEXT_INIT = "Waiting for drawer to launch game";
const INFOTEXT_ATTENTE = "Waiting for players to be ready";
const INFOTEXT_JEU = "Try to guess the word!";
const HANDLELANCERTEXT_INIT = "Launch round";
const HANDLELANCERTEXT_ATTENTE = "Interrupt launching";
const HANDLELANCERTEXT_JEU = "Interrupt round";
const NB_POINTS_INIT = 32;


// Component :

class Partie extends React.Component {

  constructor(props) {
    super(props);

    // Params :
    this.socket = io('http://localhost:8080');

    // Initializing state :
    this.state = {
      nbRounds: 0,
      nbplayers: 0,
      places: 0, // ?
      creatorId: 0,
      isEnded: false,
      nbrguessers: 0,
      nbrguessersPrets: 0,
      listPlayers: [],
      localWinner: false,

      type: "guesser",
      infoText: "Welcome in game",
      handleLancerText: HANDLELANCERTEXT_INIT,

      quit: false,
      etat: "INIT",
      pret: false,
      messages: [],
      alert: null,
      
      word: "",
      guessedWord:""
    };

    //Initializing values
    this.id_partie = // comment les récupérer ?
    this.username = localStorage.getItem('username');
    this.id_user = localStorage.getItem('idUser');
    this.isCreator = // Comment le récupérer ?
    this.token = localStorage.getItem('token');

    this.words = null;
    this.secret = "";
    this.message = "";

    // Binding des fonctions :
    this._setSecret = this._setSecret.bind(this);
    this._handlePret = this._handlePret.bind(this);
    this._handleLancer = this._handleLancer.bind(this);
    this._handleEssai = this._handleEssai.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleQuit = this._handleQuit.bind(this);
    this._messageChange = this._messageChange.bind(this);
    this._refresh = this._refresh.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleGuess = this.handleGuess.bind(this);

  }

  // Refresh the room information from the database

  async _refresh () {
    //to implement
  }

  componentDidMount () {

    // Verify if user is connected

    if (this.token !== "") {

        // Ask to join the room
        this.socket.emit('join', { id_partie: this.id_partie, username: this.username, id_user: this.id_user});   

        // Server answer to joining
        this.socket.on('join', function (data) {
          // Server tells if you are "drawer" or "guesser"
          if (data.type) {
              this.setState({ 
                  type: data.type 
              });
          }
          this._refresh(); 
        }.bind(this));

        // Server sends information on the drawer's readiness

        this.socket.on("pret", function(data) {
            let newEtat = "";
            let newPret = this.state.pret;
            let handleLancerText = "";
            let infoText = "";

            if (data.pret) {
                // If the drawer is ready, go to ATTENTE where you can specify your readiness
                newEtat = "ATTENTE";
                infoText = INFOTEXT_ATTENTE;
                handleLancerText = HANDLELANCERTEXT_ATTENTE;
            } else {

                // If the drawer is not ready, restart the procedure of waiting
                newEtat = "INIT";
                infoText = INFOTEXT_INIT;
                handleLancerText = HANDLELANCERTEXT_INIT;
                // Set to not ready and inform the server
                newPret = false;
                this.socket.emit("pret", { id_partie: this.id_partie, pret: newPret, username: this.props.username });
            }
            this.setState({
                etat: newEtat,
                pret: newPret,
                nbPoints: NB_POINTS_INIT,
                handleLancerText: handleLancerText,
                infoText: infoText
            })
        }.bind(this));

        // Server tells the game has started
        this.socket.on("partie lancee", function() {
            this.setState({
                etat: "JEU",
                handleLancerText: "Interrupt round",
                infoText: "Try and guess the word!"
            });
            if (this.state.type === "drawer") {
                this._setSecret();
            }
        }.bind(this));

        this.socket.on("alert", function(data) {
            this.setState({
                alert: data.message
            })
        }.bind(this));

        // Reception of a message
        // Etat can be [ "info", "drawer quit", "message"]
        this.socket.on('message', function (data) {
            if (data.etat === "info") {
                // Room information has changed, refresh to see the changes
                this._refresh();
            } else if (data.etat === "drawer quit") {
                // No more drawer, the game is ended
                this._handleQuit();
            }
            // Display the content
            this.setState({
                messages: [data.sender + " : " + data.message, ...this.state.messages]
            })
        }.bind(this));
    }
  }

  async _setSecret () {
    if (!this.words) {
        this.words = await getWords(this.props.token, this._handleError);
    }
    if (this.words) {
        const l = this.words.length;
        this.secret = this.words[random.int(0,l-1)].word;
        this.setState({
            infoText: "Vous devez faire deviner le mot \""+this.secret+"\""
        })
        this.socket.emit("secret", { id_partie: this.state.id_partie, word: this.secret });
    }
  }

  _handleLancer = function() {
    const { etat, id_partie } = this.state;
    if (etat === "ATTENTE") {
        this.setState({
            etat: "INIT",
            infoText: INFOTEXT_INIT,
            handleLancerText: HANDLELANCERTEXT_INIT
        });
        this.socket.emit("pret", { id_partie: id_partie, pret: false, username: this.props.username });
    } else if (etat === "INIT") {
        this.setState({
            etat: "ATTENTE",
            infoText: INFOTEXT_ATTENTE,
            handleLancerText: HANDLELANCERTEXT_ATTENTE
        });
        this.socket.emit("pret", { id_partie: id_partie, pret: true, username: this.props.username  });
    } else if (etat === "JEU") {
        this.setState({
            etat: "INIT",
            infoText: INFOTEXT_INIT,
            handleLancerText: HANDLELANCERTEXT_INIT
        });
        this.socket.emit("pret", { id_partie: id_partie, pret: false, username: this.props.username  });
    }
  }

  _handleQuit = function() {
    leavePartie(this.props.match.params.id, this.state.localWinner, this.props.token, this._handleError);
    this.socket.emit("deco", { username: this.props.username, id_partie: this.state.id_partie });
    this.setState({
        quit: true
    })
  }

  _handlePret = function() {
    const newPret = !this.state.pret;
    this.socket.emit("pret", { id_partie: this.state.id_partie, pret: newPret, username: this.props.username });
    this.setState({
        pret: newPret
    });
  }

  _handleEssai = function(e) {
    e.preventDefault();
    if (this.message !== "") {
        const { nbPoints, id_partie } = this.state;
        const { id_user, username } = this.props;

        if (nbPoints >= 2) {
            this.setState({
                nbPoints: nbPoints/2
            });
        }
        this.socket.emit("message", { id_partie: id_partie, message: this.message, id_user: id_user, nbPoints: nbPoints, sender: username });
        this.message = "";
        e.target.reset();
    }
  }

  _messageChange = function(event) {
    this.message = event.target.value;
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
    //on vérifie si le mot est correct :
    if (this.state.word === this.state.guessedWord) {
      // Succes ! on passe à la manche suivante !
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
    const { error, quit, type, id_partie, partieName, players, places, nbRounds, listPlayers, messages, nbPoints, handleLancerText, infoText, pret, etat } = this.state;
    if (error.error) {
        return () => "ERROR"
    } else if (quit || this.props.token === "" ) {
        const roomRoute = "/room/" + id_partie;
        return <Redirect from={roomRoute} to="/user" />
    }
    return (
      <div>

        <h3> Bienvenue dans la partie !</h3>
        <br/>
        <br/>
          <Canvas socket={this.socket} id_partie={1}/>

          {this.type === "guesser" || true &&
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
          </Form>
          }
      </div>
    );
  }

  
}

function mapStateToProps(state, ownProps) {
  return {
      username: state.username,
      id_user: state.id_user,
      token: state.token
  }
}


export default connect(mapStateToProps)(Partie);
