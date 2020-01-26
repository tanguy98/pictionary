// IMPORTS
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
import { register } from '../utils/Api';
import {Form, Button, Col} from 'react-bootstrap';

// PARAMETRES

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
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    // Met à jour le state avec les valeurs des inputs :
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }


    // Fonction exécutée lors de la création d'un nouveau compte :
    handleRegister(event) {
        let username = event.target.username.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.confirmPassword.value;
        
        if (password === confirmPassword) {
            register(username, password).then((res)=> {
                if (res.status()=== 200) {
                    alert ('Profil créé !');
                    //puis router vers la page login
                }
                else {
                    alert('Could not create user :/ Try again');
                }

            });
        } else {
            alert ('Le mot de passe doit être identique dans les deux champs dédiés')
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
                        <br/>

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
                                            name="username"/>
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
                                            placeholder="Password"
                                            onChange={this.handleChange}
                                            name="password"/>
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
                                            <Form.Label>Confirm password : </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={this.handleChange}
                                            name="confrimPassword"/>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                            </Col>
                            <Col><br/></Col>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            Connexion
                        </Button>
                        <br/>
                    </Form>
                    
                    <Link to={'/login'}>
                        Back to login
                    </Link>
                    <Button onClick={()=> {this.props.history.push("/login")}}>Test routing</Button>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default Register;