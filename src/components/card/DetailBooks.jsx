import React, {Component} from 'react';
import {Card, Button, Container, Grid, Box, CardActionArea, CardContent, CardMedia, Typography, Chip} from '@material-ui/core';
import axios from 'axios'
// import Button from '../inputs/Buttons'
import ButtonModal from '../modal/Borrow'
import img from '../../assets/2.jpeg'
import Breadcrumbs from '../layout/Breadcrumbs'
import EditDelete from '../layout/EditDelete'
import {connect} from 'react-redux'
import EditBooks from '../modal/EditBook'
import Buttons from '../inputs/Buttons';
// import { Link } from 'react-router-dom';

class DetailBooks extends Component{
  constructor(props){
    super(props)
    this.state={
      books: []
    }
  }

  getDetailBooks = () =>{
    // const token = localStorage.getItem('token')
    const token = this.props.auth.data.token
    const id = this.props.match.params.book_id
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/books/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      this.setState({
        books: res.data.data
      })
    })
    .catch((err)=>{
      console.log(err.res)
    })
  }

  DeleteBookId= () =>{
    // const token = localStorage.getItem('token')
    const token = this.props.auth.data.token
    const id = this.props.match.params.book_id
    axios({
      method: 'DELETE',
      url: 'http://localhost:8080/v1/books/' + id,
      headers: {
        Authorization: token
      }
    })
    .then((res)=>{
      console.log(res)
      this.setState(res.data.data)
    })
    .catch((err)=>{
      console.log(err.res)
    })
  }


  componentDidMount(){
    this.getDetailBooks()
  }

  render(){
    const Styles={
      media: {
        height: 400,
        maxWidth: '100%',
      },
      content:{
        paddingTop: 30,
        paddingLeft: 20,
        width:'50%'
      },
      typo: {
        paddingLeft: "20%",
        paddingTop:"5%",
        width:'70%'
      },
      imgs: {
        margin: "10%"
      },
      desc:{
        paddingLeft: "20%",
        paddingTop: "10%",
        width:'70%'
      },
    };
  
    return (
      <div>
          {this.state.books.map((book)=>{
            return <>
            <Container fixed>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={8}>
                  <Breadcrumbs/>
                      <Typography style={Styles.typo}>
                        <Chip label={book.genre_name} style={{marginRight: 5}} color="primary" />
                        <Chip label={book.status} />
                        <Box fontSize={50} m={1} fontWeight={500} letterSpacing={6} m={1}>
                        {book.book_name}
                        </Box>
                        <div  style={Styles.content}>
                          <ButtonModal/>
                        </div> 
                      </Typography>
                      <Typography style={Styles.desc} variant="body2" color="textSecondary" component="p">
                        {book.description}
                      </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={Styles.imgs}>
                      <CardMedia
                      style={Styles.media}
                      image={`http://localhost:8080/uploads/${book.image}`}/>
                    </div>
                    <EditBooks bookDetail={book} match={this.props.match}/>
                    <Button onClick={()=>this.DeleteBookId(book.book_id)} variant='contained' color='default'>Delete</Button>
                  </Grid>
                </Grid>
              </Container>
            </>
          })}
      </div>
  );
}}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(DetailBooks)
