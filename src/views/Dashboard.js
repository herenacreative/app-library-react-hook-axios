import React, { Component } from 'react';
import NavBar from '../components/layout/NavBar';

class Dashboard extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <>
        <NavBar/>
       <h1>Dashboard</h1>
      </>
    ); 
  }
}

export default Dashboard