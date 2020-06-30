import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

// const api = axios.create({
//   baseURL: `http://localhost:8080/v1/books/?page=1&limit=5`
// })

class BookCard extends Component{
  // constructor(){
  //   super()
  //   api.get('/').then(res => {
  //     console.log(res.data)
  //   })
  // }

  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      books: [],
      id:'',
      book_name:'',
      description:'',
      image:'',


    }
  }

  getAllProdct = () =>{
    const token = localStorage.getItem('token')
    axios({
      method: 'GET',
      url: 'http://localhost:8080/v1/books/?page=1&limit=5',
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
    this.getAllProdct()
  }


render(){
  const Styles={
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  };
  return (
    <>
    {this.state.books.map((book)=>{
       return <>
    <Card style={Styles.root}>
      <CardActionArea>
        <CardMedia
          style={Styles.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
           
      
       <Typography gutterBottom variant="h5" component="h2">
            {book.book_name} </Typography> 
            <Typography variant="body2" color="textSecondary" component="p">
            {book.description}
          </Typography>
         
          
        </CardContent>
      </CardActionArea>
    </Card>
    </>
     })}
    </>
  );
}}

export default BookCard
