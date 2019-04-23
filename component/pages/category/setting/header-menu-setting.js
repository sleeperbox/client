import React, { Component } from "react";
import {Icon, Menu, Header} from 'semantic-ui-react';

export default class HeaderMenu extends Component {

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        localStorage.removeItem('menu')
        window.location='#/login';
    }
    back() {
      window.location = "#/profile"
      localStorage.setItem('menu', 'profile');
    }

    render () {
        return (
            <Menu borderless size="huge" fixed="top">
            <Menu.Item name='back'>
              <Icon onClick={this.back.bind(this)} name="arrow left" style={{color: "#555"}}/>
            </Menu.Item>
            {/* <Menu.Menu position='right'>
              <Menu.Item name='help'>
              <Header as="h5"><a onClick={this.logout.bind(this)} style={{color: "#ED6A5E"}}>Logout</a></Header>
              </Menu.Item>
            </Menu.Menu> */}
          </Menu>
        );
    }


}
