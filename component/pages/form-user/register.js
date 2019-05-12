import React, { Component } from "react";
import store from '../../../store';
import { emailAction, passwordAction, usernameAction, firstnameAction, lastnameAction } from '../actions';
import {
  Button,
  Form,
  Container,
  Grid,
  Divider,
  Image,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: '',
      warning: null
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.setState({
      isLogin: localStorage.getItem("auth")
    });
  }

  componentDidMount() {
    const { isLogin } = this.state;
    isLogin === "true" ? (window.location = "#/profile") : null;
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin || newState.warning) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === true) {
      localStorage.setItem("email", store.getState().form.email.toString().toLowerCase());
      localStorage.setItem("auth", this.state.isLogin);
      window.location = "#/profile";
    }
  }

  handleChangeEmail(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(emailAction(value))
  }

  handleChangeUsername(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(usernameAction(value))
  }

  handleChangePassword(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(passwordAction(value))
  }

  handleChangeFirstname(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(firstnameAction(value))
  }

  handleChangeLastname(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(lastnameAction(value))
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://apps.aprizal.com/api/register",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: store.getState().form.email.toString().toLowerCase(),
        username: store.getState().form.username.toString().toLowerCase(),
        first_name: store.getState().form.first_name.toString().toLowerCase(),
        last_name: store.getState().form.last_name.toString().toLowerCase(),
        password: store.getState().form.password
      }
    }).then(result =>
      this.setState({
        warning: result.data,
        isLogin: result.data.auth,
        token: result.data.token
      })
    );
  }

  render() {
    const { warning } = this.state;
    const areaRegisterButtonResponsive = {
      padding: "1%"
    };
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "#5b90f6"
      }}  >
        <Container>
          <Divider hidden />
          {warning == 1 ? (
            <Message negative>
              <center>Username/Email Has Been Used !</center>
            </Message>
          ) : null}
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            columns={1}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Divider hidden />
              <div style={{ textAlign: "center", fontSize: 22, color: "#222" }}>
                <Image src="http://aprizal.com/public/icon/icon/fashion.png" size="tiny" centered />
                <p style={{ marginTop: -15 }}>enjoy your way</p>
              </div>
              <Divider hidden />
              <Form size="small" onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-Mail Address"
                  name="email"
                  type="email"
                  onChange={this.handleChangeEmail}
                />
                <Form.Input
                  fluid
                  icon="user circle outline"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChangeUsername}
                />
                <Form.Input
                  fluid
                  icon="pencil alternate"
                  iconPosition="left"
                  placeholder="First name"
                  name="first_name"
                  onChange={this.handleChangeFirstname}
                />
                <Form.Input
                  fluid
                  icon="pencil alternate"
                  iconPosition="left"
                  placeholder="Last name"
                  name="last_name"
                  onChange={this.handleChangeLastname}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChangePassword}
                />
                <Button fluid size="small" style={{ background: "#222", color: "#fff" }}>
                  Sign Up
                  </Button>
              </Form>
              <br />
              <span style={{ background: "transparent", border: "none", color: "#fff" }}>
                already signed up? <a href="#/login" style={{color: "#fff"}}><u>sign in here instead</u></a>
                <Divider hidden style={{marginTop: -10}}/>
                <small style={{ color: "#fff" }}>app version 2.7</small>
              </span>
            </Grid.Column></Grid>
        </Container>
      </div>
    );
  }
}
