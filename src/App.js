import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Summary from './components/Summary';
import Footer from './components/Footer';
import DetailsContainer from './components/DetailsContainer';
import { getPullRequestInfo } from './Services/RepositoryService';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
    }
  }
  componentDidMount() {
    getPullRequestInfo()
      .then(data => {
        const pullRequestInfo = data.values.map((item, index) => {
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

        this.setState({
          pullRequests: pullRequestInfo
        })
      })
  }

  handleDate(date) {
    let newDate = date.substring(0, 10);
    newDate = newDate.split("-");
    newDate = newDate.reverse();
    const dayDate = parseInt(newDate[0]);
    const monthDate = parseInt(newDate[1]);
    const yearDate = parseInt(newDate[2]);
    newDate = newDate.join("-");
    const infoDate = {
      date: newDate,
      day: dayDate,
      month: monthDate,
      year: yearDate,
    }
    return infoDate
  }

  render() {
    const { pullRequests } = this.state;

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
        <main>
          <Switch>
            <Route
              exact
              path="/summary"
              render={() => {
                return (
                  <Summary />
                )
              }}
            />
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <DetailsContainer pullRequests={pullRequests} />
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
