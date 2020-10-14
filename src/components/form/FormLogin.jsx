import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, FormControl, Grid} from '@material-ui/core';
import Input from '../inputs/Input'
import AuthHeader from '../Auth/AuthHeader'
import CopyRightAuth from '../Auth/CopyRightAuth'
import styles from './FormRegister.module.css';
import Buttons from '../inputs/Buttons'
import { useHistory, Link } from "react-router-dom";
import {connect} from 'react-redux'
import {login} from '../../redux/actions/auth'
import Swal from 'sweetalert2'

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

const FormLogin = (props) => {
  
  const classes = useStyles();

  const [userLogin, setUserLogin] = useState(
    {username: '', password: ''}
  );

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault() 
    // console.log(userLogin)  
    props.login(userLogin).then(() => {
      // history.push("/home")
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        timer:1500
      }).then((result) => {
        if(result)
        history.push("/home")
      })
    })
    // axios({
    //   method: 'POST',
    //   url:'http://localhost:3000/library/v1/auth/login',
    //   data: userLogin
    // })
    // .then(function (response) {
    //       console.log(response)
    //       localStorage.setItem('token', response.data.data[0].token)
    //       localStorage.setItem('refreshToken', response.data.data[0].refreshToken)
    //       history.push("/books")
    //   })
    // .then(() => {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Login Success',
    //     timer:1500
    //   }).then((result) => {
    //     if(result)
    //     history.push("/home")
    //   })
    // })
    .catch(function (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: 'username or password no valid',
          timer: 1500
        })
    }) 
  }
  // console.log(props.auth)
  // console.log(this.state.username)
  return (
      <div>
        <div className={styles.sizeAll}>
          <AuthHeader title='Login' />
          <FormControl fullWidth >
          <form onSubmit={handleSubmit}>
            <div className={styles.size}>
              <Paper elevation={2}>
                <Input label='Username' id='username' value={userLogin.username} onChange={(id, val)=>setUserLogin({...userLogin, username: val})} type='text' />
                <Input label='Password' id='password' value={userLogin.password} onChange={(id, val)=>setUserLogin({...userLogin, password: val})} type='password'/>
              </Paper>
              <Grid container className={classes.buttons}>
                <Buttons value='Login' type='submit' variant='contained' color='default'/>
                <Link to={`/auth/register`}><Buttons value='Register' variant='outlined'/></Link>
              </Grid>
            </div>
          </form>
          </FormControl>
          <CopyRightAuth/>
        </div>
      </div>     
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {login}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)