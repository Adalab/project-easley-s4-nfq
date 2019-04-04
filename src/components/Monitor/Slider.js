import React, { Component } from "react";
import PropTypes from 'prop-types';
import {fetchRepos} from '../../Services/RepoServices';


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    flexGrow: 1,
    height: "100vh"
  }, 
  title: {
    textAlign: "center"
  },
  card: {
    height: "100px",
    margin: "10px",
    backgroundColor: "lightGreen",
    border: "1px solid black"
    
  },
  avatar: {
    margin: "10px",
    width: "60px",
    height: "60px",
  },
  content: {
    display: "flex",
    flexDirection: "row"
  }
});

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
    };
     this.getPullRequest = this.getPullRequest.bind(this);
  };

  componentDidMount(){
  this.getPullRequest()
  };

  getPullRequest(){
    fetchRepos().then(data => {
      console.log(data);
      console.log(data.values);
      this.setState({
        results: data.values
      })
    })
  }

  render() {
    const {classes} = this.props;
    const {results} = this.state;

    if(results){
      return (
        <React.Fragment>
          <CssBaseline>
            <MuiThemeProvider theme={themeSlider}>
              <Grid container className={classes.root} justify="center" alignItems="center" spacing={16}>
                {/* <Grid item xs={12}>
                  <Typography variant="h2" color="primary" className={classes.title}>
                    {results.source.repository.name}
                  </Typography>
                </Grid> */}
                {results.map(item =>{
                  return(
                  <Grid item xs={12}>
                    <Card className={classes.card}>
                      <CardContent className={classes.content}>
                        <Grid item xs={1}>
                          <Avatar alt="Remy Sharp" src={item.author.links.avatar.href} className={classes.avatar}/>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subtitle2">
                            {item.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subtitle2">
                            {item.author.username}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subtitle2">
                            {item.destination.branch.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subtitle2">
                            Comentarios: {item.comment_count}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subtitle2">
                            {item.created_on}
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  )
                })}
                
              </Grid>
            </MuiThemeProvider>
          </CssBaseline>
        </React.Fragment>
   
      );}
      else {
        return(
        <div><CircularProgress className={classes.progress} color="secondary"/></div>
        )}
    }
}

Slider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles (styles)(Slider);
