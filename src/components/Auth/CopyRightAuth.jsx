import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Typography} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(35),
      height: theme.spacing(20),
    },
  },
  typography: {
    width: '100%',
    maxWidth: 500,
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

export default function Logins() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Paper elevation={0}>
      <div className={classes.typography}>
        <Typography variant="subtitle2" gutterBottom>
            By signing up, you agree to Books's
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
            Terms and Conditions & Privacy Police
        </Typography>
        </div>
      </Paper>
    </div>
  );
}