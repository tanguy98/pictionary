// IMPORTS

import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { login } from '../utils/Api';

//PARAMETRES
const NO_ERROR = {
    error: false,
    status: 200,
    message: ""
};

const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// COMPONENT :

class Login extends Component {

    constructor (props) {
        super (props);
        this.state = {
            connectAdmin: false,
            connectUser: false,
            error: NO_ERROR,
            email: "",
            password: "",
            formErrors: {
                email: "",
                password: "",
              }

        }
        // BINDING :
        this.handleLogin = this.handleLogin.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Fonction exécutée au log in : 
    async handleLogin(event) {
                // Connexion
                console.log(event);
                /*event.preventDefault();

                const { email, password } = this.state;
        
                if (!email || !password ) {
                   this.handleError('missing parameters');
                } else if (!EMAIL_REGEX.test(email)) {
                    this.handleError('wrong email format');
                } else if (!PASSWORD_REGEX.test(password)) {
                    this.handleError('password must be between 4 and 8 chars with at least a number');
                } else {
                    const result = await login(email, password, this.handleError)
                    const action = { type: "CREATE_USER", value: { token: result.token, username: result.username, userId: result.userId, isAdmin: result.isAdmin } };
                    if (result.isAdmin){
                        this.props.dispatch(action);
                        this.setState({
                            connectAdmin: true
                        });
                    } else if (result.token) {
                        this.props.dispatch(action);
                        this.setState({
                            connectUser: true
                        });
                    }
                }*/
                
            }

    // GESTION D ERREUR :
    handleError (error) {
        console.log(error)
        let status = 500;
        let message = "error occured, please refresh page";
        if (error && error.response) {
            status = error.response.status;
            message = "error : " + error.response.data.error + "; message : " + error.response.data.message;
        } else if (error) {
            message = error;
        }
        
        this.setState({
            error: {
                error: true,
                status: status,
                message: message
            }
        });
    }

    handleChange (event) {
        // to implement
    }

// parametre value
//onChange pour mettre a jour le state


  render() {
      return(

        <div>
            <h3>Login</h3>

            <Form onSubmit={this.handleLogin}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Email : </Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password : </Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Password"
                     />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Connexion
                </Button>

            </Form>

            <Link to="/register">Créer un compte</Link>
        </div>
);
  }

}

export default Login;
