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
    let repositoryId = "";
    let repositoryName = this.state.value;

    const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`;

    fetch(prEndpoint)
      .then(response => response.json())
      .then(data => {
        const pullRequestInfo = data.values.map(item => {
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
            repository: item.destination.repository.full_name
          };
        });
        this.setState({
          pullRequests: pullRequestInfo
        });

        const uriReviewer = this.state.pullRequests[0].uriReviewer;

        fetch(uriReviewer)
          .then(response => response.json())
          .then(data => {
            const pullRequestReviewer = data.reviewers.map(item => {
              return {
                reviewer_name: item.display_name,
                reviewer_avatar: item.links.avatar.href
              };
            });
            this.setState({
              reviewers: pullRequestReviewer
            });
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
    const { pullRequests, value } = this.state;
    const changeRepository = this.changeRepository;

    return (
      <div className="App">
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
                return (
                  <DetailsContainer pullRequests={pullRequests} value={value} />
                );
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
