import React, { Component } from 'react'
import TableBook from '../components/table/TableBook'
import NavBar from '../components/layout/NavBar'

class Book extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <>
      <NavBar/>
      <TableBook match={this.props.match}/>
      </>
    ); 
  }
}

export default Book