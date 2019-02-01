import React, { Component } from 'react';
import './App.css';

let repositoryName = 'aui';

let repositoryId = '';

const apiCall = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`


class App extends Component {
  constructor (props){
    super (props);
    this.state = {
    pullRequest: [],
    }
    console.log (this.state.title)
  }
  
  componentDidMount (){
    fetch (apiCall)
      .then (response => response.json())
      .then (data => {
        console.log (data.values)
        const pullRequestInfo = data.values.map((item, index)=>{
        
          return {
            state: item.state,
            date: item.created_on,
            title: item.title,
            author: item.author.display_name,
            comments: item.comment_count,
          }
        })

        this.setState ({
          pullRequest: pullRequestInfo
        })
      })
  }

  render() {
    return (
      <div className="App">



      </div>
    );
  }
}

export default App;
