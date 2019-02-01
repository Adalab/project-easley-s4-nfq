import React, { Component, Fragment } from 'react';
import StatusTab from '../StatusTab';

class DetailsContainer extends Component {

    render() { 
        return ( 
            <Fragment>
            <h2>REPOSITORIO SELECCIONADO</h2>
            <select>
                <option>OPEN</option>
                <option>MERGED</option>
                <option>DECLINED</option>
            </select>
            <StatusTab /*status onclick className*//>
            <StatusTab />
            <StatusTab />
            <PRlist />
            </Fragment>
        );
    }
}

export default DetailsContainer;