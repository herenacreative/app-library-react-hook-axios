import React, { useEffect, useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  InputBase,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Grid
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import axios from "axios";
import BookCards from "../card/BookCard";
import { withRouter, useHistory } from "react-router-dom";
import {
  useLocationState,
  useQueryState,
} from "react-router-use-location-state";
import Card from "../card/BookCard";
import { getBook } from "../../redux/actions/book";
import { convertObjectToParams } from "../../helper";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(0, 0, 0, 0),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  sort: {
    marginLeft: theme.spacing(5),
    width: "50%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Searching = (props) => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useQueryState("search", "");
  const [sort, setSort] = useQueryState("sort", "");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect((Search) => {
    setLoading(true);
    const token = props.auth.data.token;
    const params = new URLSearchParams(props.location.search).get("search");
    // console.log(params, 'p')
    // const search= props.history.push()
    axios({
      method: "GET",
      url: `http://http://54.85.133.10/library/v1/books`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res);
        setBooks(res.data.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.res);
      });
  }, []);
  const searchBook = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    const searchParams = new URLSearchParams(props.location.search).get(
      "search"
    );
    const sortParams = new URLSearchParams(props.location.search).get("sort");
    const token = props.auth.data.token;
    const obj = {};
    if (searchParams) {
      obj.search = searchParams;
    } else {
      obj.search = "";
    }
    if (sortParams) {
      obj.sort = sortParams;
    }
    const params = convertObjectToParams(obj);
    console.log(params, "par");
    // axios({
    //   method: 'GET',
    //   url: `http://http://54.85.133.10/library/v1/books${params}`,
    //   headers: {
    //     Authorization: token
    //   }
    // })
    props
      .getBook(token, params)

      .then((res) => {
        console.log(res);
        // setBooks(
        //   res.data.data.results
        // )
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // console.log(err.res)
      });
  };

  const sorting = () => {
    searchBook(null);
  };

  useEffect(() => {
    sorting();
    console.log("sort berubah");
  }, [sort]);
  // const renderBook = () =>(<>
  //   const {search} = {}
  //   <Card/>
  // </>)

  if (loading) {
    return <p>Loading Book...</p>;
  }

  // const filterdbooks = books.filter(book =>{
  //   return book.book_name.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
  // })
  // {console.log(search)}
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <form>
            <div>
              <FormControl className={classes.sort}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                name="sort"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="book_name">Name</MenuItem>
                <MenuItem value="author_name">Author</MenuItem>
                <MenuItem value="genre_name">Genre</MenuItem>
              </Select>
              </FormControl>
            </div>
          </form>
        </Grid>
        <Grid item xs={8}>
          <form onSubmit={(e) => searchBook(e)}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                name="search"
                value={search}
                placeholder="Search…"
                onChange={(e) => setSearch(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getBook,
};

const pushRoute = withRouter(Searching);
export default connect(mapStateToProps, mapDispatchToProps)(pushRoute);
