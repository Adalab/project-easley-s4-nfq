import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
      tab: "OPEN",
      token: "",
      refresh_token: "",
      uriNextPage: "",
      uriPrevPage: "",
      summary: {
        pullrequests: [],
        callsCount: "",
        loading: true,
        uriNextPage: "",
        uriPrevPage: "",
      },
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
    this.handleTab = this.handleTab.bind(this);
    this.getNextPullRequests = this.getNextPullRequests.bind(this);
    this.getPreviousPullRequests = this.getPreviousPullRequests.bind(this);
  }

  handleTab(tab) {
    this.setState({ tab: tab })
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
    const bt = btoa(process.env.REACT_APP_CONSUMER);
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
    const {location } = this.props

    if (this.state.value !== prevState.value) {
      this.getRepository();
    }
    if (this.state.tab !== prevState.tab) {
      this.getRepository();
    }
    if (this.state.token && this.state.token !== prevState.token) {
    }

    if (this.state.refresh_token && this.state.refresh_token !== prevState.refresh_token) {
    }
    if (location.pathname !== prevProps.location.pathname) {}

  }

  getNextPullRequests() {
    const {uriNextPage}= this.state;
    if (uriNextPage !== ""){
      this.getRepository(uriNextPage)
    }
  }

  getPreviousPullRequests(){
    const{uriPrevPage} = this.state;
    if (uriPrevPage){
      this.getRepository(uriPrevPage)
    }
  }

  getRepository(nextUri) {
    let repositoryName = this.state.value;
    const isPrivate = this.checkIfSelectedRepoIsPrivate();
    const headerAuthorization = "Bearer " + this.state.token;

    const prEndpoint = nextUri ||
      `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/?state=${this.state.tab}`;

    const privateEndPoint = nextUri ||
      `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/?state=${this.state.tab}`;

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
        const nextUri = data.next;
        const prevUri = data.previous;

        const onePRPage = data.values.map(item => {
          return {
            id: item.id,
            uriReviewer: isPrivate
              ? `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/` + item.id + `/?state=${this.state.tab}`
              : `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/` + item.id + `/?state=${this.state.tab}`
          };
        });

        this.setState({
          isLoading: false,
          uriNextPage: nextUri,
          uriPrevPage: prevUri
        });



        const urisForFetchReviewers = onePRPage.map(pullrequest => {
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
        if (error.status === 401) {
          this.getToken("true");
        }
      })
  }

  render() {
    const { allFinalData, value, isLoading, tab, uriNextPage, uriPrevPage } = this.state;
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
                  getNextPullRequests = {this.getNextPullRequests}
                  getPreviousPullRequests = {this.getPreviousPullRequests}
                  uriNextPage={uriNextPage}
                  uriPrevPage={uriPrevPage}
                  pullRequests={allFinalData}
                  value={value}
                  isLoading={isLoading}
                  handleTab={this.handleTab}
                  tab={tab}
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

export default withRouter(App)
