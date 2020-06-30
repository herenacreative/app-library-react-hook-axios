import React, {Component} from 'react'
import NavBar from '../components/Auth/NavBar'
import BookCard from '../components/card/book'
import Modal from '../components/modal/Modals'
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '../components/layout/AppBar'
import axios from 'axios'

class Home extends Component{

  render(){
        return(
          <div>
            <AppBar/>
            {/* <NavBar/> */}
            <React.Fragment>
              <CssBaseline />
              <Container fixed>
                <h1>Home</h1>
                <Modal/>
                <BookCard/>
                {/* {this.state.books.map((dataBook, index) => {
                    return(
                      <BookCard key={index} data={dataBook} username='id'/>
                    )
                })} */}
              </Container>
            </React.Fragment>
          </div>
          
        )
    }
}

export default Home