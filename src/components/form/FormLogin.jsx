import React, {Component, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, FormControl, FormControlLabel, Checkbox, Typography, Link, Grid} from '@material-ui/core';
import Input from '../inputs/Input'
import AuthHeader from '../Auth/AuthHeader'
import CopyRightAuth from '../Auth/CopyRightAuth'
import styles from './FormRegister.module.css';
import Buttons from '../inputs/Buttons'
import axios from 'axios'
import { useHistory } from "react-router-dom";

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

  const history = useHistory();
  // const handleChange = (event) => {
  //   setUserLogin({...userLogin, [event.target.name]: event.target.value})
  //   console.log(userLogin, 'h')
  // }

  // signInFunction({params}, (err, res) => {
  //   // Now in the sign in callback
  //   if (err)
  //     alert("Please try again")
  //   else {
  //     const location = this.props.location
  //     if (location.state && location.state.nextPathname) {
  //       browserHistory.push(location.state.nextPathname)
  //     } else {
  //       browserHistory.push('/')
  //     }
  //   }
  // })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url:'http://localhost:8080/v1/auth/login',
      data: userLogin
    })
      // .then(function (response) {
      //     console.log(response)
      // })
      .then(function (response) {
            console.log(response)
            history.push("/")

            localStorage.setItem('token', response.data.data[0].token)
            localStorage.setItem('refreshToken', response.data.data[0].refreshToken)
        })
        // .then(data => {
        //     if(data.status == 200){
        //         this.props.history.push("/");
        //         console.log('Successfully Login');
        //   }
        // })
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
              {/* user{userLogin.username} 
              pass{userLogin.password} */}
                {/* <Input label='Username' value={userLogin.username} onChange={(e)=>setUserLogin({...userLogin, username: e.target.value})} type='text' />
                <Input label='Password' value={userLogin.password} onChange={(e)=>setUserLogin({...userLogin, password: e.target.value})} type='password'/> */}
              <Input label='Username' id='username' value={userLogin.username} onChange={(id, val)=>setUserLogin({...userLogin, username: val})} type='text' />
                <Input label='Password' id='password' value={userLogin.password} onChange={(id, val)=>setUserLogin({...userLogin, password: val})} type='password'/>
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

