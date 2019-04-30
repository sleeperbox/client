import React, { Component } from "react";
import MenuProfile from '../profile/MenuProfile';
import Navbar from "./Navbar";
import Alltag from "./allTag"
import { Dimmer, Loader, Divider} from "semantic-ui-react";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem('auth'),
            email: localStorage.getItem('email'),
            loading: true,
        };
        this.loading = this.loading.bind(this)
    }

    componentWillMount() {
        if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
            // this.setState({loading: false})
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
                    <Loader size='large'>Please Wait</Loader>
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
                    <Navbar /> 
                    <Divider hidden/>
                    <Alltag/>
                    <Divider hidden/>
                    <Divider hidden/>
                    <br/>
                    <MenuProfile />
                </div>
                )}
        </div>
        );
    }
}
