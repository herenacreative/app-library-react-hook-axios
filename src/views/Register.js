import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, CssBaseline, Grid} from '@material-ui/core';
import LayoutAuthImage from '../components/Auth/LayoutAuthImage';
import FormRegister from '../components/form/FormRegister';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        position: 'initial',
        margin: theme.spacing(0)
      }
}));

export default function Register() {
  const classes = useStyles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <LayoutAuthImage/>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <FormRegister/>
        </Grid>
      </Grid>
    </div>
  );
}