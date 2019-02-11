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
      token: "",
      refresh_token: "",
      availablesRepos: [
        {
          name: "aui",
          isPrivate: false
        },
        {
          name: "application-links",
          isPrivate: false
        },
        {
          name: "ekergy",
          isPrivate: true
        }
      ],
      isLoading: true
    };
    this.changeRepository = this.changeRepository.bind(this);
  }

  componentDidMount() {
    this.getRepository();
    this.getToken();
  }

  getToken(refreshToken) {
    let body = ""
    if (refreshToken === "true") {
      body = `grant_type=refresh_token&refresh_token=${this.state.refresh_token}`;
    } else {
      body = "grant_type=client_credentials";
    }
    const bt = btoa("TUTYrqhpFN5Tg29dpe:XGJgEeD7j8bdGJyDYLfT3VmU9RN3ZxQw");
    const auth = `Basic ${bt}`;

    fetch(`https://bitbucket.org/site/oauth2/access_token`, {
      method: "POST",
      body: body,
      headers: {
        Authorization: auth,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(data => {
        const token = data.access_token;
        const refresh = data.refresh_token;
        this.setState({
          token: token,
          refresh_token: refresh
        });
      });
  }

  checkIfSelectedRepoIsPrivate() {
    const { availablesRepos, value } = this.state;
    const selectedRepo = availablesRepos.find(repo => {
      return repo.name === value;
    });
    return selectedRepo.isPrivate;
  }

  changeRepository(event) {
    this.setState({
      value: event.target.value,
      isLoading: true
    });
  }



  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.getRepository();
    }

    if (this.state.token && this.state.token !== prevState.token) {
    }

    if (this.state.refresh_token && this.state.refresh_token !== prevState.refresh_token) {
    }
  }

  getRepository() {
    let repositoryId = "";
    let repositoryName = this.state.value;
    const isPrivate = this.checkIfSelectedRepoIsPrivate();
    const headerAuthorization = "Bearer " + this.state.token;
    const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`;
    const privateEndPoint =
      "https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/";

    fetch(
      isPrivate ? privateEndPoint : prEndpoint,
      isPrivate
        ? {
          headers: {
            Authorization: headerAuthorization
          }
        }
        : { headers: {} }
    )
      .then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      })
      .then(data => {
        const onePullRequest = data.values.map(item => {
          return {
            id: item.id,
            uriReviewer: isPrivate ? privateEndPoint + item.id : prEndpoint + item.id
          };
        });

        this.setState({
          pullRequests: onePullRequest
        });

        const urisForFetchReviewers = this.state.pullRequests.map(pullrequest => {
          return pullrequest.uriReviewer;
        }
        );

        const prWithReviewers = [];
        urisForFetchReviewers.map(uri => {
          return (
            fetch(
              uri,
              isPrivate
                ? {
                  headers: {
                    Authorization: headerAuthorization
                  }
                }
                : { headers: {} }
            )
              .then(response => response.json())
              .then(dataWithReviewers => {
                prWithReviewers.push(dataWithReviewers);
                return this.setState({
                  allFinalData: prWithReviewers,
                  isLoading: false
                })
              })
          )
        });
      })
      .catch(function (error) {
        console.log('error', error);
        if (error.status === 401) {
          this.getToken("true");
        }
      })
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
