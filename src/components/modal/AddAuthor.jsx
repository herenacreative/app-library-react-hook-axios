import React, {useState} from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {Button, Dialog, Typography, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../inputs/Input'
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import axios from 'axios'
import {connect} from 'react-redux'
import { useHistory, Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

//dialog
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

//dialog 

const AddAuthors = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [AddAuthor, setAddAuthor] = useState({author_name: ''});

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = props.auth.data.token
    axios({
      method: 'POST',
      url:'http://localhost:3000/library/v1/authors',
      data: AddAuthor,
      headers: {
        Authorization: token
      }
    })
    .then(function (response) {
        console.log(response)
        localStorage.setItem('token', response.data.data[0].token)
        localStorage.setItem('refreshToken', response.data.data[0].refreshToken)
      })
    .catch(function (error) {
        console.log(error)
    }) 
  }

  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
    history.push("/author")
  }

  return (
    <div>
      <Button variant="outlined" color="default" onClick={handleClickOpen}>
        Add Author
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Author
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Input label='Title' 
              value={AddAuthor.author_name} 
              onChange={(id, val)=>setAddAuthor({...AddAuthor, author_name: val})}
              type='text'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={refreshPage} type='submit' variant='contained' color='default'>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(AddAuthors)