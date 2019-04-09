import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchRepos } from "../../Services/RepoServices";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";

import Loading from "./Loading";
import PullReqList from "./PullReqList";
import Header from "./Header";


const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
});

const themeApp = createMuiTheme({
  palette: {
    primary: {
      main: '#29b6f6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#333',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'Nunito Sans', 
      'sans-serif',
    ].join(','),
    fontSize: 16
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      dataSize: "",
      red: "",
      repoNames: [
        "atlassian-aws-deployment",
        "atlassian-azure-deployment",
        "atlasboard-atlassian-package"
      ]
    };
    this.getPullRequest = this.getPullRequest.bind(this);
  }

  componentDidMount() {
    this.getPullRequest();
  }

  getPullRequest() {
    let counter = 0;

    const showRepo = () => {
      if (counter > this.state.repoNames.length - 1) {
        counter = 0;
      }

      let repoName = this.state.repoNames[counter];

      fetchRepos(repoName).then(data => {
        let size = data.size;
        this.setState({
          dataSize: size
        });
        let apiResults = data.values.map(item => fetch(item.links.self.href));
        Promise.all(apiResults).then(url => {
          const responseUrl = url.map(response => response.json());
          Promise.all(responseUrl).then(urlId => {
            this.setState({
              results: urlId
            });
            counter++;
          });
        });
      });
    };
    showRepo();
    setInterval(showRepo, 5000);
  }

  render() {

    const { results, dataSize } = this.state;

    if (results) {
      return (
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={themeApp}>
            <header>
              <Header results={results} dataSize={dataSize} />
            </header>
            <main>
              <PullReqList results={results} />
            </main>
          </MuiThemeProvider>
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
