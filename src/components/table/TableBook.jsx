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
  Grid,
  Input
 } from '@material-ui/core';
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EditBook from '../modal/EditBook'
import AddBook from '../modal/AddBook'
import { deleteBook } from '../../redux/actions/book'

const useStyles = makeStyles(theme => ({
  table: {
    flexShrink: 0,
    marginLeft: '10%',
    width: '100%',
    marginTop: '3%',
    overflowX: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing('5%' , "15%", 0, '15%')
  },
  toolbar: theme.mixins.toolbar,
  grid: {
    padding: theme.spacing(0 , 0, 0, '10%')
  }
}));

const TableBook = (props) => {
  const classes = useStyles();
  const [books, setBook] = useState([])


  useEffect(() => { 
    console.log(props, 'propsss')
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:3000/library/v1/books?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then(res => {     
        setBook(res.data.data.results)
     })
     .catch(error=>{
         console.log("Error")
     })
  }, [])

  // useEffect(() => { 
  //   const token = props.auth.data.token
  //   const id = props.match.params.book_id
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:3000/library/v1/books/' + id,
  //     headers: {
  //       Authorization: token
  //     }
  //   })
  //   .then(res => {        
  //     setBook(res.data.data)       
  //     // setBook(res.data.data)
  //   })
  //   .catch(error=>{
  //       console.log("Error")
  //   })
  // }, [])

  // const handleDelete= () =>{
  //   const token = props.auth.data.token
  //   const id = props.match.params.author_id
  //   axios({
  //     method: 'DELETE',
  //     url: 'http://localhost:3000/library/v1/books/' + id,
  //     headers: {
  //       Authorization: token
  //     }
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //     setBook(res.data.data)
  //   })
  //   .catch((err)=>{
  //     console.log(err.res)
  //   })
  // }
  const handleDelete = (id) =>{
    const token = props.auth.data.token;
    props.deleteBook(token, id)
    .then(res => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err.response);
    })
  }
  const handleNewImage = (e, data) => {
    e.preventDefault();
    console.log(e.target.value, data);
  }
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container className={classes.grid} spacing={3}>
          <Grid item xs={6}>
            <h3>List Book</h3>
          </Grid>
          <Grid item xs={6} align="right">
            <AddBook/>
          </Grid>
        </Grid>

        <Paper className={classes.table}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Stok</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Descripsi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((Book) => (
                <TableRow key={Book.book_id}>
                  <TableCell align="right">
                    <Link to={`/book/${Book.book_id}`}>
                      <EditBook 
                        bookDetail={Book} 
                        match={props.match}
                      />
                    </Link>
                    {/* <Link to={`/book/${Book.book_id}`}>  */}
                      <Button onClick={()=>handleDelete(Book.book_id)}>
                        <DeleteSweepTwoToneIcon/>
                      </Button>
                    {/* </Link> */}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Book.book_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Book.stock}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Book.status}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Book.author_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Book.genre_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img src={`http://localhost:3000/library/v1/uploads/${Book.image}`} height="100" width="100" />
                    <input type="file" onChange={(e) => handleNewImage(e, Book)} />
                  {/* {Book.image.length > 10
													? `${Book.image
															.split(' ')
															.join(' ')
															.slice(0, 10)}...`
													: `${Book.image
															.split(' ')
															.join(' ')
															.slice(0, Book.image.length)}`} */}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Book.description.length > 100
													? `${Book.description
															.split(' ')
															.join(' ')
															.slice(0, 100)}...`
													: `${Book.description
															.split(' ')
															.join(' ')
															.slice(0, Book.description.length)}`}
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

const mapDispatchToProps = {deleteBook}
export default connect(mapStateToProps, mapDispatchToProps)(TableBook)
