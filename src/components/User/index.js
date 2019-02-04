import React, { Component, Fragment } from 'react';

class User extends Component {
  render() {
    const { pullRequests } = this.props;
    return (
      <Fragment>
        {pullRequests.map((item, index) => {
          return (
            <div key={index}>
              <img className="app--card-image" src={item.avatar} alt={item.author} />
              <h4 className="app--card-name">{item.author}</h4>
              <h4 className="app--card-branch">{item.branch}</h4>
            </div>
          )
        })}
      </Fragment>
    );
  }
}

export default User;
