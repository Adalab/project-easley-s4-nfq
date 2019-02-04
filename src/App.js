import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Footer from "./components/Footer";

let repositoryName = "aui";

let repositoryId = 2242;

const uri = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests`;

const uriReviewer = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`;
console.log("uriReviewer", uriReviewer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
      reviewers: []
    };
  }

  componentDidMount() {
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        console.log("data uri", data);
        const pullRequestInfo = data.values.map((item, index) => {
          return {
            state: item.state,
            date: item.created_on,
            title: item.title,
            author: item.author.display_name,
            comments: item.comment_count,
            avatar: item.author.links.avatar.href,
            branch: item.source.branch.name,
            develop: item.destination.branch.name,
            uriReviewer: uri + "/" + item.id
          };
        });
        this.setState({
          pullRequests: pullRequestInfo
        });

        const uriReviewer = this.state.pullRequests[0].uriReviewer;
        console.log("uriReviewer", uriReviewer);
        console.log("state pullrequests", this.state.pullRequests);

        fetch(uriReviewer)
          .then(response => response.json())
          .then(data => {
            console.log("data uriReviewer", data);
            const pullRequestReviewer = data.reviewers.map((item, index) => {
              return {
                reviewer_name: item.display_name,
                reviewer_avatar: item.links.avatar.href
              };
            });
            this.setState({
              reviewers: pullRequestReviewer
            });
            console.log(this.state.reviewers);
          });
      });
  }

  render() {
    const { pullRequests } = this.state;
    const { reviewers } = this.state;

    return (
      <div className="App">
        {pullRequests.map((pr, index) => {
          return (
            <div key={index}>
              <h3 className="app--card-title">{pr.title}</h3>
              <h4 className="app--card-date">{pr.date}</h4>
              <h4 className="app--card-comments">{pr.comments}</h4>

              <div className="app--card-user">
                <img
                  className="app--card-user-image"
                  src={pr.avatar}
                  alt={pr.author}
                />
                <h4 className="app--card-user-name">{pr.author}</h4>
                <h4 className="app--card-user-branch">{pr.branch}</h4>
              </div>

              <div className="app--card-reviewer">
                {reviewers.map((rv, index) => {
                  return (
                    <div key={index}>
                      <img
                        className="app--card-image-reviewer"
                        src={rv.reviewer_avatar}
                        alt={rv.reviewer_name}
                      />
                      <h4 className="app--card-name-reviewer">
                        {rv.reviewer_name}
                      </h4>
                      <h4 className="app--card-branch-reviewer">
                        {pr.develop}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Summary />;
            }}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
