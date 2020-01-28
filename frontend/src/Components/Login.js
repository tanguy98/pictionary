// IMPORTS

import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {Button, Col, Form} from 'react-bootstrap';
import { login } from '../utils/Api';
import axios from 'axios';


// COMPONENT :

class Login extends Component {

    constructor (props) {
        super (props);
        this.state = {
            username: "",
            password: "",
        }
        // BINDING :
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Fonction exécutée au log in : 
    handleLogin(event) {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;
        login(username, password).then( (res) => {
            // Vérifier que le login a été successful
            if (res.data.loginSuccessful) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('isAdmin', res.data.isAdmin);
                localStorage.setItem('id_user', res.data.id_user);
                localStorage.setItem('username', res.data.username);
                axios.defaults.headers.common.Authorization = `Bearer ${res.token}`;
                if (res.data.isAdmin) {
                    //router vers la page d'administration
                    this.props.history.push("/adminpage");
                } else {
                    this.props.history.push("/homepage");
                }
            } else {
                alert('Unable to login, try again')
            }
        });       
    }

    handleClick() {
        this.props.history.push("/homepage");
    }

    // Met à jour le state avec les valeurs des inputs
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }



  render() {
      return(

        <div>
            <h3>Login</h3>
            <br/>
            <Form onSubmit={this.handleLogin}>
                <Form.Row>
                    <Col><br/></Col>
                    <Col>
                        <Form.Group controlId="formBasicUsername">
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Username : </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                        type="username"
                                        placeholder="Enter username"
                                        onChange={this.handleChange}
                                        name="username"
                                    />
                                    </Col>
                                </Form.Row>
                        </Form.Group>
                    </Col>
                    <Col><br/></Col>
                </Form.Row>

                <Form.Row>
                    <Col><br/></Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Password : </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={this.handleChange}
                                        name="password"
                                    />
                                    </Col>
                                </Form.Row>
                        </Form.Group>
                    </Col>
                    <Col><br/></Col>
                </Form.Row> 
            
                <Button variant="primary" type="submit">
                    Connexion
                </Button>

            </Form>
            <Link to="/register">Créer un compte</Link>
            <br/>
            <br/>
        </div>
);
  }

}

export default Login;
