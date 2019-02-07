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
        const onePullRequest = data.values.map(item => {
          // console.log("item", item);
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
          pullRequests: onePullRequest
        });
        // console.log ('this.state.pullRequests', this.state.pullRequests)

        const urisForFetchReviewers = this.state.pullRequests.map(pullrequest => {
          return pullrequest.uriReviewer;
          }
        ); //Aqui hay un array con 2 urisForFetchReviewers

        urisForFetchReviewers.map((uri, index) => { //Aqui mapeo cada uri
          return (
          fetch(uri)
            .then(response => response.json())
            .then(dataWithReviewers => {
              console.log("dataWithReviewers", dataWithReviewers);
              return this.state.allFinalData.push(dataWithReviewers)
            })
        )});
      });
  }

  render() {
    const { allFinalData, value } = this.state;
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
                  <DetailsContainer pullRequests={allFinalData} value={value} />
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
