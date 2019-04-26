import React, { Component } from "react";
import {
  Header,
  Container,
  Form,
  Divider,
  Button,
  Modal,
  Icon,
  Input,
  
} from "semantic-ui-react";
import axios from 'axios'

export default class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: localStorage.getItem("username"),
      password_lama: "",
      password_baru: "",
      modalOpen: false,
      modalOpenPassword: false,
      username_: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/user",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result =>
      this.setState({
        username_: result.data.username
      })
    );
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleOpenPassword = () => this.setState({ modalOpenPassword: true });

  handleClosePassword = () => this.setState({ modalOpenPassword: false });

  handleChange() {

  }

  logout() {
    localStorage.removeItem('email')
    localStorage.removeItem('auth')
    localStorage.removeItem('menu')
    window.location='#/login';
}

  delete() {
    event.preventDefault();
    var data = {
      email: this.state.email
    };
    fetch("http://192.168.100.18:8080/api/user/delete", {
      method: "DELETE",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }).then(
      localStorage.removeItem("email"),
      localStorage.removeItem("auth"),
      localStorage.removeItem("menu"),
      (window.location = "#/login")
    );
  }

  ubahPassword() {
    event.preventDefault();
    var data = {
      email: this.state.email,
      password_lama: this.state.password_lama,
      password_baru: this.state.password_baru
    };
    fetch("http://192.168.100.18:8080api/user/ubahpassword", {
      method: "PUT",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }).then(this.setState({ modalOpenPassword: false }));
  }
  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const marginFieldPassword = {
      marginRight: "2%"
    };
    return (
      <div style={{color: "white", marginTop:"-50px"}}>
        <Header as="h3"  style={{color: "white"}} dividing>
          Account Setting
        </Header>
        <Container>
          <Divider hidden />
          <Form>
            <Form.Field>
              <label>your email</label>
              <input defaultValue={this.state.email} disabled />
            </Form.Field>
            <Form.Field>
              <label>username</label>
              <input defaultValue={this.state.username_} disabled />
            </Form.Field>

            <Modal
              trigger={<a onClick={this.handleOpenPassword} style={{float: "right"}}><i>update password</i></a>}
              open={this.state.modalOpenPassword}
              onClose={this.handleClosePassword}
              basic
              size="small"
              closeIcon
            >
              <Header content="" />
              <Modal.Content>
                <label style={marginFieldPassword}>Old Password : </label>
                <br />
                <Input
                  type="password"
                  name="password_lama"
                  onChange={this.handlePost.bind(this)}
                  icon={{name: "lock", circular: true, link: true }}
                  placeholder='type your current or last password'
                  fluid
                />
                <br />
                <br />
                <label>New Password : </label>
                <Input
                  type="password"
                  name="password_baru"
                  onChange={this.handlePost.bind(this)}
                  icon={{name: "lock", circular: true, link: true }}
                  placeholder='we recommend an unpredictable character'
                  fluid
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  basic
                  color="red"
                  onClick={this.ubahPassword.bind(this)}
                  inverted
                >
                update
                </Button>
              </Modal.Actions>
            </Modal>
          </Form>
          <br/>
          <br/>
            <div style={{marginTop: -8, position: "relative", right: 0, float: "right"}}>
                <a onClick={this.logout.bind(this)}>
                  <i>logout</i>
                </a>
            </div>
          <Divider hidden />
        </Container>
      </div>
    );
  }
}
