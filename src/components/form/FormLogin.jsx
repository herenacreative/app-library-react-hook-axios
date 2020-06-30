import React, {Component, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, FormControl, FormControlLabel, Checkbox, Typography, Link, Grid} from '@material-ui/core';
import Input from '../inputs/Input'
import AuthHeader from '../Auth/AuthHeader'
import CopyRightAuth from '../Auth/CopyRightAuth'
import styles from './FormRegister.module.css';
import Buttons from '../inputs/Buttons'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
      size:{
        margin: theme.spacing(3, 0, 5, 0)
      },
      buttons: {
        '& > *': {
          margin: theme.spacing(5, 1, 0, 0)
        },
      }
}));


export default function FormLogin(props) {
  const classes = useStyles();

  const [userLogin, setUserLogin] = useState(
    {username: '', password: ''}
  );

  // const handleChange = (event) => {
  //   setUserLogin({...userLogin, [event.target.name]: event.target.value})
  //   console.log(userLogin, 'h')
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url:'http://localhost:8080/v1/auth/login',
      data: userLogin
    })
      .then(function (response) {
          console.log(response)
      })
      .catch(function (error) {
          console.log(error)
          console.log(error.response)
      }) 
  }

  return (
      <div>
        <div className={styles.sizeAll}>
          <AuthHeader title='Login' />
          <FormControl fullWidth >
          <form onSubmit={handleSubmit}>
            <div className={styles.size}>
              <Paper elevation={2}>
              user{userLogin.username} 
              pass{userLogin.password}
                <Input label='Username' value={userLogin.username} onChange={(e)=>setUserLogin({...userLogin, username: e.target.value})} type='text' />
                <Input label='Password' value={userLogin.password} onChange={(e)=>setUserLogin({...userLogin, password: e.target.value})} type='password'/>
              </Paper>
              <Grid container className={classes.buttons}>
                <Buttons value='Login' type='submit' variant='contained' color='default'/>
                <Buttons value='Register' variant='outlined'/>
              </Grid>
            </div>
          </form>
          </FormControl>
          <CopyRightAuth/>
        </div>
      </div>     
  );
}

