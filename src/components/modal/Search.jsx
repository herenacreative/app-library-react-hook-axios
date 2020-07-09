import React, {useEffect, useState} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import {InputBase, Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from 'react-redux'
import axios from 'axios'
import BookCards from '../card/BookCard'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 0, 0, 0),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect((PageNumber) => {
    setLoading(true)
    const token = props.auth.data.token
    // let search = qs.parse(props.history.location)
    axios({
      method: 'GET',
      url: `http://localhost:8080/v1/books?page=${PageNumber}`,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setBooks(
        res.data.data.results
      )
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      console.log(err.res)
    })    
  }, [])

  if (loading){
      return <p>Loading Book...</p>
  }

  const filbooks = books.filter(book =>{
    return book.book_name.toLowerCase().includes(search.toLocaleLowerCase())
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="default" onClick={handleClickOpen}>
        Search
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div variant="h6" className={classes.title}>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                onChange={(e)=>setSearch( e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
          </div>
            </div>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
                <BookCards/>
        </List>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) =>({
    auth: state.auth
  })
  export default connect(mapStateToProps)(Search)
  