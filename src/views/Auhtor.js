import React, { Component } from 'react';
import Tables from '../components/table/Tables'
import AppBar from '../components/layout/AppBar'

class Author extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <>
      <AppBar/>
      <Tables match={this.props.match}/>
      </>
    ); 
  }
}

export default Author