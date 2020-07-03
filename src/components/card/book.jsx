import React, {Component} from 'react';
import {Card, Grid, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import axios from 'axios'
import { Link } from 'react-router-dom';

class BookCard extends Component{
  constructor(props){
    super(props)
    this.state={
      books: []
    }
  }

  getAllBooks = () =>{
    const token = localStorage.getItem('token')
    console.log(this.state.books, 'g',this.state.books.image, 'images', this.state.books.book_name,)
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/books/?page=1&limit=12',
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
        maxWidth: 345,
        height: 345
      },
      media: {
        height: 140,
      },
    };
  
    return (
      <>
        <Grid container spacing={4}>
          {this.state.books.map((book)=>{
            return <>
              <Grid item xs={12} sm={6} md={4}>
                <Card style={Styles.root}>
                  <CardActionArea>
                    <CardMedia
                      style={Styles.media}
                      // src={`http://localhost:3000/uploads/${book.image}`}
                      image="https://source.unsplash.com/random"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      <Link to={`/books/${book.book_id}`}>{book.book_name}</Link>
                      </Typography> 
                      <Typography variant="body2" color="textSecondary" component="p">
                        {book.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </>
          })}
        </Grid>
      </>
  );
}}

export default BookCard
