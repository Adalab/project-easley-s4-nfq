import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import DetailsContainer from "./components/DetailsContainer";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
      reviewers: [],
      value: "aui"
    };
    this.changeRepository = this.changeRepository.bind(this);
  }

  changeRepository(event) {
    this.setState({ value: event.target.value });
  }


  componentDidMount() {
    this.getRepository();
  }

  componentDidUpdate(prepProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.getRepository();
    }
  }

  getRepository() {
    let repositoryId = '';
    let repositoryName = this.state.value;
    console.log('this state', this.state.value);

    const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`
    console.log(prEndpoint);

    fetch(prEndpoint)
      .then(response => response.json())
      .then(data => {
        const pullRequestInfo = data.values.map((item, index) => {
          return {
            id: item.id,
            state: item.state,
            date: item.created_on,
            title: item.title,
            author: item.author.display_name,
            comments_number: item.comment_count,
            avatar: item.author.links.avatar.href,
            branch: item.source.branch.name,
            develop: item.destination.branch.name,
            uriReviewer: prEndpoint + item.id,
            repository: item.destination.repository.full_name,
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
            console.log("data", data);
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
      year: yearDate
    };
    return infoDate;
  }

  render() {
    const { pullRequests } = this.state;
    const { reviewers } = this.state;
    const { value } = this.state;
    const changeRepository = this.changeRepository;

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
        <Header value={value} changeRepository={changeRepository} />
        <main>
          <Switch>
            <Route
              exact
              path="/summary"
              render={() => {
                return <Summary />;
              }}
            />
            <Route
              exact
              path="/"
              render={() => {
                return <DetailsContainer pullRequests={pullRequests} value={value} />;
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
