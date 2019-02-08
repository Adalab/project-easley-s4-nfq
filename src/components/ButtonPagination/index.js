import React, { Component } from 'react';
import './ButtonPagination.scss';

class ButtonPagination extends Component {
  constructor(props) {
    super(props);
  this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const { next, handleNext } = this.props;
    handleNext(next);
}
  render() {

    return (
      <div className="button_container">
      <button className="previous">Prev</button>
      <button className="next" onClick={this.onClick}>Next</button>
      </div>
     );
  }
}

export default ButtonPagination;
