import React, { Component } from "react";
import store from '../../../store';
import {
  Button,
  Form,
  Container,
  Grid,
  Label,
  Flag,
  Divider,
  Header,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import axios from "axios";
import { emailAction, } from '../actions';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      isLogin: "",
      warning: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    store.dispatch(emailAction('email@hore'))
    console.log(store.getState())
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

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === true) {
      localStorage.setItem("email", JSON.stringify(this.state.email));
      localStorage.setItem("auth", JSON.stringify(this.state.isLogin));
      window.location = "#/profile";
    }
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/api/register",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password
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
    const registerButtonResponsive = {
      width: "47%"
    };
    return (
      <div>
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
            <Grid.Column style={{ maxWidth: 450 }}>
              <Divider hidden />
              <Header as="h3">
                <Icon name="file alternate outline" size="large" />
                Create your Account
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-Mail Address"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="user circle outline"
                    iconPosition="left"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="pencil alternate"
                    iconPosition="left"
                    placeholder="First name"
                    name="first_name"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="pencil alternate"
                    iconPosition="left"
                    placeholder="Last name"
                    name="last_name"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <Button color="blue" fluid size="large">
                    Daftar
                  </Button>
                </Segment>
              </Form>
              <Message attached="bottom" warning>
                Already signed up?&nbsp;<a href="#/login">Login Here</a>
                &nbsp;instead.
              </Message>
            </Grid.Column>
            <Grid.Column
              verticalAlign="middle"
              style={areaRegisterButtonResponsive}
            >
            </Grid.Column>
          </Grid>
          <Divider />
          <Segment textAlign="center">
            <i>app version 1.5</i>
          </Segment>
        </Container>
      </div>
    );
  }
}
