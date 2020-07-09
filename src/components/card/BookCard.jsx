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
    this.props.getBook(token)
  }

  componentDidMount(){
    this.getAllBook()
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
        {this.props.book.data.map((b)=>{
          return <>
            <Grid item xs={3}>
              <Card style={Styles.root}>
                <CardActionArea>
                  <CardMedia
                    style={Styles.media}
                    image={`http://localhost:8080/uploads/${b.image}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="button" display="block">
                    {b.book_name} <Link to={`/home/${b.book_id}`}>
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