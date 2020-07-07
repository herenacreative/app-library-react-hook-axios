import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Buttons from '../inputs/Buttons'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 150
  },
  paper: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(20),
    width: 800
  },
  buttons: {
      margin: theme.spacing(5, 1, 0, 0)
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AuthorTable = (props) => {
  const classes = useStyles();
  const [Author, setAuthor] = useState([]);

  useEffect(() => {
    console.log(Author.author_name)
    const token = props.auth.data.token
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/authors?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setAuthor(res.data.data.results)
    })
    .catch((err)=>{
      console.log(err.res)
    })    
  }, [])


  return (
    <div className={classes.paper} >
      <Paper>
      <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow align="center">
            <TableCell>name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow align="right">
            {/* {Author.map((author) => ( */}
            {Author.map((authors)=>( <>
              <TableCell  key={authors.author_id} component="th" scope="row">
                {authors.author_name}
                
              </TableCell>

           
              <TableCell>
                <div className={classes.buttons}>
                <Link to={`/author/${authors.author_id}`}><Buttons value="Edit"  variant='contained' color='default'/></Link>
                <Buttons value="delete"  variant='contained' color='default'/>
                </div>
              </TableCell>
              </> ))}
            </TableRow>
       
        </TableBody>
      </Table>
    </TableContainer>
  
      </Paper>
    </div>
   );
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(AuthorTable)
