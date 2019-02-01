import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Summary from './components/Summary';
import Footer from './components/Footer';
import DetailsContainer from './components/DetailsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
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
          <Route
            exact
            path="/details"
            render={() => {
              return (
                <DetailsContainer />
              )
            }}
          />
        </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
