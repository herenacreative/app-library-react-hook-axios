import React, { Component } from 'react';
import {
  Card, 
  Grid, 
  CardActionArea, 
  CardContent, 
  CardMedia,
  Typography, 
  IconButton,
  Divider
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
    console.log(this.props.book, 'ini buku')
  }

  componentDidUpdate() {
    console.log(this.props.book, 'ini buku')
  }

  render(){ 
    const Styles={
      root: {
        maxWidth: 310,
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
            <Grid item xs={6} sm={3} >
            <Link to={`/home/${b.book_id}`} style={{textDecoration: 'none'}}>
              <Card style={Styles.root}>
                <CardActionArea>
                  <CardMedia
                    style={Styles.media}
                    image={`http://localhost:8080/uploads/${b.image}`}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom align="center">
                      {b.book_name}
                    </Typography>
                    <Divider />
                    <Typography variant="caption" display="block" align="justify" gutterBottom>
                      {b.description.length > 100
													? `${b.description
															.split(' ')
															.join(' ')
															.slice(0, 100)}...`
													: `${b.description
															.split(' ')
															.join(' ')
															.slice(0, b.description.length)}`} 
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
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