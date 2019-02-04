import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Divider,
  Header,
  Modal,
  Input,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import axios from "axios";
import queryString from "query-string";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
      token: "",
      warning: null,
      ResetPassword: false,
      notifEmail: false 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleOpenResetPassword = () => this.setState({ ResetPassword: true }, () => console.log("open: ", this.state.ResetPassword));

  handleCloseResetPassword = () => this.setState({ ResetPassword: false, notifEmail: false }, () => console.log("close: ", this.state.ResetPassword,  this.state.notifEmail));

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      axios.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + query.token)
      .then(response => {
        localStorage.setItem('email', JSON.stringify(response.data.emails[0].value))
        localStorage.setItem('auth', true)
        axios({
          method: "POST",
          url: "/api/register",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: {
            email: response.data.emails[0].value,
            username: response.data.name.givenName,
            first_name: response.data.name.givenName,
            last_name: response.data.name.familyName,
            password: "123"
          }
        }).then(window.location = "/#/profile");
      }
      )
    }
    this.setState(
      {
        isLogin: localStorage.getItem("auth")
      }
    );
  }

  componentDidMount() {
    const { isLogin } = this.state;
    isLogin === "true"
      ? (window.location = "#/profile")
      : null;
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
    if (isLogin == true) {
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
      url: "/api/login",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
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

  sendEmail(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    })
  }

  resetPassword() {
    event.preventDefault()
    this.setState({notifEmail: true} , () => console.log("notif: ", this.state.notifEmail))
  }

  googleSignin() {
    window.location = "/api/auth/google"
  }

  render() {
    const { warning } = this.state;
    return (
      <div>
        <Container>
          <Divider hidden />
          {warning == 1 ? (
            <Message negative>
              <center>Email/Password is Wrong !</center>
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
              <Divider hidden />
              <Header as="h1" color="orange">
                <i>enjoy your Way!</i>
              </Header>
              <Divider hidden/>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-Mail Address"
                    name="email"
                    type="email"
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
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Message>                
                New to Way ? <a href="#/register"><i>Sign Up Here !</i></a>
                <br/>
                <br/>
                <Modal
              trigger={<a onClick={this.handleOpenResetPassword}><i>Forget Password</i></a>}
              defaultOpen={false}
              onClose={this.handleCloseResetPassword}
              basic
              size="small"
              >
                <Modal.Content>
                  <label>Retype your email</label>
                  <br/>
                  <br/>
                  <Input
                    type="email"
                    name="reset_password"
                    onChange={this.sendEmail.bind(this)}
                    placeholder="your email..."
                    fluid
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    primary
                    onClick={this.resetPassword.bind(this)}
                  >
                    <Icon name="envelope outline" /> Send Request
                  </Button>
                </Modal.Actions>
            </Modal>
                <Divider horizontal>Or</Divider>
                <Button
                  onClick={this.googleSignin.bind(this)}
                  content="Sign in with Google"
                  color="google plus"
                  icon="google"
                  size="small"
                  fluid
                />
              </Message>
            </Grid.Column>
          </Grid>
          <Divider hidden/>
          <Segment textAlign="center" basic>
            <i>app version 1.5</i>
          </Segment>
        </Container>
      </div>
    );
  }
}
