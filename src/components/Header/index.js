import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <header>
                <h1>NFQ</h1>
                <button>Menu</button>
                <div>
                    <nav>
                        <Link to="/">Summary</Link>
                        <Link to="/">Details</Link>       
                    </nav>
                <select>
                    <option>REPOSITORY 1</option>
                    <option>REPOSITORY 2</option>
                    <option>REPOSITORY 3</option>
                </select>
                </div>
            </header>
        );
    }
}

export default Header;
