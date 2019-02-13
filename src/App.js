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
      // pullRequests2: [],
      // allFinalData2: [],
      repoSelected : {
        //open: [],
        "OPENPullRequests": [],
        "OPENallFinalData": [],
        "MERGEDSize": "",
        "MERGED": [],
        "MERGEDPullRequests": [],
       "MERGEDallFinalData": [],
        "uriNextPageMERGED": "",
        "uriPrevPageMERGED": "",
        "DECLINEDSize": "",
        "DECLINED": [],
        DECLINEDPullRequests: [],
        DECLINEDallFinalData: [],
        uriNextPageDECLINED: "",
        uriPrevPageDECLINED: "",
      },
      // reposData: {
      //   aui: {
      //     open: [],
      //     openSize: "",
      //     merged: [],
      //     mergedSize: "",
      //     allDataMerged: [],
      //     declined: [],
      //     declinedSize: "",
      //     allDataDeclined: [],
      //     uriNextPage: '',
      //     uriPrevPage: '',

      //   },
      //   applicationlink: {
      //     open: [],
      //     openSize: "",
      //     merged: [],
      //     mergedSize: "",
      //     allDataMerged: [],
      //     declined: [],
      //     declinedSize: "",
      //     allDataDeclined: [],
      //     uriNextPage: '',
      //     uriPrevPage: '',
      //   },
      //   ekergy: {
      //     open: [],
      //     openSize: "",
      //     merged: [],
      //     mergedSize: "",
      //     allDataMerged: [],
      //     declined: [],
      //     declinedSize: "",
      //     allDataDeclined: [],
      //     uriNextPage: '',
      //     uriPrevPage: '',
      //   },
      //},
      value: "aui",
      tab: "OPEN",
      token: '',
      size: "",
      refresh_token: '',
      uriNextPage: '',
      uriPrevPage: '',
      //uriNextPage2: '',
      // uriPrevPage2: '',
      //allDataFromPagination: [],
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
    this.setState({
      tab: tab,
      isLoading: true
    })
    //this.getAlldatafromPagination()
    //this.getRepository1();
  }


  componentDidMount() {

    //this.getRepository1();

    this.getRepository(null, "OPEN");
    this.getRepository(null, "MERGED");
    this.getRepository(null, "DECLINED");

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

  // getAlldatafromPagination(){
  //   const {allDataFromPagination, uriNextPage2} = this.state
  //   console.log('this.state.uriNextPage',uriNextPage2)

  //necesito el array con todos los reviewers pero de todas las peticiones
  //allFinalData: prWithReviewers, en allFinalData estan todos los datos pero solo de 1 peticion
  //quiero un array con todos los allFinalData
  //   console.log('all date in the state expected',allDataFromPagination)
  // }


  componentDidUpdate(prevProps, prevState) {
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


    console.log('this state reposelected',this.state.repoSelected)
    if (this.state.repoSelected.uriNextPageMERGED !== "" &&
     this.state.repoSelected.uriNextPageMERGED !== prevState.repoSelected.uriNextPageMERGED &&
     ((this.state.repoSelected.MERGED.length - 1) * 50) < this.state.repoSelected.MERGEDSize){
      this.getRepository(this.state.repoSelected.uriNextPageMERGED,"MERGED")
      this.state.repoSelected.MERGED.push(this.state.repoSelected.MERGEDallFinalData)
    }

    console.log( 'this.state.repoSelected.MERGED', this.state.repoSelected.MERGED)
    if (this.state.repoSelected.uriNextPageDECLINED !== "" &&
    this.state.repoSelected.uriNextPageDECLINED !== prevState.repoSelected.uriNextPageDECLINED &&
    ((this.state.repoSelected.DECLINED.length - 1) * 50) < this.state.repoSelected.DECLINEDSize){
     this.getRepository(this.state.repoSelected.uriNextPageDECLINED,"DECLINED")
     this.state.repoSelected.DECLINED.push(this.state.repoSelected.DECLINEDallFinalData)
   }

   console.log( 'this.state.repoSelected.DECLINED', this.state.repoSelected.DECLINED)

    //este si
    // console.log('this state reposelected',this.state.repoSelected)
    // if (this.state.repoSelected.uriNextPageMERGED !== "" && this.state.repoSelected.uriNextPageMERGED !== prevState.repoSelected.uriNextPageMERGED) {
    //   this.getRepository(this.state.repoSelected.uriNextPageMERGED,"MERGED")
    //   this.state.repoSelected.MERGED.push(this.state.repoSelected.MERGEDallFinalData)
    // }
    // if (this.state.repoSelected.uriNextPageMERGED === "" && this.state.repoSelected.uriPrevPageMERGED !== "" &&
    //   (((this.state.repoSelected.MERGED.length - 1) * 50) < this.state.repoSelected.MERGEDSize)) {
    //     this.state.repoSelected.MERGED.push(this.state.repoSelected.MERGEDallFinalData)
    // }
    // console.log( 'this.state.repoSelected.MERGED', this.state.repoSelected.MERGED)

    //este no
    // if (this.state.uriNextPage2 !== "" && this.state.uriNextPage2 !== prevState.uriNextPage2) {
    //   this.getRepository1(this.state.uriNextPage2)
    //   this.state.allDataFromPagination.push(this.state.allFinalData2)
    // }
    // if (this.state.uriNextPage2 === "" && this.state.uriPrevPage2 !== "" &&
    //   (((this.state.allDataFromPagination.length - 1) * 50) < this.state.size)) {
    //   console.log('size', this.state.size)
    //   this.state.allDataFromPagination.push(this.state.allFinalData2)
    // }
    // console.log('this-state-alldatapagitnacion', this.state.allDataFromPagination)
    // if (this.state.refresh_token && this.state.refresh_token !== prevState.refresh_token) {
    // }
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

  // getRepository1(nextUri,status) {
  //   let repositoryName = this.state.value;
  //   const isPrivate = this.checkIfSelectedRepoIsPrivate();
  //   const headerAuthorization = "Bearer " + this.state.token;

  //   const prEndpoint = nextUri ||
  //     `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/?pagelen=50&state=DECLINED`;

  //   const privateEndPoint = nextUri ||
  //     `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/?state=MERGED`;

  //   fetch(
  //     isPrivate ? privateEndPoint : prEndpoint,
  //     isPrivate
  //       ? {
  //         headers: {
  //           Authorization: headerAuthorization
  //         }
  //       }
  //       : { headers: {} }
  //   )
  //     .then(response => {
  //       if (!response.ok) {
  //         throw response
  //       }
  //       return response.json()
  //     })
  //     .then(data => {
  //       console.log('data',data.values)
  //       if( data.next){
  //         nextUri = data.next;
  //       }else{
  //         nextUri = "";
  //       }

  //       const prevUri = data.previous;

  //       const onePullRequest = data.values.map(item => {
  //         return {
  //           id: item.id,
  //           uriReviewer: isPrivate
  //             ? `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/` + item.id + `/?pagelen=50&state=DECLINED`
  //             : `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/` + item.id + `/?pagelen=50&state=DECLINED`
  //         };
  //       });

  //       this.setState({
  //         pullRequests2: onePullRequest,
  //         uriNextPage2: nextUri,
  //         uriPrevPage2: prevUri,
  //         size: data.size
  //       });



  //       const urisForFetchReviewers = this.state.pullRequests2.map(pullrequest => {
  //         return pullrequest.uriReviewer;
  //       }
  //       );

  //       const prWithReviewers = [];
  //       urisForFetchReviewers.map(uri => {
  //         return (
  //           fetch(
  //             uri,
  //             isPrivate
  //               ? {
  //                 headers: {
  //                   Authorization: headerAuthorization
  //                 }
  //               }
  //               : { headers: {} }
  //           )
  //             .then(response => response.json())
  //             .then(dataWithReviewers => {
  //               prWithReviewers.push(dataWithReviewers);
  //               return this.setState({
  //                 allFinalData2: prWithReviewers,
  //                 isLoading: false
  //               })
  //             })
  //         )
  //       });
  //     })
  //     .catch(function (error) {
  //       if (error.status === 401) {
  //         this.getToken("true");
  //       }
  //     })
  // }

  getRepository(nextUri, status) {
    let repositoryName = this.state.value;
    const isPrivate = this.checkIfSelectedRepoIsPrivate();
    const headerAuthorization = "Bearer " + this.state.token;
    const selectedPullRequest = status+"PullRequests";
    const selectedNextPage = "uriNextPage"+status;
    const selectedPrevPage = "uriPrevPage"+status;
    const selectedSize  = status+"Size";
    const selectedallFinalData = status+"allFinalData"

    const prEndpoint = nextUri ||
      `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/?pagelen=50&state=${status}`;

    const privateEndPoint = nextUri ||
      `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/??pagelen=50&state=${status}`;

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
              ? `https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests/` + item.id + `/?pagelen=50&state=${status}`
              : `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/` + item.id + `/?pagelen=50&state=${status}`
          };
        });


        this.setState(prevState => ({
          pullRequests: onePullRequest,
          uriNextPage: nextUri,
          uriPrevPage: prevUri,
          repoSelected: {
            ...prevState.repoSelected,
        [selectedNextPage]: nextUri,
        [selectedPrevPage]: prevUri,
        [selectedPullRequest]: onePullRequest,
        [selectedSize]: size
          },
        }));




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
                return  this.setState(prevState => ({
                  //allFinalData: prWithReviewers,
                  //isLoading: false,
                  repoSelected: {
                    ...prevState.repoSelected,
                [selectedallFinalData] : prWithReviewers2,
                  },

                }))
              })
          )
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
                  isLoading: false,
                  //repoSelected: {
                    //...prevState.repoSelected,
                //selectedFinalData: prWithReviewers,
                 // },

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
                    getNextPullRequests={this.getNextPullRequests}
                    getPreviousPullRequests={this.getPreviousPullRequests}
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

export default App;
