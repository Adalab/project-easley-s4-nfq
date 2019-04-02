import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <header className="header-container">
        <div className="header_display">
          <div className="header_title-container">
            <h1 className="header_nfq">NFQ</h1>
            <h2 className="header_title">Pull Request</h2>
          </div>
          <nav className="header_nav">
            <Link className="header_summary" to="/">
              Summary
            </Link>
            <Link className="header_details" to="/details">
              Details
            </Link>
            <Link className="header_details" to="/details">
              Monitor
            </Link>
          </nav>
          <div className="header_selector-container">
            <select
              className="header_selector-items"
              value={this.props.value}
              onChange={this.props.changeRepository}
            >
              <option value="aui">aui</option>
              <option value="application-links">application-links</option>
              <option value="adalab-easley">adalab-easley</option>
            </select>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  value: PropTypes.string,
  changeRepository: PropTypes.func
}
export default Header;
