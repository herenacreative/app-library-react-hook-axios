import React, {useState} from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {Button, Dialog, Typography, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../inputs/Input'
import Buttons from '../inputs/Buttons'
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import axios from 'axios'

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
});

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

export default function AddBooks() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [AddBook, setAddBook] = useState(
    {book_name: '', image: '', description:''}
  );

  const handleSubmit = (e) => {
    console.log(AddBook)
    e.preventDefault()
    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.set('book_name', this.state.book_name)
    formData.append('image', this.state.image)
    formData.set('description', this.state.description)

    axios({
      method: 'POST',
      url:'http://localhost:8080/v1/books',
      data: formData,
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
          console.log(response)
          localStorage.setItem('token', response.data.data[0].token)
          localStorage.setItem('refreshToken', response.data.data[0].refreshToken)
      })
    .catch(function (error) {
        console.log(error)
        console.log(error.response)
    }) 
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Borrow
      </Button>
      <form onSubmit={handleSubmit}>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Data
        </DialogTitle>
        <DialogContent dividers>
        <Input label='Title Book' id='title' value={AddBook.book_name} onChange={(id, val)=>setAddBook({...AddBook, book_name: val})} type='text' />
        <Input label='Name' type='text' />
        <Input type='date' />
        
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="outlined" color="primary"> Borrow </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}
