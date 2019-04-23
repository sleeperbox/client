import React, { Component } from "react";
import {Divider,Container} from 'semantic-ui-react';
import HeaderMessagePrivate from './HeaderMessagePrivate';
import SendMessage from "./SendMessage";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: ''
        };
    }

    componentWillMount() {
        
        const email = JSON.parse(localStorage.getItem('email'))
        const auth = JSON.parse(localStorage.getItem('auth'))
        this.setState({
            email,
            isLogin: auth
        })
    }

    componentDidMount() {
        if(this.state.isLogin != true){
            window.location='#/login';
        }
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.isLogin){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.isLogin === "false" ? window.location = '#/login' : '';
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    render () {
        return (
        <div>
            <HeaderMessagePrivate />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Container>
            <Divider hidden />
            </Container>
            <Divider hidden />
            <Divider hidden />
            <SendMessage />
        </div>
        );
    }


}