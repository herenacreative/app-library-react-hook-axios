import React, {useState, useEffect, Component} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {Button, TextField, Typography, Box} from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Input from '../inputs/Input'
import axios from 'axios'
import {connect} from 'react-redux'

const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
});



const EditBooks = (props) => {
    // getDetailBooks = () =>{
    //     // const token = localStorage.getItem('token')
        
    // }

    const [EditBook, setEditBook] = useState(
        {book_name: '', image: '', description:'', status:''}
      );

    useEffect(() => {
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
        console.log(res)
        this.setState({
          books: res.data.data
        })
      })
      .catch((err)=>{
        console.log(err.res)
      })
    }, []);


  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
      
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        <Typography>
            <Box fontSize={30} m={1} fontWeight={50} letterSpacing={2} m={1}>
            Edit Data
            </Box>
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
        {EditBook && EditBook.map((edit)=>{
            return <>
            <Input label='Title' id='title' value={edit.book_name} onChange={(id, val)=>setEditBook({...EditBook, book_name: val})} type='text'>{EditBook.book_name}</Input>
            <Input label='Url Image' id='img' value={edit.image} onChange={(id, val)=>setEditBook({...EditBook, image: val})} type='file' />
            <Input label='Description' id='desc' value={edit.description} onChange={(id, val)=>setEditBook({...EditBook, description: val})} type='text' />
            <Input label='Status' id='status' value={edit.status} type='text' />
            </>
          })}
        </form>
      </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, true)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = (state) =>({
    auth: state.auth
  })
  export default connect(mapStateToProps)(EditBooks)