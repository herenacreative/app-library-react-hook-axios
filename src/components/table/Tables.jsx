import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {TableCell, Card, CardActionArea, CardContent, ButtonGroup, Button, CardActions, Grid} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Buttons from '../inputs/Buttons'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone';
import AddAuthors from '../modal/AddAuthors'
import EditAuthors from '../modal/EditAuthors'

const useStyles = makeStyles((theme) =>({
  root: {
    margin: theme.spacing(10),
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
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

  const DeleteAuthorId= () =>{
    console.log(props.match.params, 'par')
    // const token = localStorage.getItem('token')
    const token = props.auth.data.token
    const id = props.match.params.author_id
    axios({
      method: 'DELETE',
      url: 'http://localhost:8080/v1/authors/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      setAuthor(res.data.data)
    })
    .catch((err)=>{
      console.log(err.res)
    })
  }


  return (
    <div className={classes.root}>
      <h3>List Author</h3>
      <AddAuthors/>
       <Grid container spacing={3}>
       {Author.map((authors)=>(<>
        <Grid item  xs={3}>
      <Card className={classes.card}>
      
        <CardActionArea >
        
          <CardContent key={authors.author_id}>
          {authors.author_name}
          </CardContent>
           
           <CardActions>
           <ButtonGroup size="small" aria-label="small outlined button group">
           {/* <Link to={`/author/${authors.author_id}`}>
           <EditTwoToneIcon fontSize="small"/>
           </Link> */}
            <Link to={`/author/${authors.author_id}`}><EditAuthors  match={props.match}/></Link>
              <Button onClick={()=>DeleteAuthorId(authors.author_id)}><DeleteSweepTwoToneIcon/></Button>
              
         
      </ButtonGroup>
              </CardActions>
        </CardActionArea>
     
      </Card>
      </Grid>
       </> ))}
      </Grid>      
    </div>
   );
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(AuthorTable)
