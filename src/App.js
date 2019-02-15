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
      summaryData: {
        open: "",
        merged: "",
        declined: "",
        ready: false
      },
      repoSelected: {
        OPENSize: "",
        fullOpenSummary: false,
        OPENPullRequests: [],
        OPENallFinalData: [],

        MERGEDSize: "",
        MERGED: [],
        fullMergedSummary: false,
        MERGEDPullRequests: [],
        MERGEDallFinalData: [],
        uriNextPageMERGED: "",
        uriPrevPageMERGED: "",

        DECLINEDSize: "",
        DECLINED: [],
        fullDeclinedSummary: false,
        DECLINEDPullRequests: [],
        DECLINEDallFinalData: [],
        uriNextPageDECLINED: "",
        uriPrevPageDECLINED: "",
      },

      value: "aui",
      tab: "OPEN",
      token: "",
      size: "",
      refresh_token: "",
      uriNextPage: "",
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
    this.getRepository = this.getRepository.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  handleTab(tab) {
    this.setState({
      tab: tab,
      isLoading: true
    })
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

  createSummaryData() {
    const { OPENSize, MERGEDSize, DECLINEDSize } = this.state.repoSelected;
    this.setState({
      summaryData: {
        open: OPENSize,
        merged: MERGEDSize,
        declined: DECLINEDSize,
        ready: true
      }
    });
  }

  fullData() {
    this.setState(prevState => ({
      repoSelected: {
        ...prevState.repoSelected,
        fullOpenSummary: true,
        fullMergedSummary: true,
        fullDeclinedSummary: true
      },
    }))
  }



  componentDidUpdate(prevProps, prevState) {
    const { value, tab, token, refresh_token, summaryData} = this.state;
    const { uriNextPageMERGED, MERGED, MERGEDallFinalData, uriNextPageDECLINED, DECLINED, DECLINEDallFinalData, OPENallFinalData, fullOpenSummary, fullMergedSummary, fullDeclinedSummary, } = this.state.repoSelected;

    if (value !== prevState.value) {
      this.getRepository();
    }
    if (tab !== prevState.tab) {
      this.getRepository();
    }
    if (token && token !== prevState.token) {
    }
    if (refresh_token && refresh_token !== prevState.refresh_token) {
    }

    if (uriNextPageMERGED !== ""
        && uriNextPageMERGED !== prevState.repoSelected.uriNextPageMERGED
        && ((MERGED.length - 1) * 50) < 200)    {
      this.getRepository(uriNextPageMERGED, "MERGED", "summary")
      MERGED.push(MERGEDallFinalData)
    }


    if (uriNextPageDECLINED !== ""
      && uriNextPageDECLINED !== prevState.repoSelected.uriNextPageDECLINED
      && ((DECLINED.length - 1) * 50) < 200) {
      this.getRepository(uriNextPageDECLINED, "DECLINED", "summary")
      DECLINED.push(DECLINEDallFinalData)
    }


    if (((MERGED.length - 1) * 50) >= 200
    && ((DECLINED.length - 1) * 50) >= 200
    && ((OPENallFinalData.length - 1) * 50) >= 50
    && fullOpenSummary === false) {
      this.fullData()
    }


    if (fullOpenSummary && fullOpenSummary !== prevState.repoSelected.fullOpenSummary) {
    }

    if (fullOpenSummary === true
      && fullMergedSummary === true
      && fullDeclinedSummary === true
      && summaryData.ready === false) {
      this.createSummaryData();
    }
  }

  getNextPullRequests() {
    const { uriNextPage } = this.state;
    if (uriNextPage !== "") {
      this.getRepository(uriNextPage)
    }
  }

  getPreviousPullRequests() {
    const { uriPrevPage } = this.state;
    if (uriPrevPage) {
      this.getRepository(uriPrevPage)
    }
  }


  getRepository(nextUri, status, route) {
    let pagelen = "";
    let updated = "";
    if (route !== "summary") {
      status = this.state.tab
      pagelen = 10;
      updated = "";
    } else {
      pagelen = 50;
      updated = "&sort=-updated_on";
    }
    let repositoryName = this.state.value;
    const isPrivate = this.checkIfSelectedRepoIsPrivate();
    const headerAuthorization = "Bearer " + this.state.token;
    const selectedPullRequest = status + "PullRequests";
    const selectedNextPage = "uriNextPage" + status;
    const selectedPrevPage = "uriPrevPage" + status;
    const selectedSize = status + "Size";
    const selectedallFinalData = status + "allFinalData"


    const prEndpoint = nextUri ||
      `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/?pagelen=${pagelen}&state=${status}${updated}`;

    const privateEndPoint = nextUri ||
      `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/?pagelen=${pagelen}&state=${status}${updated}`;

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
        const size = data.size;
        const onePullRequest = data.values.map(item => {
          return {
            id: item.id,
            uriReviewer: isPrivate
              ? `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/` + item.id + `/?pagelen=${pagelen}&state=${status}${updated}`
              : `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/` + item.id + `/?pagelen=${pagelen}&state=${status}${updated}`
          };
        });

        if (route !== "summary") {
          this.setState({
            pullRequests: onePullRequest,
            uriNextPage: nextUri,
            uriPrevPage: prevUri,
          });
        } else {
          this.setState(prevState => ({
            repoSelected: {
              ...prevState.repoSelected,
              [selectedNextPage]: nextUri,
              [selectedPrevPage]: prevUri,
              [selectedPullRequest]: onePullRequest,
              [selectedSize]: size
            },
          }));

        }




        if (route !== "summary") {

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
                    isLoading: false,
                  })
                })
            )
          });
        } else {
          const urisForFetchReviewers2 = this.state.repoSelected[selectedPullRequest].map(pullrequest => {
            return pullrequest.uriReviewer;
          }
          );
          const prWithReviewers2 = [];
          urisForFetchReviewers2.map(uri => {
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
                  prWithReviewers2.push(dataWithReviewers);
                  return this.setState(prevState => ({
                    //allFinalData: prWithReviewers,
                    //isLoading: false,
                    repoSelected: {
                      ...prevState.repoSelected,
                      [selectedallFinalData]: prWithReviewers2,
                    },

                  }))
                })
            )
          });
        }

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
                return <Summary
                  getRepository={this.getRepository}
                  getToken={this.getToken}
                />;
              }}
            />
            <Route
              exact
              path="/details"
              render={() => {
                return (
                  <DetailsContainer
                    getNextPullRequests={this.getNextPullRequests}
                    getPreviousPullRequests={this.getPreviousPullRequests}
                    uriNextPage={uriNextPage}
                    uriPrevPage={uriPrevPage}
                    pullRequests={allFinalData}
                    value={value}
                    isLoading={isLoading}
                    handleTab={this.handleTab}
                    tab={tab}
                    getRepository={this.getRepository}
                    getToken={this.getToken}
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
