import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Summary from './components/Summary';
import Footer from './components/Footer';

let repositoryName = 'aui';

let repositoryId = '';

const uri = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`


class App extends Component {
  constructor (props){
    super (props);
    this.state = {
    pullRequests: [],
    }
  }

  componentDidMount (){
    fetch (uri)
      .then (response => response.json())
      .then (data => {
        console.log (data)
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
         <h3 className="app--card-title">{item.title}</h3>
         <h4 className="app--card-date">{item.date}</h4>
         <h4 className="app--card-comments">{item.comments}</h4>
         <div className="app--card-user">
         <img className="app--card-image" src={item.avatar} alt={item.author} />
         <h4 className="app--card-name">{item.author}</h4>
         <h4 className="app--card-branch">{item.branch}</h4>
         </div>
        </div>
      )})}
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
        <Footer />
      </div>
    );
  }
}

export default App;
