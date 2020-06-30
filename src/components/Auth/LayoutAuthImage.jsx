import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AuthTitle from './AuthTitle';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import Logins from '../components/form/Logins'
// import HeaderAuth from '../components/layout/HeaderAuth'
// import CopyRightAuth from '../components/layout/CopyRightAuth'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
      image: {
        backgroundImage: 'url(https://images.unsplash.com/flagged/photo-1557699331-4ffdad25140e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'theme.palette.type === light ? theme.palette.grey[50] : theme.palette.grey[900]',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'100%',
       marginTop: theme.spacing(0),
      //  position: 'relative'
      },
      text:{
        padding: theme.spacing(1),
        left:' 56px',
        top: '88px',

        fontFamily: 'Airbnb Cereal App',
        fontSize: '64px',

        color: '#F9F9F9'
      }
}));

export default function LayoutAuth() {
  const classes = useStyles();

  return (
      <>
    <div className={classes.image}>
    {/* <p className={classes.text}>Book is a window 
to the world
</p> */}
    </div>
    
     
</>
  );
}