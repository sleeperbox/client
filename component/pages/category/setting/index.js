import React, { Component } from "react"
import {Dimmer, Loader, Container, Divider, Grid, GridColumn, Menu} from 'semantic-ui-react';
import HeaderMenu from './header-menu-setting'
import MenuProfile from '../../profile/MenuProfile';

import AccountSetting from './account-setting'
import ProfileSetting from './profile-setting'

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: '',
            loading: true
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
        console.log('first ', this.state.loading)
        setTimeout(() => {
            if(this.state.loading == true){
                this.setState({loading: false}, () => console.log('end: ', this.state.loading))
            }
        }, 500)
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

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
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
                            <HeaderMenu/>
                            <Divider hidden/>
                            <Divider hidden/>
                            <Divider hidden/>
                            <Container>
                            <Divider hidden />
                                <Grid columns={1}>
                                    <GridColumn>
                                        <ProfileSetting/>
                                        <AccountSetting/>
                                        <br />
                                        <br />
                                        <br />
                                    </GridColumn>
                                </Grid>
                            </Container>
                            <MenuProfile/>
                        </div>
                    )}
            </div>
        );
    }


}
