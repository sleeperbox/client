import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Divider,
  Header,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import axios from "axios";
import queryString from "query-string";
import { emailAction, passwordAction, tipeAction } from '../actions';
import store from '../../../store';
import { LocalInstance } from "twilio/lib/rest/api/v2010/account/availablePhoneNumber/local";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem('auth'),
      kode: 0,
      warning: null
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ShowHide = this.ShowHide.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      axios({
        method: "GET",
        url: 'https://www.googleapis.com/plus/v1/people/me?access_token=' + query.token,
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        }})
      .then(response => {
        var opt = {
          email: response.data.emails[0].value,
          username: response.data.name.givenName,
          first_name: response.data.name.givenName,
          last_name: response.data.name.familyName,
          password: "123"
        }
        axios({
          method: "POST",
          url: "http://apps.aprizal.com/api/register",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: opt
        }).then(() => {
            localStorage.setItem('email',response.data.emails[0].value)
            localStorage.setItem('auth', "true")
            window.location = "/#/profile"
        }
        ).catch(err => console.log(err))
      }
      )
    }
  }

  componentDidMount() {
    const { isLogin } = this.state;
    isLogin === "true"
      ? (window.location = "#/profile")
      : null;
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin || newState.warning || newState.kode ) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin == true) {
      window.location = "#/profile";
    }else if(this.state.kode == 1){
      this.setState({ kode : 0})
    }
  }

  handleChangeEmail(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(emailAction(value))
  }

  handleChangePassword(event) {
    let target = event.target;
    let value = target.value;
    store.dispatch(passwordAction(value))
  }

  ShowHide(event){
    event.preventDefault();
    event.stopPropagation();
    if(store.getState().form.tipe == "password"){
      store.dispatch(tipeAction('text'))
      this.setState({kode: 1})
    }else{
        store.dispatch(tipeAction('password'))
        this.setState({kode: 1})
    }  
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://apps.aprizal.com/api/login",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: store.getState().form.email,
        password: store.getState().form.password
      }
    }).then(result => {
        this.setState({ warning:result.data, kode: 1, isLogin: result.data.auth})
        window.localStorage.setItem('email', result.data.email)
        window.localStorage.setItem('auth', result.data.auth)
        window.localStorage.setItem('username', result.data.username)
        window.localStorage.setItem('phone', result.data.phone_number)
        
    });
  }

  googleSignin() {
    window.location = "http://apps.aprizal.com/api/auth/google"
  }

  render() {
    const { warning } = this.state;
    return (
      <div>
        <Container>
          <Divider hidden />
          {warning == 1 ? (
            <Message negative style={{marginBottom: "-3em", marginTop: "1em"}}>
              <center>Your Input is Wrong !</center>
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
                <i>enjoy your WAY!</i>
              </Header>
              <Divider hidden/>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Email, Phone Number or Username"
                    name="email"
                    onChange={this.handleChangeEmail}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type={store.getState().form.tipe}
                    name="password"
                    onChange={this.handleChangePassword}
                    action={{ icon:"eye", onClick:this.ShowHide}}
                    />
                  
                  <Button color="blue" fluid size="large">
                    Log In
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Message>                
                New to Way ? <a href="#/register"><i>Sign Up Here !</i></a>
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
          <Segment textAlign="center">
            <i>app version 2.0</i>
          </Segment>
        </Container>
      </div>
    );
  }
}
