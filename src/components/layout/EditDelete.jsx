import React, { Component } from 'react';
import Edit from '../modal/EditBook'
import Delete from '../modal/Delete'
import {Paper, Breadcrumbs} from '@material-ui/core';

class DetailBook extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <Breadcrumbs aria-label="breadcrumb">
            <Edit/>
            <Delete/>
        </Breadcrumbs>
      </div>
    ); 
  }
}

export default DetailBook