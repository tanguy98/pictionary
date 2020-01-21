// IMPORTS
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import { register } from '../utils/Api';
import {Form, Button} from 'react-bootstrap';

// PARAMETRES
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// COMPONENT
class Register extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            userCreated: false,
            error: {
                error: false,
                status: 200,
                message: ""
            },
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        }

        // binding des fonctions
        this.handleError = this.handleError.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    // Gestion d'erreur
    handleError (error) {
        console.log(error)
        let status = 500;
        let message = " Une erreur a eu lieu, rechargez la page svp !";
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

    // Fonction exécutée lors de la création d'un nouveau compte :

    async handleRegister(event) {

        const {username, password, email, confirmPassword } = this.state;
        event.preventDefault();

        // VERIFICATIONS

        if (email === "" || username === "" || password === "" || confirmPassword === "") {
            this.handleError("Missing parameters");
        } else if (username.length >= 13 || username.length <= 4) {
            this.handleError("Username should be between 5 and 12 characters");
        } else if (!PASSWORD_REGEX.test(password)) {
            this.handleError("Password must be between 4 and 8 chars with at least a number");
        } else if (password !== confirmPassword) {
            this.handleError("Confirmation password doesn't match password");
        } else {

            // CREATION D'UN NOUVEL USER

            const userCreated = await register(username, password, this.handleError);
            this.setState({
                userCreated: userCreated
            });
        }
    }

    render() {

        const { error, userCreated} = this.state;

        // Gestion des erreurs
        if (error.error && error.status === 500) {
        return <Alert> Error status : {error.status}. {error.message} </Alert>
        } else if (userCreated) {
            //popup user created
            return <Redirect from="/register" to="/" />
        }
        return (
            <div>
                <div>
                    <h3>Register</h3>
                    <Form onSubmit={this.handleLogin}>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username : </Form.Label>
                            <Form.Control type="username" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm password : </Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Connexion
                        </Button>
                    </Form>
                    
                    <Link to={'/login'}>
                        Back to login
                    </Link>
                </div>
            </div>
        )
    }
}

export default Register;