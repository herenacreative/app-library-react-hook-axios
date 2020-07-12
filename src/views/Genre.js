import React, { Component } from 'react';
import Tables from '../components/table/TableGenre'
// import AppBar from '../components/layout/AppBar'
import NavBar from '../components/layout/NavBar'

class Genre extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <>
      <NavBar/>
      <Tables match={this.props.match}/>
      </>
    ); 
  }
}

export default Genre