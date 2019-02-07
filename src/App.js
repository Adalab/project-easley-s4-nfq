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
      value: "aui",
      tab: "1",
    };
    this.changeRepository = this.changeRepository.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.hideTab = this.hideTab.bind(this);
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

  handleTab(event) {
    const { value } = event.currentTarget.attributes.tab;
    this.state.tab === value
      ? this.setState({ tab: "0" })
      : this.setState({ tab: value });
  }

  hideTab(tab) {
    let hideTab = "";
    const openTab = this.state.tab;
    tab !== openTab ? (hideTab = "details__tab--selected") : (hideTab = "");
    return hideTab;
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
              path="/"
              render={() => {
                return <Summary />;
              }}
            />
            <Route
              exact
              path="/details"
              render={() => {
                return (
                  <DetailsContainer
                  pullRequests={pullRequests}
                  value={value}
                  handleTab={this.handleTab}
                  hideTab={this.hideTab}
                  tab="1"
                  />
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
