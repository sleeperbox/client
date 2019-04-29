import React, { Component } from "react";
import { Dimmer, Loader, Image, Segment, Container } from "semantic-ui-react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MoreCategory from './MoreCategory';
import { isloginAction, emailAction, passwordAction, tipeAction } from '../actions';
import store from '../../../store';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem('auth'),
            email: localStorage.getItem('email'),
            loading: true,
        };
    }

    componentWillMount() {
        if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
            setTimeout(() =>  {
                this.setState({loading: false})
            }, 100)
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

    loading() {
        return (
            <div>
                <Dimmer active inverted>
                    <Loader size='large'>Plase Wait</Loader>
                </Dimmer>
            </div>        
        );
    }

    render () {
        const { loading } = this.state;
        return (
        <div>
            {loading ? (this.loading()
                ) : (
                    <div>
                        
                        <HeaderProfile />
                        <MoreCategory/>
                        <MyPost/>
                        <MenuProfile />
                    </div>
                )}
        </div>
        );
    }


}
