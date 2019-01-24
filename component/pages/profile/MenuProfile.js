import React, { Component } from "react";
import { Menu, Icon, Label, Modal, Header, Form, TextArea, Button, Dropdown, Message } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMenu: "",
      menu: localStorage.getItem("menu"),
      datas: [],
      isLoading: true,
      email: localStorage.getItem("email").slice(1, -1),
      content: "",
      tags: "",
      options: [],
      value: "null",
      seen: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/follow/notif",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }));

    axios({
      method: "post",
      url: "/api/follow/notif/count",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ seen: result.data }));

    axios({
      method: "get",
      url: "/api/tags",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result => this.setState({ options: result.data }));
  }

  componentDidMount() {
    if(this.state.email){
      this.setState({ isLoading: false });
    }
  }

  handleMenu(category) {
    this.setState(
      {
        isMenu: category
      },
      () => {
        if (this.state.isMenu === "notification") {
          axios({
            method: "put",
            url: "/api/follow/notif/seen",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            data: {
              email: this.state.email
            }
          })
        }
        localStorage.setItem("menu", this.state.isMenu);
      }
    );
  }

  generateSkeleton() {
    return (
      <div>
        <Menu
          fluid
          widths={5}
          style={{
            zIndex: 2,
            position: "fixed",
            bottom: 0
          }}
        >
          <Menu.Item name="home">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>

          <Menu.Item name="chat">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>

          <Menu.Item name="post">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>

          <Menu.Item name="Notification">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>

          <Menu.Item name="profile">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleTags = event => {
    this.setState({ value: event.target.value });
  };

  handleChange = (e, { value }) => this.setState({ value });

  publish() {
    event.preventDefault();
    var data = {
      email: this.state.email,
      content: this.state.content,
      tags: this.state.value
    };
    if(data.tags == "null"){
      console.log('user didnt choose any tag yet')
    }else if(data.content == ""){
      console.log('user didnt write any post yet')
    }else{
    fetch("/api/posting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(() => window.location.reload());
    }
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  setValue(e, data) {
    this.setState({ value: data.value });
  }

  render() {
    const { open, dimmer, isLoading, isMenu, menu, datas, options, value } = this.state;
    if (isMenu === "profile") {
      window.location = "#/profile";
    } else if (isMenu === "notification") {
      window.location = "#/notification";
    } else if (isMenu === "home") {
      window.location = "#/home";
    } else if (isMenu === "message") {
      window.location = "#/message";
    } else {
    }
    const postSize = {
      width: "1%",
      float: "left"
    };
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
            <Menu
              fluid
              widths={5}
              style={{
                zIndex: 2,
                position: "fixed",
                bottom: 0
              }}
            >
              <Menu.Item name="home" onClick={() => this.handleMenu("home")}>
                {menu === "home" ? <Icon name="clock" style={{ color: "#ED6A5E" }} size="large" /> : <Icon name="clock outline" style={{ color: "#555" }} size="large" />}
              </Menu.Item>

              <Menu.Item name="message" onClick={() => this.handleMenu("message")}>
                {menu === "message" ? (
                  <Icon name="comment alternate" style={{ color: "#ED6A5E" }} size="large" />
                ) : (
                    <Icon name="comment alternate outline" style={{ color: "#555" }} size="large" />
                  )}
              </Menu.Item>

              <Menu.Item name="post" onClick={this.show("blurring")}>
                {menu === "post" ? (
                  <Icon name="plus square" style={{ color: "#ED6A5E" }} size="large" />
                ) : (
                    <Icon name="plus square outline" style={{ color: "#555" }} size="large" />
                  )}
              </Menu.Item>

              <Menu.Item
                name="Notification"
                onClick={() => this.handleMenu("notification")}
              >
                {datas.length === 0 ? (
                  ""
                ) : this.state.seen === 0 ? (
                  ""
                ) : (
                      <Label circular size="tiny" floating color="red" key="red">
                        {this.state.seen}
                      </Label>
                    )}
                {menu === "notification" ? <Icon name="bell outline" style={{ color: "#ED6A5E" }} size="large" /> : <Icon name="bell outline" style={{ color: "#555" }} size="large" />}
              </Menu.Item>

              <Menu.Item name="profile" onClick={() => this.handleMenu("profile")}>
                {menu === "profile" ? (
                  <Icon name="user circle" style={{ color: "#ED6A5E" }} size="large" />
                ) : (
                    <Icon name="user circle outline" style={{ color: "#555" }} size="large" />
                  )}
              </Menu.Item>
            </Menu>
          )}
        <Modal dimmer={dimmer} size="large" open={open} onClose={this.close}>
          <Modal.Content>
            <Modal.Description>
              <Header as="h5">This will be great for your Followers</Header>
              <Form>
                <TextArea name="content" onChange={this.handlePost} autoHeight placeholder="What happen..."/>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <span style={postSize}>
              {
                <Dropdown
                  search
                  onChange={this.setValue.bind(this)}
                  options={options}
                  selection
                  value={value}
                />
              }
            </span>
            <Button
              style={{ background: "#87CEEB", color: "white", float: "right" }}
              icon="checkmark"
              labelPosition="right"
              content="Post"
              onClick={this.publish.bind(this)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
