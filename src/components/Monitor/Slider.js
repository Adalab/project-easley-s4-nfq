import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchRepos } from "../../Services/RepoServices";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Loading from "./Loading";
import PullReqList from "./PullReqList";
import Header from "./Header";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  animation: {}
});

class Slider extends Component {
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
    const { classes } = this.props;
    const { results, dataSize } = this.state;

    if (results) {
      return (
          <Grid container className={classes.animation}>
            <Header results={results} dataSize={dataSize} />
            <PullReqList results={results} />
          </Grid>
      );
    } else {
      return <Loading />;
    }
  }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Slider);