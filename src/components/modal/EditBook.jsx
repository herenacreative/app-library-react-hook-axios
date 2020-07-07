import React, {useState, useEffect} from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {Button, Dialog, Typography, IconButton, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Input from '../inputs/Input'
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import axios from 'axios'
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import {TextField} from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
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

const EditBooks = (props) => {
  const [open, setOpen] = React.useState(false);
  const [Books, setBooks] = useState(
    {book_name: '', image: '', description:'', status:'', author_name: '', genre_name:''}
  );
  const handleClickOpen = () => {
    console.log(props.bookDetail)
    setBooks({
      ...Books,
      book_name: props.bookDetail.book_name,
      author_name: props.bookDetail.author_name,
      book_id:  props.bookDetail.book_id ,
      description: props.bookDetail.description ,
      genre_name: props.bookDetail.genre_name,
      image: props.bookDetail.image,
      status: props.bookDetail.status
    })
    setOpen(true);
    console.log(Books)
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(Books)
    const token = props.auth.data.token
    const id = props.match.params.book_id
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/books/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      setBooks({
        Books: res.data.data[0]
      })
    })
    .catch((err)=>{
      console.log(err.res)
    })    
  }, [])

  const [Authors, setAuthors] =useState([])

  const [Genres, setGenres] =useState([])

  useEffect(() => {
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/authors?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setAuthors(
        res.data.data.results
      )
    })
    .catch((err)=>{
      console.log(err.res)
    })    
  }, [])

  useEffect(() => {
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/genres?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setGenres(
        res.data.data.results
      )
    })
    .catch((err)=>{
      console.log(err.res)
    })    
  }, [])

  
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
    history.push(`/home/${Books.book_id}`)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const token = props.auth.data.token
    const id = props.match.params.book_id
    const formData = new FormData();
    formData.append('book_name', Books.book_name)
    formData.append('image', Books.image)
    formData.append('genre_id', Books.genre_id)
    formData.append('author_id', Books.author_id)
    formData.append('description', Books.description)
    formData.append('status', Books.status)

    axios({
      method: 'PUT',
      url:'http://localhost:8080/v1/books/' + id,
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
    }) 
  }

  return (
    <div>
      <Button variant="outlined" color="default" onClick={handleClickOpen}>
        Edit Book
      </Button>
     
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Data
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          
         {/* //modal */}
          <DialogContent dividers>
            <Input label='Title' key={Books.book_id} value={Books.book_name} onChange={(id, val)=>setBooks({...Books, book_name: val})} type='text' />
            <TextField label='Url Image' onChange={(e)=>setBooks({...Books, image: e.target.files[0]})} type='file' />
           
            <Input label='Description' value={Books.description} onChange={(id, val)=>setBooks({...Books, description: val})} type='text' />
            <Input label='Status' id='status' value={Books.status} onChange={(id, val)=>setBooks({...Books, status: val})} type='text' />
            <FormControl style={{marginLeft: 12}}>
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Books.genre_id}
                onChange={(e)=>setBooks({...Books, genre_id: e.target.value})}
                >
                  {Genres.map((genre)=>(
                    <MenuItem value={genre.genre_id}>{genre.genre_name}</MenuItem>
                  ))}
                </Select>
            </FormControl>

            <FormControl style={{marginLeft: 12}}>
              <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Books.author_id}
                onChange={(e)=>setBooks({...Books, author_id: e.target.value})}
                >
                  {Authors.map((author)=>(
                    <MenuItem value={author.author_id}>{author.author_name}</MenuItem>
                  ))}
                </Select>
            </FormControl>
         

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
export default connect(mapStateToProps)(EditBooks)