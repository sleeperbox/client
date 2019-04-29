import React, { Component } from "react";
import HeaderNewMessage from "./HeaderNewMessage";
import Kontak from "./Contack";
import MenuProfile from "../profile/MenuProfile";
import { Divider } from "semantic-ui-react";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: "",
      auth : localStorage.getItem("auth"),
      email : localStorage.getItem("email"),
      email: ""
    };
  }
  
  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isLogin === "false" ? (window.location = "#/login") : "";
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div style={{ marginBottom: 45 }}>
        <HeaderNewMessage />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Kontak />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <MenuProfile />
      </div>
    );
  }
}
