// IMPORTS
import React from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/Api';
import {Form, Button, Col} from 'react-bootstrap';

// PARAMETRES

// COMPONENT
class Register extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: ""
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
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.confirmPassword.value;
        
        if (password === confirmPassword) {
            //On envoie la requête de register
            register(username, password)
            .then((res)=> {
                console.log(res.data.id);
                if (res.data.id) {
                    alert ('Profil créé !');
                    //puis router vers la page login
                    this.props.history.push("/login");
                }
                else {
                    alert('Could not create user :/ Try again');
                }

            })
            .catch( (error) => {
                alert(error) //essayer de rendre ça plus clair ! (erreur 409 = l'utilisateur existe déjà)
            });
        } else {
            alert ('Le mot de passe doit être identique dans les deux champs dédiés')
        }

    }

    render() {

        return (
            <div>
                <div>
                    <h3>Register</h3>
                    <Form onSubmit={this.handleRegister}>
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
                                            name="confirmPassword"/>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                            </Col>
                            <Col><br/></Col>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            Créer un compte
                        </Button>
                        <br/>
                    </Form>
                    
                    <Link to={'/login'}>
                        Back to login
                    </Link>

                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default Register;