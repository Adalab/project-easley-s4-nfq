import React, { Component } from 'react';
import './ButtonPagination.scss';

class ButtonPagination extends Component {

  render() {

    return (
      <div className="button_container">
      <button className="previous">Prev</button>
      <button className="next">Next</button>
      </div>
     );
  }
}

export default ButtonPagination;
