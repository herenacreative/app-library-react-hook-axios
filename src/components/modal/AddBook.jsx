import React, {useState, useEffect} from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {Button, Dialog, Typography, TextField, Grid, IconButton, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../inputs/Input'
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import axios from 'axios'
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import { useHistory, Link } from "react-router-dom";
import { postBook, getBook } from "../../redux/actions/book"
import { getAuthor } from "../../redux/actions/author"
import { getGenre} from "../../redux/actions/genre"
// import book from '../card/book';
// import Buttons from '../inputs/Buttons'

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

const AddBooks = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [AddBook, setAddBook] = useState(
    {book_name: '', image: '', description:'', status:'', genre_id:'', author_id:''}
  );
  const [Authors, setAuthors] =useState([])

  const [Genres, setGenres] =useState([])

  useEffect(() => {
    console.log(props.getAuthor, 'get')
    const token = props.auth.data.token
    props.getAuthor(token)
    // axios({
    //   method: 'GET',
    //   url: 'http://localhost:8080/v1/authors?page=1&limit=100',
    //   headers: {
    //     Authorization: token
    //   }
    // })
    // .then((res)=>{
    //   console.log(res)
    //   setAuthors(
    //     res.data.data.results
    //   )
    // })
    // .catch((err)=>{
    //   console.log(err)
    //   console.log(err.res)
    // })    
  }, [])

  useEffect(() => {
    console.log(AddBook.genre_name)
    const token = props.auth.data.token
    props.getGenre(token)
    // axios({
    //   method: 'GET',
    //   url: 'http://localhost:8080/v1/genres?page=1&limit=100',
    //   headers: {
    //     Authorization: token
    //   }
    // })
    // .then((res)=>{
    //   console.log(res)
    //   setGenres(
    //     res.data.data.results
    //   )
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })    
  }, [])

  const history = useHistory();

  function refreshPage() {
    window.location.reload();
    history.push("/home")
  }
  
  // console.log(AddBook, 'k')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(AddBook.image, 'k')
    // console.log(props.auth.data.token, 'token')
    const token = props.auth.data.token
    
    const formData = new FormData();
    formData.append('book_name', AddBook.book_name)
    formData.append('image', AddBook.image)
    formData.append('genre_id', AddBook.genre_id)
    formData.append('author_id', AddBook.author_id)
    formData.append('description', AddBook.description)
    formData.append('status', AddBook.status)
    props.postBook(formData, token).then(()=>{
      props.getBook(token)
    })
    window.location.reload();
    history.push("/home")

    // axios({
    //   method: 'POST',
    //   url:'http://localhost:8080/v1/books',
    //   data: formData,
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then(function (response) {
    //       console.log(response)
    //       localStorage.setItem('token', response.data.data[0].token)
    //       localStorage.setItem('refreshToken', response.data.data[0].refreshToken)
    //   })
    // .catch(function (error) {
    //     console.log(error)
    //     console.log(error.response)
    // }) 
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
            <TextField style={{marginLeft: 10}} label='Url Image' onChange={(e)=>setAddBook({...AddBook, image: e.target.files[0]})} type='file' />
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

            <Input label='Description' id='desc' value={AddBook.description} onChange={(id, val)=>setAddBook({...AddBook, description: val})} type='text' />
            <Input label='Status' id='status' value={AddBook.status} onChange={(id, val)=>setAddBook({...AddBook, status: val})} type='text' />
          
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