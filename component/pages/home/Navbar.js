import React, { Component } from "react";
import {
  Menu,
  Header
} from "semantic-ui-react";
import axios from "axios";
import Back from "../category/notification/goBack"
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <Menu borderless size="huge" fixed="top">
            <Menu.Item name='back'>
            <Back />
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='help'>
                <Header as="h5">Home</Header>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
      </div>
    );
  }
}
