import React from 'react';
import logo from '../Assets/pencil2.svg';
import '../App.css';
import {Button} from 'react-bootstrap';
import auth from '../utils/Auth';
import {withRouter} from 'react-router-dom';

class HeadBand extends React.Component {

    constructor(props) {
        super(props);
        // DEF STATE :
        this.state = {
            loggedIn: false
        };
        //BINDING DES FONCTIONS :
        this.onLogOut = this.onLogOut.bind(this);
    }

    //componentDidMount() {
        // vérifier si je suis connecté avec les cookies (éventuellement mettre à jour le state)
    //}

    onLogOut() {
        auth.logout(() => {
            this.props.history.push("/login");
          });
    }

    render() {

        return (
            <div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1> PICTIONARY </h1>
                        {this.state.loggedIn && <Button variant="danger" onClick={this.onLogOut}>LOG OUT</Button>}
                        {!this.state.loggedIn && <br/>}

                    </header>
            
                <div className="BandeNoire"/>
                <div className="Grey-Background-Color"/>

            </div>
        )
    }
}

export default withRouter(HeadBand);