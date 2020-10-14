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
import EditAuthor from '../modal/EditAuthor'
import AddAuthor from '../modal/AddAuthor'

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

const TableAuthor = (props) => {
  const classes = useStyles();
  const [authors, setAuthor] = useState([])

  useEffect(() => { 
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:3000/library/v1/authors?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then(res => {               
        setAuthor(res.data.data.results)
     })
     .catch(error=>{
         console.log(error)
     })
  }, [])

  const handleDelete= (id) =>{
    console.log(props.match.params, 'au')
    const token = props.auth.data.token
    // const id = props.match.params.path
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/library/v1/authors/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      window.location.reload();
      // setAuthor(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container className={classes.grid} spacing={3}>
          <Grid item xs={6}>
            <h3>List Author</h3>
          </Grid>
          <Grid item xs={6} align="right">
            <AddAuthor/>
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
              {authors.map(data => (
                <TableRow key={data.author_id}>
                  <TableCell>
                    <Link to={`/Author/${data.author_id}`}>
                      <EditAuthor 
                        authorName={data} 
                        match={props.match}
                      />
                    </Link>
                    <Link to={`/Author/${data.author_id}`}> 
                      {data.author_id}
                      <Button onClick={()=>handleDelete(data.author_id)}>
                        <DeleteSweepTwoToneIcon/>
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {data.author_name}
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
export default connect(mapStateToProps)(TableAuthor)
