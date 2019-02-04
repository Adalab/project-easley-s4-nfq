import React, { Component } from "react";
import "./Footer.scss";
import AdalabLogo from "../../images/logo-adalab-80px.png";
import NfqLogo from "../../images/nfq-logo.png";

class Footer extends Component {
  render() {
    return (
      <footer className="app__footer">
        <a className="app__footer-logo" href="https://nfq.es" target="_blank" rel="noopener noreferrer">
          <img className="footer-logo-image" src={NfqLogo} alt="logo NFQ" />
        </a>

        <nav className="app__footer-students">

          <a className= "app__footer-student"
            href="https://github.com/claraharguindey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true" />
            <span className="app__footer-student-name">Clara <span className="app__footer-student-lastname">Harguindey</span></span>
          </a>

          <a className= "app__footer-student"

            href="https://github.com/inmasalcedo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true" />
            <span className="app__footer-student-name">Inmaculada <span className="app__footer-student-lastname">Salcedo</span></span>
          </a>

          <a className= "app__footer-student"

            href="https://github.com/elisamartinb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true" />
            <span className="app__footer-student-name">Elisa <span className="app__footer-student-lastname">Martin</span></span>
          </a>

          <a className= "app__footer-student"

            href="https://github.com/katia1802"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" aria-hidden="true" />
            <span className="app__footer-student-name">Katia <span className="app__footer-student-lastname">Rojas</span></span>

          </a>

        </nav>

        <a className="app__footer-logo" href="https://adalab.es" target="_blank" rel="noopener noreferrer">
          <img className="footer-logo-image" src={AdalabLogo} alt="logo ADALAB" />
        </a>
      </footer>
    );
  }
}

export default Footer;
