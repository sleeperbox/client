import React, { Component } from "react";
import {
  Header,
  Container,
  Form,
  Divider,
  Button,
  Modal,
  Icon,
  Input
} from "semantic-ui-react";

export default class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: localStorage.getItem("username"),
      password_lama: "",
      password_baru: "",
      modalOpen: false,
      modalOpenPassword: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleOpenPassword = () => this.setState({ modalOpenPassword: true });

  handleClosePassword = () => this.setState({ modalOpenPassword: false });

  handleChange() {

  }

  delete() {
    event.preventDefault();
    var data = {
      email: this.state.email
    };
    fetch("/api/user/delete", {
      method: "DELETE",
      headers: {
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
    fetch("/api/user/ubahpassword", {
      method: "PUT",
      headers: {
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
      <div style={{color: "white"}}>
        <Header as="h3"  style={{color: "white"}} dividing>
          Account Setting
        </Header>
        <Container>
          <Divider hidden />
          <Form>
            <Form.Field>
              <label style={{color: "white"}}>Your Email</label>
              <input defaultValue={this.state.email} disabled />
            </Form.Field>
            <Form.Field>
              <label style={{color: "white"}}>Username</label>
              <input defaultValue={this.state.username} disabled />
            </Form.Field>

            <Modal
              trigger={<a onClick={this.handleOpenPassword} style={{color: "white"}}><i>Change Password</i></a>}
              open={this.state.modalOpenPassword}
              onClose={this.handleClosePassword}
              basic
              size="small"
              closeIcon
            >
              <Header icon="exchange" content="Change Password" />
              <Modal.Content>
                <label style={marginFieldPassword}>Old Password : </label>
                <Input
                  type="password"
                  name="password_lama"
                  onChange={this.handlePost.bind(this)}
                  icon={{name: "lock", circular: true, link: true }}
                  placeholder="Old Password"
                />
                <br />
                <br />
                <label>New Password : </label>
                <Input
                  type="password"
                  name="password_baru"
                  onChange={this.handlePost.bind(this)}
                  icon={{name: "lock", circular: true, link: true }}
                  placeholder="New Password"
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  basic
                  color="red"
                  onClick={this.ubahPassword.bind(this)}
                  inverted
                >
                  <Icon name="checkmark" /> Change Password
                </Button>
              </Modal.Actions>
            </Modal>
          </Form>
          <br />
          <Modal
            trigger={<a onClick={this.handleOpen} style={{color: "white"}}><i>Self Destroy</i></a>}
            open
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header icon="trash" content="Delete Account!" />
            <Modal.Content>
              <p>Are You Sure?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="remove" /> No
              </Button>
              <Button color="yellow" inverted onClick={this.delete.bind(this)}>
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
          <Divider hidden />
        </Container>
      </div>
    );
  }
}
