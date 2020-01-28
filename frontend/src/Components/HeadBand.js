import React from 'react';
import logo from '../Assets/pencil2.svg';
import '../App.css';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class HeadBand extends React.Component {

    constructor(props) {
        super(props);

        //BINDING DES FONCTIONS :
        this.onLogOut = this.onLogOut.bind(this);
    }


    onLogOut() {
        localStorage.clear();
        this.setState({
            token: null
        });
        this.props.history.push("/login");
    }

    render() {

        return (
            <div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1> PICTIONARY </h1>
                        {localStorage.getItem('token') && <Button variant="danger" onClick={this.onLogOut}>LOG OUT</Button>}
                        {!localStorage.getItem('token') && <br/>}

                    </header>
            
                <div className="BandeNoire"/>
                <div className="Grey-Background-Color"/>

            </div>
        )
    }
}

export default withRouter(HeadBand);