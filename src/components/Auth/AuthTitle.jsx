import React, {Component} from 'react';
import styles from './AuthTitle.module.css';
import {Paper, Typography} from '@material-ui/core';

class AuthTitle extends Component{
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
        </Paper>
      </div>
    );
  }  
}

export default AuthTitle;