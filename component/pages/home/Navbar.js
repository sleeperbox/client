import React, { Component } from "react";
import {
  Menu,
  Header,
  Icon
} from "semantic-ui-react";
export default class Navbar extends Component {

  render() {
    return (
      <div>
        <Menu borderless size="large" fixed="top">
            <Menu.Item name='camera' size="large">
              <Icon name="camera" size="large" style={{color: "#222"}}/>
            <Header as="h4" style={{marginTop: -0}}>Way Home</Header>
            </Menu.Item>
            <Menu.Item name='gift'  position="right">
              <Icon name="gift"  size="large" style={{color: "#222"}}/>
            </Menu.Item>
          </Menu>
      </div>
    );
  }
}