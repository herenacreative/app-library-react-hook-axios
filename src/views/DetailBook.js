import React, { Component } from 'react';
import DetailBooks from '../components/card/DetailBooks';

class DetailBook extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <>
       <DetailBooks match={this.props.match}/>
      </>
    ); 
  }
}

export default DetailBook