import React, {useState, Component} from 'react';
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

export default function FormRegister() {
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();
  
  const [userSignUp, setUserSignUp] = useState(
      { username: '', password: '', fullname: '', email: ''}
  );

  const handleChange = (event) => {
      setUserSignUp({...userSignUp, [event.target.name]: event.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:8080/v1/auth/register', userSignUp)
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
          <AuthHeader title='Register' />
          <FormControl fullWidth>
            <form onSubmit={handleSubmit}> 
              <div className={styles.size}>
                <Paper elevation={2}>
                  <Input label='Username' id='user' value={userSignUp.username} onChange={(e)=>setUserSignUp({...userSignUp, username: e.target.value})} type='text' required />
                  <Input label='Full Name'  value={userSignUp.fullname} onChange={(e)=>setUserSignUp({...userSignUp, username: e.target.value})}  type='text'/>
                  <Input label='Email'  value={userSignUp.email} onChange={(e)=>setUserSignUp({...userSignUp, username: e.target.value})}  type='text'/>
                  <Input label='Password'  value={userSignUp.password} onChange={(e)=>setUserSignUp({...userSignUp, password: e.target.value})} type='password'/>
                </Paper>
                <Grid container className={classes.buttons}>
                  <Buttons value='Register' variant='contained' color='default' type="submit"/>
                  <Buttons value='Login' variant='outlined' />
                </Grid>
              </div>
            </form>
          </FormControl>
          <CopyRightAuth/>
        </div>
      </div>     
  );
}

