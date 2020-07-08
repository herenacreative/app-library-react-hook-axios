import React, { Component } from 'react';
import {
  Card, 
  Grid, 
  CardActionArea, 
  CardContent, 
  CardMedia,
  Typography, 
  IconButton
} from '@material-ui/core';
import ZoomInTwoToneIcon from '@material-ui/icons/ZoomInTwoTone';
import styles from './BookCard.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getBook } from "../../redux/actions/book"

class BookCard extends Component{
  constructor(props){
    super(props)
    this.state={
      books: []
    }
  }

  getAllBook = () =>{
    const token = this.props.auth.data.token
    // this.props.getBook(token)
    // const token = localStorage.getItem('token')
    console.log(this.state.books, 'g',this.state.books.image, 'images', this.state.books.book_name,)
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
    this.getAllBook()
  }

  render(){ 
console.log(this.state.books, 'state')
    return (
      <>
        <Grid container spacing={3}>
          {this.state.books.map((b)=>{
            return <>
              <Grid item xs={3}>

                <Card className={styles.root}>
                  <CardActionArea>
                    <CardMedia
                      className={styles.media}
                      image={`http://localhost:8080/uploads/${b.image}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="button" display="block">
                        {b.book_name} 
                        <Link to={`/home/${b.book_id}`}>
                          <IconButton size="small"><ZoomInTwoToneIcon/> Detail</IconButton>
                        </Link>
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


const mapStateToProps = (state) =>({
  auth: state.auth,
  book: state.book
})

const mapDispatchProps = {getBook}

export default connect(mapStateToProps, mapDispatchProps)(BookCard)