import React, {Component} from 'react';
import styles from './AuthHeader.module.css';
import {Paper, Typography} from '@material-ui/core';

class AuthHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      title: this.props.title
    }
  }
  render(){
    return (
      <div className={styles.paper}>
        <Paper elevation={0}>
          <p className={styles.titles}> {this.state.title} </p>
          <div className={styles.typography} >
            <Typography variant="subtitle2" gutterBottom>
              Welcome Back, Please {this.state.title}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              to your account
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }  
}

export default AuthHeader;