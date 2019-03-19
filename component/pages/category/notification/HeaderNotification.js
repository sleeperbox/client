import React, { Component } from "react";
import {Icon, Menu, Header, Divider} from 'semantic-ui-react';
import Back from "./goBack"
export default class HeaderNotification extends Component {

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
            <Menu.Item name='back'>
            <Back />
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='help'>
                <Header as="h5">Notification</Header>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        );
    }
}
