import React, { Component } from "react";
import HeaderPosts from "./HeaderPosts";
import Posts from "./Posts";
import { Container, Grid, Divider, Image, List, Header, Button, Modal } from "semantic-ui-react";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  render() {
    return (
      <div style={{ marginBottom: 45 }}>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <HeaderPosts />
        <Posts />
      </div>
    );
  }
}
