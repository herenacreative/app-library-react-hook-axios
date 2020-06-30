import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import styles from './Input.module.css';

class Input extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.id,
            label: this.props.label,
            type: this.props.type,
            onChange: this.props.onChange
        }
      }

    render(){
        return (
            <div>
                <div className={styles.textfield}>
                    <TextField id={this.state.id} label={this.state.label} onChange= {this.state.onChange} type={this.state.type} fullWidth />
                </div>
            </div>
        );   
    }
}

export default Input