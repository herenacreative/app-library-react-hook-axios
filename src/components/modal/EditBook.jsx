import React, {useState, useEffect} from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {Button, 
  Dialog, 
  Typography, 
  IconButton, 
  FormControl, 
  InputLabel, 
  Select,
  Grid, 
  MenuItem,
  TextField} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {connect} from 'react-redux'
import Input from '../inputs/Input'
import {putBook, getBook, getBookId} from '../../redux/actions/book'
import {getAuthor} from '../../redux/actions/author'
import {getGenre} from '../../redux/actions/genre'

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

////////////////////////////// DIALOG ////////////////////////////
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
  ////////////////////////////// DIALOG ////////////////////////////

const EditBooks = (props) => {
  const [open, setOpen] = React.useState(false);
  const [Books, setBooks] = useState(
    {book_name: '', image: '', 
    description:'', status:'', 
    author_name: '', genre_name:''}
  );

  const handleClickOpen = () => {
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(Books)
    const token = props.auth.data.token
    const id = props.match.params.book_id
    props.getBookId(token, id)  
  }, [])


  useEffect(() => {
    const token = props.auth.data.token
    props.getAuthor(token)    
  }, [])

  useEffect(() => {
    const token = props.auth.data.token
    props.getGenre(token)    
  }, [])

  const history = useHistory();

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
    props.putBook(formData, token, id).then(() =>{
      props.getBook(token)
    })
    window.location.reload();
    history.push(`/home/${id}`)
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
          <DialogContent dividers>
            <Input label='Title' key={Books.book_id} value={Books.book_name} onChange={(id, val)=>setBooks({...Books, book_name: val})} type='text' />
            <TextField label='Url Image' onChange={(e)=>setBooks({...Books, image: e.target.files[0]})} type='file' />
           
            <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl style={{marginLeft: 12}}>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Books.genre_id}
                  onChange={(e)=>setBooks({...Books, genre_id: e.target.value})}
                  >
                    {props.genre.data.map((genre)=>(
                      <MenuItem value={genre.genre_id}>{genre.genre_name}</MenuItem>
                    ))}
                  </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12}>
                <FormControl style={{marginLeft: 12}}>
                  <InputLabel id="demo-simple-select-label">Author</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Books.author_id}
                      onChange={(e)=>setBooks({...Books, author_id: e.target.value})}
                    >
                      {props.author.data.map((author)=>(
                        <MenuItem value={author.author_id}>{author.author_name}</MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Input label='Description' value={Books.description} onChange={(id, val)=>setBooks({...Books, description: val})} type='text' />
            <Input label='Status' id='status' value={Books.status} onChange={(id, val)=>setBooks({...Books, status: val})} type='text' />
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
  book: state.book,
  author: state.author,
  genre: state.genre
})

const mapDispatchToProps = {putBook, getBook, getBookId, getAuthor, getGenre}
export default connect(mapStateToProps, mapDispatchToProps)(EditBooks)