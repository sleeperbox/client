import React, { Component } from "react";
import HeaderInfluence from "./HeaderInfluence";
import Influence from "./Influence";
import { Divider } from "semantic-ui-react";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: "",
      email: ""
    };
  }

  componentWillMount() {
    const email = JSON.parse(localStorage.getItem("email"));
    const auth = JSON.parse(localStorage.getItem("auth"));
    this.setState({
      email,
      isLogin: auth
    });
  }

  componentDidMount() {
    if (this.state.isLogin != true) {
      window.location = "#/login";
    }
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
