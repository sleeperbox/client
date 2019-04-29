import React, { Component } from "react";
import HeaderInfluence from "./HeaderInfluence";
import Influence from "./Influence";
import { Divider } from "semantic-ui-react";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem("auth"),
      email: localStorage.getItem("email")
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
        <HeaderInfluence />
        <Influence />
      </div>
    );
  }
}
