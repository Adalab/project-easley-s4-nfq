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
      allFinalData: [],
      value: "aui",
      isLoading: true
    };
    this.changeRepository = this.changeRepository.bind(this);
  }

  changeRepository(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.getRepository();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.getRepository();
    }
  }

  getRepository() {
    let repositoryId = "";
    let repositoryName = this.state.value;
    console.log('repositoryName',repositoryName);
    const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`;

    console.log('prEndpoint',prEndpoint);
    fetch(prEndpoint)
      .then(response => response.json())
      .then(data => {
        const onePullRequest = data.values.map(item => {
          return {
            id: item.id,
            uriReviewer: prEndpoint + item.id,
          };
        });

        this.setState({
          pullRequests: onePullRequest,
          isLoading: false
        });

        const urisForFetchReviewers = this.state.pullRequests.map(pullrequest => {
          return pullrequest.uriReviewer;
          }
        );
        
        const prWithReviewers = [];
        urisForFetchReviewers.map(uri => {

          return (
          fetch(uri)
            .then(response => response.json())
            .then(dataWithReviewers => {
              prWithReviewers.push(dataWithReviewers);
              return this.setState({
                allFinalData: prWithReviewers
              })
            })
        )});
      });
  }

  render() {
    const { allFinalData, value, isLoading } = this.state;
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
                  pullRequests={allFinalData}
                  value={value}
                  isLoading={isLoading}
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
