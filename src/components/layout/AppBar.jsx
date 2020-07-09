import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, InputBase} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import Menu from '../inputs/Dropdown'
import Drawer from '../layout/Drawer'
import AddBooks from '../modal/AddBook'
import AddAuthors from '../modal/AddAuthors'
import AddGenres from '../modal/AddGenres';
import Searching from '../modal/Search'
import axios from 'axios'
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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

const SearchApp = (props) => {
  const classes = useStyles();
  const [books, setBooks] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const token = props.auth.data.token
    // let params = props.history.location.search
    axios({
      method: 'GET',
      url: `http://localhost:8080/v1/books`,
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

  // handleSearch = (e) =>{
  //   setBooks({
  //     book_name: e.target.value
  //   })
  // }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Drawer/>
          <Typography className={classes.title} variant="h6" noWrap>
            Library
          </Typography>
          {/* <Menu names='All Categories'/>
          <Menu names='All Time'/> */}
          {/* <Searching/> */}
          <AddBooks/>
          <AddAuthors/>
          <AddGenres/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
            value={books.book_name}
            onChange={(e)=>setBooks({book_name: e.target.value})}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(SearchApp)
