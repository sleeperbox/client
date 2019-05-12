import React, { Component } from "react";
import {Dimmer, Loader, Container, Divider, Grid, GridColumn, Menu} from 'semantic-ui-react';
import HeaderMenu from './header-menu-setting';
import MenuProfile from '../../profile/MenuProfile';
import AccountSetting from './account-setting';
import ProfileSetting from './profile-setting';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem('auth'),
            email: localStorage.getItem('email'),
            loading: true
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
