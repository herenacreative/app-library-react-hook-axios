import React from 'react';
import img from '../../assets/avatar3.png';
import {AppBar,
    Avatar,
    Button,
    Drawer,
    Hidden,
    CssBaseline,
    List,
    ListItem,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import { logout } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(0, 5, 5, 5),
  },
}));

const Drawers = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Avatar alt="Logo" src={img} className={classes.avatar} />
        <List component="nav">
        <ListItemLink>
          <Link to={`/home`}>
            <Button>Home</Button>
          </Link>
        </ListItemLink>
            <ListItemLink>
                <Link to={`/explore`}>
                    <Button>Explore</Button>
                </Link>
            </ListItemLink>
            <ListItemLink>
                <Link to={`/history`}>
                    <Button>History</Button>
                </Link>
            </ListItemLink>
            <ListItemLink>
                <Link to={`/book`}>
                    <Button>Book</Button>
                </Link>
            </ListItemLink>
            <ListItemLink>
                <Link to={`/author`}>
                    <Button>Author</Button>
                </Link>
            </ListItemLink>
            <ListItemLink>
                <Link to={`/genre`}>
                    <Button>Genre</Button>
                </Link>
            </ListItemLink>
            <ListItemLink>
                <Button onClick={logout}>Logout</Button>
            </ListItemLink>
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to={`/dashboard`}>

            <Typography variant="h6" noWrap>
              Here Library
            </Typography>

          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {logout}
const pushRoute = withRouter(Drawers)
export default connect(mapStateToProps, mapDispatchToProps)(pushRoute)
