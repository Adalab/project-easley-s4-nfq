import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import DetailsContainer from "./components/DetailsContainer";

const uriBase = 'https://api.bitbucket.org/2.0/repositories/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFinalData: [],
      summaryData: {
        open: "",
        merged: "",
        declined: "",
        ready: false,
        totalOpen: [],
        totalMerged: [],
        totalDeclined: []
      },
      repoSelected: {
        OPENallFinalData: [],
        OPENSize: "",
        fullOpenSummary: false,
        MERGEDSize: "",
        MERGED: [],
        fullMergedSummary: false,
        MERGEDallFinalData: "",
        uriNextPageMERGED: "",
        uriPrevPageMERGED: "",
        DECLINEDSize: "",
        DECLINED: [],
        fullDeclinedSummary: false,
        DECLINEDallFinalData: [],
        uriNextPageDECLINED: "",
        uriPrevPageDECLINED: "",
      },

      value: "aui",
      tab: "OPEN",
      token: '',
      size: "",
      refresh_token: '',
      uriNextPage: '',
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

  componentDidMount() {
    if (this.props.location.pathname.includes("details")) {
      this.getRepository(null, "OPEN");
    } else {
      this.getRepository(null, "OPEN", "summary");
      this.getRepository(null, "MERGED", "summary");
      this.getRepository(null, "DECLINED", "summary");
    }
    this.getToken();
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      if (this.props.location.pathname.includes("details")) {
        this.getRepository();
      } else {
        this.getRepository(null, "OPEN", "summary");
        this.getRepository(null, "MERGED", "summary");
        this.getRepository(null, "DECLINED", "summary");
      }
    }
    if (this.state.tab !== prevState.tab) {
      this.getRepository();
    }

    if (this.state.repoSelected.uriNextPageMERGED !== "" &&
      this.state.repoSelected.uriNextPageMERGED !== prevState.repoSelected.uriNextPageMERGED &&
      ((this.state.repoSelected.MERGED.length - 1) * 50) < 200) {
      this.getRepository(this.state.repoSelected.uriNextPageMERGED, "MERGED", "summary")
      this.state.repoSelected.MERGED.push(this.state.repoSelected.MERGEDallFinalData)
    }


    if (this.state.repoSelected.uriNextPageDECLINED !== "" &&
      this.state.repoSelected.uriNextPageDECLINED !== prevState.repoSelected.uriNextPageDECLINED &&
      ((this.state.repoSelected.DECLINED.length - 1) * 50) < 200) {
      this.getRepository(this.state.repoSelected.uriNextPageDECLINED, "DECLINED", "summary")
      this.state.repoSelected.DECLINED.push(this.state.repoSelected.DECLINEDallFinalData)
    }


    if (((this.state.repoSelected.MERGED.length - 1) * 50) >= 200 &&
      ((this.state.repoSelected.DECLINED.length - 1) * 50) >= 200 &&
      ((this.state.repoSelected.OPENallFinalData.length - 1) * 50) >= 50 &&
      this.state.repoSelected.fullOpenSummary === false) {
      this.fullData()
    }


    if (this.state.repoSelected.fullOpenSummary === true &&
      this.state.repoSelected.fullMergedSummary === true &&
      this.state.repoSelected.fullDeclinedSummary === true &&
      this.state.summaryData.ready === false
    ) {
      this.createSummaryData();
    }
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
      isLoading: true,
      summaryData: {
        open: "",
        merged: "",
        declined: "",
        ready: false,
        totalOpen: [],
        totalMerged: [],
        totalDeclined: []
      }
    })
  }

  createSummaryData() {
    this.setState({
      summaryData: {
        open: this.state.repoSelected.OPENSize,
        merged: this.state.repoSelected.MERGEDSize,
        declined: this.state.repoSelected.DECLINEDSize,
        ready: true,
        totalOpen: this.state.repoSelected.OPENallFinalData,
        totalMerged: this.state.repoSelected.MERGED,
        totalDeclined: this.state.repoSelected.DECLINED
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
    const selectedNextPage = "uriNextPage" + status;
    const selectedPrevPage = "uriPrevPage" + status;
    const selectedSize = status + "Size";
    const selectedallFinalData = status + "allFinalData";
    const repoPath = isPrivate ? 'ekergy/adalab-easley' : `atlassian/${repositoryName}`;
    const prPageEndpoint = nextUri ||
      `${uriBase}${repoPath}/pullrequests/?pagelen=${pagelen}&state=${status}${updated}`;
    const fetchInitData = isPrivate
      ? {
        headers: {
          Authorization: headerAuthorization
        }
      }
      : { headers: {} };

    fetch(
      prPageEndpoint,
      fetchInitData
    )
      .then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      })
      .then(data => {
        const { next, previous, size, values } = data;
        const prEndpointStart = `${uriBase}${repoPath}/pullrequests/`;
        const prEndpointEnd = `/?pagelen=${pagelen}&state=${status}${updated}`;

        //PAGINATION

        if (route !== "summary") {
          this.setState({
            uriNextPage: next,
            uriPrevPage: previous,
          });
        } else {
          this.setState(prevState => ({
            repoSelected: {
              ...prevState.repoSelected,
              [selectedNextPage]: next,
              [selectedPrevPage]: previous,
              [selectedSize]: size
            },
          }));
        }

        //FETCH SINGLES PULLREQUEST

        const urisForFetchReviewers = values.map(item => {
          return prEndpointStart + item.id + prEndpointEnd;
        });

        const prWithReviewers = [];
        urisForFetchReviewers.map(uri => {
          return (
            fetch(
              uri,
              fetchInitData
            )
              .then(response => response.json())
              .then(dataWithReviewers => {
                prWithReviewers.push(dataWithReviewers);
                if (route !== "summary") {
                  return this.setState({
                    allFinalData: prWithReviewers,
                    isLoading: false,
                  })
                } else {
                  return this.setState(prevState => ({
                    repoSelected: {
                      ...prevState.repoSelected,
                      [selectedallFinalData]: prWithReviewers,
                    },

                  }));
                }
              })
          );
        });
      })
      .catch(function (error) {
        if (error.status === 401) {
          this.getToken("true");
        }
      })
  }

  render() {
    const { allFinalData, value, isLoading, tab, uriNextPage, uriPrevPage, summaryData } = this.state;
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
                  summaryData={summaryData}
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

export default withRouter(App);
