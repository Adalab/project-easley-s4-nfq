import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Summary from './components/Summary';
import Footer from './components/Footer';
import DetailsContainer from './components/DetailsContainer';

let repositoryName = 'aui';

let repositoryId = '';

const apiCall = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`


class App extends Component {
  constructor (props){
    super (props);
    this.state = {
    pullRequests: [],
    }
  }

  componentDidMount (){
    fetch (apiCall)
      .then (response => response.json())
      .then (data => {
        const pullRequestInfo = data.values.map((item, index)=>{
          return {
            state: item.state,
            date: item.created_on,
            title: item.title,
            author: item.author.display_name,
            comments: item.comment_count,
            avatar: item.author.links.avatar.href,
            branch: item.source.branch.name,
          }
        })

        this.setState ({
          pullRequests: pullRequestInfo
        })
      })
  }

  render() {
    const {pullRequests} = this.state;

    return (
      <div className="App">
      {pullRequests.map((item, index) => {
      return (
        <div key={index}>
         <h3>{item.title}</h3>
         <h4>{item.date}</h4>
         <h4>{item.comments}</h4>
         <img src={item.avatar} alt={item.author} />
         <h4>{item.author}</h4>
         <h4>{item.branch}</h4>
        </div>
      )})}
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
