import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Buttons extends Component {
  constructor(props){
    super(props)
    this.state={
      value: this.props.value,
      variant: this.props.variant,
      color: this.props.color,
      type: this.props.type
    }
  }
render(){
    return (
        <div>
          <Button variant={this.state.variant} type={this.state.type} color= {this.state.color}>
            {this.state.value}
          </Button>
        </div>
      );
}
  
}
export default Buttons
