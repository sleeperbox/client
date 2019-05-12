import React, { Component } from "react";
import {Icon, Menu, Header, Divider} from 'semantic-ui-react';

export default class HeaderMessage extends Component {

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
    }
    back() {
      window.location = "#/profile"
      localStorage.setItem('menu', 'profile');
    }

    render () {
        return (
            <Menu borderless size="huge" fixed="top">
            <Menu.Menu position='right'>
              <Menu.Item name='help'>
                <Header as="h5">Message Way</Header>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        );
    }


}
