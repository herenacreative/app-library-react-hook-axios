import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Avatar, List, ListItem, Button, Typography, Box} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import img from '../../assets/avatar3.png';
import { useHistory, Link } from "react-router-dom";
import { logout } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(5),
  },
}));

const Drawers = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const history = useHistory();

  const logout = () => {
    console.log(props.history.push)
    // props.logout();
    props.history.push("/");
  };
  // console.log(props.auth.data.email, 'propssssss')

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Avatar alt="Logo" src={img} className={classes.large} />
      <Box textAlign="center" m={1} fontSize={24} fontWeight="fontWeightBold">
       {props.auth.data.username}
      </Box>
        <List component="nav">
        <ListItemLink>
        <Link to={`/explore`}><Button>Explore</Button></Link>
        </ListItemLink>
        <ListItemLink>
        <Link to={`/history`}><Button>History</Button></Link>
        </ListItemLink>

         <ListItemLink>
                <Link to={`/book`}>
                    <Button>Book</Button>
                </Link>
            </ListItemLink>
            
        <ListItemLink>
          <Button onClick={logout}>Logout</Button>
        </ListItemLink>
        <ListItem >
        {/* <Modal/> */}
        </ListItem>
      </List>
    </div>
  );
  
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
            <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {logout}
const pushRoute = withRouter(Drawers)
export default connect(mapStateToProps, mapDispatchToProps)(pushRoute)