import React, { Component } from 'react';
import { Button } from 'react-native';

export default class ButtonConfirmar extends Component {
    calc(){
        this.props.callback(this.props.num * 2);
    }

    render(){
        return (<Button onPress={() => this.calc()} title="Calc" />)
    }
}

