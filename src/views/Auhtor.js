import React, { Component } from 'react'
import TableAuthor from '../components/table/TableAuthor'
import NavBar from '../components/layout/NavBar'

class Author extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <>
      <NavBar/>
      <TableAuthor match={this.props.match}/>
      </>
    ); 
  }
}

export default Author