import React from 'react';
import logo from '../../Assets/logo.svg';
import '../../App.css';

function HeadBand() {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> PICTIONARY </h1>
                <div/> {/* ne pas supprimer permet de gérer la présentation du bandeau titre (logo tout à gauche et titre centré)*/}
                    
            </header>
        
            <div className="BandeNoire"/>
        </div>
    )
}

export default HeadBand;