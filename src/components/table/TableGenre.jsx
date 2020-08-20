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
      url: 'http://http://54.85.133.10/library/v1/genres?page=1&limit=100',
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

  const handleDelete= (id) =>{
    console.log(props.auth.data.token, 'g')
    const token = props.auth.data.token
    // const id = props.match.params.author_id
    axios({
      method: 'DELETE',
      url: 'http://http://54.85.133.10/library/v1/genres/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      window.location.reload();
      // setGenres(res.data.data)
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
              {genres.map(data => (
                <TableRow key={data.genre_id}>
                  <TableCell>
                    <Link to={`/genre/${data.genre_id}`}>
                      <EditGenre 
                        genreName={data} 
                        match={props.match}
                      />
                    </Link>
                    {/* <Link to={`/genre/${Genre.genre_id}`}>  */}
                      <Button onClick={()=>handleDelete(data.genre_id)}>
                        <DeleteSweepTwoToneIcon/>
                      </Button>
                    {/* </Link> */}
                  </TableCell>
                  <TableCell  align="right" component="th" scope="row">
                    {data.genre_name}
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
