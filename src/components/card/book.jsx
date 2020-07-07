import React, {Component} from 'react';
import {Card, Grid, CardActionArea, CardContent, CardMedia, CardActions, Typography, IconButton} from '@material-ui/core';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import swal from 'sweetalert2'
import ZoomInTwoToneIcon from '@material-ui/icons/ZoomInTwoTone';

class BookCard extends Component{
  constructor(props){
    super(props)
    this.state={
      books: []
    }
  }

  getAllBooks = () =>{
    const token = this.props.auth.data.token
    // const token = localStorage.getItem('token')
    // console.log(this.state.books, 'g',this.state.books.image, 'images', this.state.books.book_name,)
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/books/?page=1&limit=100',
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      this.setState({
        books: res.data.data.results
      })
    })
    .catch((err)=>{
      console.log(err.res)
    })
  }

  componentDidMount(){
    this.getAllBooks()
  }

  render(){
    const Styles={
      root: {
        maxWidth: 250,
        height: 345
      },
      media: {
        height: 200,
      },
    };
  
    return (
      <>
        <Grid container spacing={3}>
          {this.state.books.map((book)=>{
            return <>
              <Grid item xs={3}>
                <Card style={Styles.root}>
                  <CardActionArea>
                    <CardMedia
                      style={Styles.media}
                      image={`http://localhost:8080/uploads/${book.image}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="button" display="block">
                     {book.book_name} <Link to={`/home/${book.book_id}`}>
                      <IconButton size="small"><ZoomInTwoToneIcon/> Detail</IconButton>
                    </Link>
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Link to={`/home/${book.book_id}`}>
                      <IconButton size="small"><ZoomInTwoToneIcon/> Detail</IconButton>
                    </Link>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            </>
          })}
        </Grid>
      </>
  );
}}


const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(BookCard)