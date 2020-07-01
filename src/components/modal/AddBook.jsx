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

export default function AddBooks(props) {
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
  console.log(AddBook, 'k')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(AddBook, 'k')

    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append('book_name', AddBook.book_name)
    formData.append('image', AddBook.image[0])
    formData.append('description', AddBook.description)

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
     
      <Button variant="outlined" color="default" onClick={handleClickOpen}>
        Add Book
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Data
        </DialogTitle>
        <form onSubmit={handleSubmit}>

        <DialogContent dividers>
        <Input label='Title' id='title' value={AddBook.book_name} onChange={(id, val)=>setAddBook({...AddBook, book_name: val})} type='text' />
        <Input label='Url Image' id='img' value={AddBook.image} onChange={(id, val)=>setAddBook({...AddBook, image: val})} type='file' />
        <Input label='Description' id='desc' value={AddBook.description} onChange={(id, val)=>setAddBook({...AddBook, description: val})} type='text' />
        
        </DialogContent>
        <DialogActions>
        <Buttons onClose={handleClose} value='Save' type='submit' variant='contained' color='default'/>
        </DialogActions>
        </form>
      </Dialog>
     
    </div>
  );
}
