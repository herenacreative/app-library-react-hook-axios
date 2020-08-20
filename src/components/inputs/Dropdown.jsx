import React, {useState, useEffect} from 'react';
import {Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [names, setNames] = useState({genre_name:''})
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  // GetGenres = () => {
  //   axios({
  //     method: 'GET',
  //     url:'http://http://54.85.133.10/library/v1/genres',
  //     data: names
  //   })
  //   .then(function (response) {
  //         console.log(response)
  //         localStorage.setItem('token', response.data.data[0].token)
  //         localStorage.setItem('refreshToken', response.data.data[0].refreshToken)
  //     })
  //   .catch(function (error) {
  //       console.log(error)
  //       console.log(error.response)
  //   }) 
  // }

  useEffect(() => {
    axios.get('http://http://54.85.133.10/library/v1/genres')
        .then(res => {
            setNames(res.names);
            setLoad(true);
        })
        .catch(err => {
            setError(err.message);
            setLoad(true)
        })
  }, []);
  
  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {props.names}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>{names.genre_name}</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}