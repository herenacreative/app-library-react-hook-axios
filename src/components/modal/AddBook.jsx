import React, {useState, useEffect} from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {Button, 
  Dialog, 
  Typography, 
  TextField, 
  Grid, 
  IconButton, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../inputs/Input'
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import { postBook, getBook } from "../../redux/actions/book"
import { getAuthor } from "../../redux/actions/author"
import { getGenre} from "../../redux/actions/genre"
import Swal from 'sweetalert2'

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

///////////////////dialog////////////////////////
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

///////////////////dialog////////////////////////

const AddBooks = (props) => {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [AddBook, setAddBook] = useState(
    {book_name: '', image: '', description:'', status:'', genre_id:'', author_id:'', stock:''}
  );

  useEffect(() => {
    const token = props.auth.data.token
    props.getAuthor(token)  
  }, [])

  // useEffect(() => {
  //   const token = props.auth.data.token
  //   props.getGenre(token)    
  // }, [])

  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault()

    Swal.fire({
      icon: 'success',
      title: 'Created Book Success',
      timer: 1500
    })
    const token = props.auth.data.token
    const formData = new FormData();
    formData.append('book_name', AddBook.book_name)
    formData.append('image', AddBook.image)
    formData.append('genre_id', AddBook.genre_id)
    formData.append('author_id', AddBook.author_id)
    formData.append('description', AddBook.description)
    formData.append('status', AddBook.status)
    formData.append('stock', AddBook.stock)
    props.postBook(formData, token).then(()=>{
      props.getBook(token)
    })
    window.location.reload();
    history.push("/book")
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
            <Input label='Title'
              value={AddBook.book_name} 
              onChange={(id, val)=>setAddBook({...AddBook, book_name: val})} 
              type='text' 
            />
            <TextField style={{marginLeft: 10}} 
              label='Url Image' 
              onChange={(e)=>setAddBook({...AddBook, image: e.target.files[0]})} 
              type='file'
             />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl style={{marginLeft: 10, marginTop: 15}}>
                  <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={AddBook.genre_id}
                    onChange={(e)=>setAddBook({...AddBook, genre_id: e.target.value})}
                    >
                      {props.genre.data.map((Genre)=>(
                        <MenuItem value={Genre.genre_id}>{Genre.genre_name}</MenuItem>
                      ))}
                   </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl style={{marginLeft: 10}}>
                  <InputLabel id="demo-simple-select-label">Author</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={AddBook.author_id}
                    onChange={(e)=>setAddBook({...AddBook, author_id: e.target.value})}
                    >
                      {props.author.data.map((Author)=>(
                        <MenuItem value={Author.author_id}>{Author.author_name}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Input label='Description' 
              value={AddBook.description} 
              onChange={(id, val)=>setAddBook({...AddBook, description: val})} 
              type='text' 
            />
            <Input label='Status' 
              value={AddBook.status} 
              onChange={(id, val)=>setAddBook({...AddBook, status: val})} 
              type='text' 
            />
            <Input label='Stock' 
              value={AddBook.stock} 
              onChange={(id, val)=>setAddBook({...AddBook, stock: val})} 
              type='number' 
            />
          </DialogContent>
          <DialogActions>
            <Button type='submit' variant='contained' color='default'>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) =>({
  auth: state.auth,
  author: state.author,
  genre: state.genre
})

const mapDispatchToProps = {postBook, getBook, getAuthor, getGenre}

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks)