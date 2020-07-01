import React, {Component, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, FormControl, FormControlLabel, Checkbox, Typography, Grid} from '@material-ui/core';
import Input from '../inputs/Input'
import AuthHeader from '../Auth/AuthHeader'
import CopyRightAuth from '../Auth/CopyRightAuth'
import styles from './FormRegister.module.css';
import Buttons from '../inputs/Buttons'
import axios from 'axios'
import { Link } from 'react-router-dom';

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


export default function FormRegister(props) {
  const classes = useStyles();

  const [userRegister, setUserRegister] = useState(
    {username: '', fullname: '', email:'', password: ''}
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userRegister)
   
    axios({
      method: 'POST',
      url:'http://localhost:8080/v1/auth/register',
      data: userRegister
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
          <AuthHeader title='Register' />
          <FormControl fullWidth >
          <form onSubmit={handleSubmit}>
            <div className={styles.size}>
              <Paper elevation={2}>
              <Input label='Username' id='username' value={userRegister.username} onChange={(id, val)=>setUserRegister({...userRegister, username: val})} type='text' />

              <Input label='Full Name' id='fullname' value={userRegister.fullname} onChange={(id, val)=>setUserRegister({...userRegister, fullname: val})} type='text' />
              <Input label='Email' id='email' value={userRegister.email} onChange={(id, val)=>setUserRegister({...userRegister, email: val})} type='text' />
              
              <Input label='Password' id='password' value={userRegister.password} onChange={(id, val)=>setUserRegister({...userRegister, password: val})} type='password'/>
              </Paper>
              <Grid container className={classes.buttons}>
                <Buttons value='Register' type='submit' variant='contained' color='default'/>
                <Link to={`/auth/login`}><Buttons value='Login' variant='outlined'/></Link>
              </Grid>
            </div>
          </form>
          </FormControl>
          <CopyRightAuth/>
        </div>
      </div>     
  );
}

