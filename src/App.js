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
      value:'aui',
      token: '',
      availablesRepos:[
        {'name' : 'aui',
        'isPrivate' : false},
        {'name' : 'application-links',
        'isPrivate' : false},
        {'name' : 'ekergy',
        'isPrivate' : true}]
      };
    this.changeRepository = this.changeRepository.bind(this);
  }

  getToken() {

  // const getPRfromPrivateRepositoryUri = "https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests";

  const body = "grant_type=client_credentials"
  const bt = btoa("TUTYrqhpFN5Tg29dpe:XGJgEeD7j8bdGJyDYLfT3VmU9RN3ZxQw")
  const auth = `Basic ${bt}`

  fetch(`https://bitbucket.org/site/oauth2/access_token`, {
      "method": 'POST',
      "body": body,
      "headers": {
          "Authorization": auth,
          "Content-Type": 'application/x-www-form-urlencoded'
      }
  })
      .then(response => response.json())
      .then(data => {
          const token = data.access_token
          const refresh = data.refresh_token
          this.setState({
            token: token
          })
          // const headerAuthorization = "Bearer " + this.state.token;
          // return fetch(getPRfromPrivateRepositoryUri, {
          //     "headers": {
          //         Authorization: headerAuthorization
          //     }
          // }).then(response => response.json())
      })
    }

  checkIfSelectedRepoIsPrivate(){
    const {availablesRepos, value} = this.state;
    const selectedRepo = availablesRepos.find(repo => {
      return repo.name === value
    })
  console.log(selectedRepo.isPrivate);
  return selectedRepo.isPrivate;
  }

  changeRepository(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.getRepository();
    this.getToken();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {

      this.getRepository();
    }

    if(this.state.token && this.state.token !== prevState.token  ) {
    }
  }

  getRepository() {
    let repositoryId = "";
    let repositoryName = this.state.value;
    const isPrivate = true // this.checkIfSelectedRepoIsPrivate();
    const headerAuthorization = "Bearer " + this.state.token;

    const prEndpoint = `https://api.bitbucket.org/2.0/repositories/atlassian/${repositoryName}/pullrequests/${repositoryId}`;
    const privateEndPoint = "https://api.bitbucket.org/2.0/repositories/ekergy/adalab-easley/pullrequests";

    fetch(privateEndPoint, isPrivate? {
      "headers": {
          Authorization: headerAuthorization
      }
  }:{"headers": {}})
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

        // const uriReviewer = this.state.pullRequests[0].uriReviewer;

        // fetch(uriReviewer)
        //   .then(response => response.json())
        //   .then(data => {
        //     const pullRequestReviewer = data.reviewers.map(item => {
        //       return {
        //         reviewer_name: item.display_name,
        //         reviewer_avatar: item.links.avatar.href
        //       };
        //     });
        //     this.setState({
        //       reviewers: pullRequestReviewer
        //     });
          // });
      });
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
