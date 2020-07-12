import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid
 } from '@material-ui/core';
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EditGenre from '../modal/EditGenre'
import AddGenre from '../modal/AddGenre'

const useStyles = makeStyles(theme => ({
  table: {
    flexShrink: 0,
    marginLeft: '10%',
    width: '80%',
    marginTop: '3%',
    overflowX: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing('5%' , "15%", 0, '15%')
  },
  toolbar: theme.mixins.toolbar,
  grid: {
    padding: theme.spacing(0 , "10%", 0, '10%')
  }
}));

const TableGenre = (props) => {
  const classes = useStyles();
  const [genres, setGenres] = useState([])

  useEffect(() => { 
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/genres?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then(res => {               
        setGenres(res.data.data.results)
     })
     .catch(error=>{
         console.log("Error")
     })
  }, [])

  const handleDelete= () =>{
    const token = props.auth.data.token
    const id = props.match.params.author_id
    axios({
      method: 'DELETE',
      url: 'http://localhost:8080/v1/genres/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setGenres(res.data.data)
    })
    .catch((err)=>{
      console.log(err.res)
    })
  }

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container className={classes.grid} spacing={3}>
          <Grid item xs={6}>
            <h3>List Genre</h3>
          </Grid>
          <Grid item xs={6} align="right">
            <AddGenre/>
          </Grid>
        </Grid>

        <Paper className={classes.table}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {genres.map(Genre => (
                <TableRow key={Genre.genre_id}>
                  <TableCell>
                    <Link to={`/genre/${Genre.genre_id}`}>
                      <EditGenre 
                        genreName={Genre} 
                        match={props.match}
                      />
                    </Link>
                    <Link to={`/genre/${Genre.genre_id}`}> 
                      <Button onClick={()=>handleDelete(Genre.Genre_id)}>
                        <DeleteSweepTwoToneIcon/>
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell  align="right" component="th" scope="row">
                    {Genre.genre_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </main>
    </>
  );
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(TableGenre)
