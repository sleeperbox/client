import React, { Component } from "react";
import MenuProfile from '../profile/MenuProfile';
import Content from "./content";
import Navbar from "./Navbar";
import Alltag from "./allTag"
import { Dimmer, Loader, Divider} from "semantic-ui-react";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: '',
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
                    <Navbar /> 
                    <Divider hidden/>
                    <Alltag/>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Divider hidden/>
                    <br/>
                    <Content />
                    <MenuProfile />
                </div>
                )}
        </div>
        );
    }
}
