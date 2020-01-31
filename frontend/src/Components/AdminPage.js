// IMPORTS

import React from 'react';
import {Table, Tabs, Tab, Button, Form, Col } from 'react-bootstrap';
import {getRooms, getWords, deleteWord, createWord, deletePartie } from '../utils/Api';

// COMPONENT

class AdminPage extends React.Component {

  // on va essayer d'afficher les mots de la db dans le tableau, puis on implémentera les autres routes
  // A remplacer : le mapping des éléments à afficher et LA FONCTION DANS LES BOUTONS ET L ID AUQUEL ELLE S APPLIQUE !

  constructor (props) {
    super (props);
    // DECLARATIONS DU STATE
    this.state = {
      rooms: [], // array d'object {id_partie , creator_username , [participant 1, ...] }
      words: [], //array de mots de la db
      word: '',
      error: null,
      ongletDefaut: "Parties"
    }
    // BINDING DES FONCTIONS 
    this.handleDeletePartie = this.handleDeletePartie.bind(this);
    this.handleDeleteWord = this.handleDeleteWord.bind(this);
    this.handleAddWord = this.handleAddWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {

    // RECUPERATION DES PARTIES :
    getRooms().then( (res) => {
      this.setState({
        rooms: res.data.rooms
        });
    });

    //RECUPERATION DES MOTS :
    getWords().then( (res) => {
      this.setState({
      words: res.data.data
      });
    });
  }

  handleDeleteWord(id_word) {

    deleteWord(id_word)
    .then( (response) => {
      //RECUPERATION DES MOTS :
      getWords().then( (res) => {
        this.setState({
        words: res.data.data
        });
      });
    });
  }

  handleDeletePartie(id_partie) {
    deletePartie(id_partie)
    .then( (response) => {
      // RECUPERATION DES PARTIES :
      getRooms().then( (res) => {
        this.setState({
          rooms: res.data.rooms
          });
      });
    });
  }

  handleAddWord(event) {
    event.preventDefault();
    createWord(this.state.word)
    .then( (response) => { 
      //RECUPERATION DES MOTS :
      getWords().then( (res) => {
        this.setState({
        words: res.data.data,
        word: ''
        });
      });
    });
  }

  //onChange de l'input "ADD WORDS"
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  
  render() {

    // Mapping des parties :
    let roomsMap = this.state.rooms.map( (room) => {
      let playersMap = room.Users.map( (user) => {
        if (user.isCreator) {
          return <p>{user.username} (Créateur de la partie)</p>
        }
        else {
          return <p>{user.username}</p>
        }
      }
        
      );

      return(
        <tr>
          <td>{room.id}</td>
          <td>{playersMap}</td>
          <td>
            <Button
              onClick={() => this.handleDeletePartie(room.id)}
              >
                Supprimer
            </Button>
          </td>
        </tr>
      )
    });

    // Mapping des mots :
    const wordsMap = this.state.words.map( (word) =>
      <tr>
        <td>{word.word}</td>
        <td>
          <Button
            onClick={() => this.handleDeleteWord(word.id)}
          >
            Supprimer
          </Button>
        </td>
      </tr>
    );

    return(
      <div>
        <h3> Administration </h3>
        <br/>
        <Tabs defaultActiveKey={this.ongletDefaut} >

          <Tab eventKey="Parties" title="Parties">
            <br/>
            <h3> Parties :</h3>
            <br/>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>JOUEURS</th>
                    <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                  {roomsMap}
                </tbody>
            </Table>
          </Tab>

          <Tab eventKey="words" title="Words">
            <br/>
            <h3> Mots disponibles :</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>WORD</th>
                    <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                  {wordsMap}
                </tbody>
            </Table>
            <br/>

            <Form onSubmit={this.handleAddWord}>
              <Form.Row>
                <Col><br/></Col>
                <Col>
                  <Form.Control
                  type="text"
                  placeholder="Nouveau mot à faire deviner"
                  onChange={this.handleChange}
                  value={this.state.word}
                  name="word"
                  />
                </Col>
                <Col>
                <Button variant="primary" type="submit" > Add Word </Button>
                </Col>
                <Col><br/></Col>
              </Form.Row>
              <br/>
            </Form>
    
            
          </Tab>

        </Tabs>
        <br/>
        <br/>
        
      </div>
      
      
      );
  }

}

export default AdminPage;
