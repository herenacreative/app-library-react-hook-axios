import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Component } from 'react';

class Checkboxes extends Component{
    constructor(props){
        super(props)
        this.state={
            checked: 'checked',
            inputProps: this.props.inputProps
        }
    }
    render(){
        const handleChange = (event) => {
            this.setState(event.target.checked);
          };
        return(
            <div>
                <Checkbox
                    checked={this.state.checked}
                    onChange={handleChange}
                    inputProps={this.state.inputProps}
                />
            </div>
        )
    }
}

export default Checkboxes