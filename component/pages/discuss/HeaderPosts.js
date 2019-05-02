import React, { Component } from "react";
import { Icon, Menu, Header } from "semantic-ui-react";

export default class HeaderPosts extends Component {
  back() {
    window.location = "#/profile";
  }
  render() {
    return (
      <Menu borderless size="huge" fixed="top">
        <Menu.Item name="back">
          <Icon onClick={this.back.bind(this)} name="arrow left" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="help">
            <Header as="h5">
              <small>
                <i>
                  Discussion
                </i>
              </small>
            </Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
