import React, { Component } from "react";
import PropTypes from 'prop-types';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';

const themeSlider = createMuiTheme({
  palette: {
    primary: {
    main: '#53abe1',
    contrastText: '#fff',
    },
  secondary: {
    main: '#333333',
    contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
    'Roboto',
    'sans-serif'].join(','),
    fontSize: 16
    }
});
const styles = theme => ({
  root: {
    flexGrow: 1
  }, 
  title:{
    textAlign: "center"
  }
});


class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      arrayRepos: [
        {"name":"atlassian-aws-deployment",
          "url":"https://bitbucket.org/atlassian/atlassian-aws-deployment/pull-requests"},
        {"name":"atlaskit-mk-2",
          "url":"https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests"},
        {"name":"atlassian-johnson",
          "url":"https://bitbucket.org/atlassian/atlassian-johnson/pull-requests"},
        {"name":"almond-intellij-plugin",
          "url":"https://bitbucket.org/atlassian/almond-intellij-plugin/pull-requests"},

      ]
    }
  };

  render() {
    const {classes} = this.props;
      return (
        <React.Fragment>
          <CssBaseline>
            <MuiThemeProvider theme={themeSlider}>
              <Grid container className={classes.root} justify="center" alignItems="center" spacing={16}>
                <Grid item xs={12}>
                  {/* <Typography variant="h1" color="primary" className={classes.title}>
                    
                  </Typography> */}
                </Grid>
                <Grid item xs={12}>
                 
                    <ul>
                      {this.state.arrayRepos.map((item,index) =>{
                        return(
                          <li key={index}>
                            {item.url}
                  
                          </li>
                      )})}
                    </ul> 
   
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </CssBaseline>
        </React.Fragment>
      
      );
    }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Slider);
