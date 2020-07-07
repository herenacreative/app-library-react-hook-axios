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
            value: this.props.value || ''
        }
      }

    onChange = event => {
        const { id } = this.props;
        const value = event.target.value;
        this.setState({ value: value });
        return this.props.onChange(id, value);
    }

    render(){
        return (
            <div>
                <div className={styles.textfield}>
                    <TextField id={this.state.id} value={this.state.value} label={this.state.label} onChange= {this.onChange} type={this.state.type} fullWidth />
                </div>
            </div>
        );   
    }
}

export default Input