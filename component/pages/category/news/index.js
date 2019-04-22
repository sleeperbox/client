import React, { Component } from "react"
import { Dimmer, Loader, Container } from 'semantic-ui-react';
import HeaderNews from './HeaderNews';
import MenuProfile from '../../profile/MenuProfile';
import News from './News';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            datas: [],
            isLogin: '',
            loading: true,
            friend_email: localStorage.getItem('email').slice(1, -1),
        };
    }

    componentWillMount() {
        if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
            // this.setState({loading: false})
            setTimeout(() =>  {
                this.setState({loading: false})
            }, 100)
        }
       
    }

    componentDidMount() {
        if(this.state.datas){
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 500);
        }
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
    }

    shouldComponentUpdate(newProps, newState){
        if(newState){
            return true;
        }else{
            return false;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
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

    render() {
        const {loading} = this.state;
        return (
            <div style={{marginBottom: 45}}>
                {loading ? (this.loading()
                    ) : (
                        <div>
                            <HeaderNews/>
                            <Container>
                                <News/>
                            </Container>
                            <MenuProfile/>
                        </div>
                    )}
            </div>
        );
    }
}