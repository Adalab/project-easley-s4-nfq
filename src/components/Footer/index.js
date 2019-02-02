import React, { Component } from 'react';
import './Footer.scss';
import AdalabLogo from "../../images/logo-adalab-80px.png";
import NfqLogo from "../../images/nfq-logo.png";

class Footer extends Component {
    render() {
        return (
            <footer>
                <a 
                href="https://adalab.es"
                target="_blank"
                rel="noopener noreferrer">
                <img src={AdalabLogo} alt="logo ADALAB"></img>
                </a>
                <nav>
                <a 
                href="https://github.com/claraharguindey" 
                target="_blank"
                rel="noopener noreferrer">
                <i class="fab fa-github" aria-hidden="true"></i>
                Clara Harguindey
                </a>
                <a 
                href="https://github.com/inmasalcedo" 
                target="_blank"
                rel="noopener noreferrer">
                <i class="fab fa-github" aria-hidden="true"></i>
                Inmaculada Salcedo
                </a>
                <a 
                href="https://github.com/elisamartinb" 
                target="_blank"
                rel="noopener noreferrer">
                <i class="fab fa-github" aria-hidden="true"></i>
                Elisa Martin
                </a>
                <a 
                href="https://github.com/katia1802" 
                target="_blank"
                rel="noopener noreferrer">
                <i class="fab fa-github" aria-hidden="true"></i>
                Katia Rojas
                </a>
                </nav>
                <a 
                href="https://nfq.es"
                target="_blank"
                rel="noopener noreferrer">
                <img src={NfqLogo} alt="logo NFQ"></img>
                </a>
            </footer>
        );
    }
}

export default Footer;
