import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import Slider from './components/Monitor/Slider';

ReactDOM.render(
    <HashRouter>
        <Slider />
    </HashRouter>,
document.getElementById('root'));

