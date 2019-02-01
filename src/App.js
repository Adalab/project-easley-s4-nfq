import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Summary from './components/Summary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <Summary />
              )
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
