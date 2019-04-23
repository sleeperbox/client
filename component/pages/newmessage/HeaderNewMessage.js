import React, { Component } from "react";
import { Icon, Menu, Header } from "semantic-ui-react";

export default class HeaderNewMessage extends Component {
  back() {
    window.location = "#/message";
  }
  render() {
    return (
      <Menu borderless size="huge" fixed="top">
        <Menu.Item name="back">
          <Icon onClick={this.back.bind(this)} name="arrow left" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="help">
            <Header as="h5">Contact</Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
