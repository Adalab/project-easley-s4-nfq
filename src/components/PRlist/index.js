import React, { Component } from 'react';
import PRcard from '../PRcard';

class PRlist extends Component {
  render() {
    const { pullRequests } = this.props;
    const { creationDate } = this.props;
    return (
      <ul>
        {pullRequests.map((item, index) => {
          return (
            <li key={index}>
              <PRcard
              avatar={item.avatar}
              author={item.author}
              branch={item.branch} />
            </li>
          )
        })}
      </ul>


    );
  }
}

export default PRlist;
