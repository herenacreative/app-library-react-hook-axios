import React, {Component} from 'react'
import BookCards from '../components/card/BookCard'
import {CssBaseline, Container, CardMedia, Grid, Typography, Box} from '@material-ui/core';
import AppBar from '../components/layout/AppBar'
import img from '../assets/clip-library.png'
import {connect} from 'react-redux'
import Pagination from '@material-ui/lab/Pagination';

class Home extends Component{
  constructor(props){
    super(props)

    // console.log(this.props.history.location.search, 'his')
  }

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  render(){
    const Styles={
      media: {
        height: 400,
        maxWidth: '100%',
      },
      typo: {
        paddingTop:100
      }
    }
    return(
      <div>
        <AppBar/>
        <React.Fragment>
          <CssBaseline />
          <Container fixed>

            {/* Header */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Typography style={Styles.typo}>
                  <Box fontSize={50} m={1} fontWeight={500} letterSpacing={6} m={1}>
                    Here Library
                  </Box>
                  <Box fontSize={28} m={1} letterSpacing={10} m={1}>
                    Book is a window to the world
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
              <CardMedia
                style={Styles.media}
                image={img}/>
              </Grid>
            </Grid>
            {/* END HEADER */}

            <h1>List Book</h1>
            <BookCards/>

            <div>
              <Pagination count={10} />
            </div>
            
          </Container>
        </React.Fragment>
      </div> 
    )
  }
}

const mapStateToProps = (state) =>({
  auth: state.auth
})
export default connect(mapStateToProps)(Home)

