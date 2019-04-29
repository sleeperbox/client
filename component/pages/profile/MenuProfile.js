import React, { Component } from "react";
import { Menu, Icon, Label, Modal, Header, Form, TextArea, Button, Dropdown, Message, Image } from "semantic-ui-react";
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
      email: localStorage.getItem("email"),
      content: "",
      tags: "",
      file: null,
      foto: "",
      options: [],
      value: "null",
      seen: 0,
      seen_comment: 0,
      notif: "",
      tag: 0,
      post: 0,
      preview: null,
      kode_post: 1
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "https://api.aprizal.com/api/user/avatar",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ foto: result.data[0].avatar }));

    axios({
      method: "post",
      url: "https://api.aprizal.com/api/follow/notif",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }, ()=>console.log(result)));

    // axios({
    //   method: "post",
    //   url: "https://api.aprizal.com/api/follow/notif/count",
    //   headers: {
    //     "Acces-Control-Allow-Origin": true,
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   data: {
    //     email: this.state.email // This is the body part
    //   }
    // }).then(result => this.setState({ seen: result.data }));

    // axios({
    //   method: "post",
    //   url: "https://api.aprizal.com/api/notif/comment",
    //   headers: {
    //     "Acces-Control-Allow-Origin": true,
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   data: {
    //     email: this.state.email // This is the body part
    //   }
    // }).then(result => this.setState({ seen_comment: result.data }));

    // axios({
    //   method: "post",
    //   url: "https://api.aprizal.com/api/notif/message",
    //   headers: {
    //     "Acces-Control-Allow-Origin": true,
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   data: {
    //     email: this.state.email // This is the body part
    //   }
    // }).then(result => this.setState({ message: result.data}));

    // axios({
    //   method: "get",
    //   url: "https://api.aprizal.com/api/tags",
    //   headers: {
    //     "Acces-Control-Allow-Origin": true,
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   }
    // }).then(result => this.setState({ options: result.data }));

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
            url: "https://api.aprizal.com/api/follow/notif/seen",
            headers: {
              "Acces-Control-Allow-Origin": true,
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            data: {
              email: this.state.email
            }
          })
          axios({
            method: "put",
            url: "https://api.aprizal.com/api/notif/comment/seen",
            headers: {
              "Acces-Control-Allow-Origin": true,
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

  fileHandler = event => {
    this.setState({
      file: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0])
    });
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
      this.setState({tag : 1, post : 0})
    }else if(data.content == ""){
      this.setState({tag : 0, post : 1})
    }else if (this.state.file == null) {
      axios({
        method: "post",
        url: "https://api.aprizal.com/api/posting",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: this.state.email,
          content: this.state.content,
          tags: this.state.value,
          kode_post: 0
        }
      }).then((result) => console.log(result)).then(() => window.location.reload());
      }else{
        const data = new FormData();
        data.append("fotocontent", this.state.file, this.state.file.name);
        data.append("email", this.state.email);
        data.append("content", this.state.content);
        data.append("tags", this.state.value);
        data.append("kode_post", this.state.kode_post);
  
        axios.post("https://api.aprizal.com/api/posting", data).then(() => console.log(this.state.file)).then(() => window.location.reload());
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
    } else if (isMenu === "posting") {
      window.location = "#/posting";
    } else {
    }
    const postSize = {
      width: "1%",
      float: "left"
    };
    const labelNotif = {
      width: "40%",
      marginTop: "-20%",
      marginLeft: "25%"
    }
    let notification = this.state.seen + this.state.seen_comment
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
                {menu === "home" ? <Icon name="clock" style={{ color: "#5b90f6" }} size="large" /> : <Icon name="clock outline" style={{ color: "#555" }} size="large" />}
              </Menu.Item>

              <Menu.Item name="message" onClick={() => this.handleMenu("message")}>
                {this.state.message === 0 && menu === "message" ? (<Icon name="comment alternate" style={{ color: "#5b90f6" }} size="large" />) : this.state.message !== 0 && menu === "message" ? <Icon name="comment alternate" style={{ color: "#5b90f6" }} size="large" ><Label circular size="tiny" color="red" key="red" style={labelNotif} attached="top" pointing="below">
                    {this.state.message}
                  </Label></Icon> : this.state.message === 0 && menu !== "message" ? (<Icon name="comment alternate outline" style={{ color: "#555" }} size="large" />) : this.state.message !== 0 && menu !== "message" ? <Icon name="comment alternate outline" style={{ color: "#555" }} size="large" ><Label circular size="tiny" color="red" key="red" style={labelNotif} attached="top" pointing="below">
                    {this.state.message}
                  </Label></Icon> : null }
              </Menu.Item>

              <Menu.Item name="post" onClick={() => this.handleMenu("posting")}>
              &nbsp;
                <div>
                  <Icon name="plus square outline" size="large" style={{ color: "#555" }} />
                </div>
              </Menu.Item>

              <Menu.Item
                name="Notification"
                onClick={() => this.handleMenu("notification")}
              >
                {datas.length === 0 ? (
                  ""
                ) : notification === 0 ? (
                  ""
                ) : (

                  <Icon name="bell outline" style={{ color: "#5b90f6" }} size="large" ><Label circular size="tiny" color="red" key="red" style={labelNotif} attached="top" pointing="below">
                    {notification}
                  </Label></Icon>
                )}
                {menu === "notification" ? (<Icon name="bell outline" style={{ color: "#5b90f6" }} size="large" />) : notification === 0 ? (<Icon name="bell outline" style={{ color: "#555" }} size="large" />) : ""}

              </Menu.Item>

              <Menu.Item name="profile" onClick={() => this.handleMenu("profile")}>
                {menu === "profile" ? (
                  <Image
                  size="small"
                  circular
                  src={"http://aprizal.com/public/avatar/" + this.state.foto}
                  style={{width:"30px", height:"30px"}}
                  />
                ) : (
                  <Image
                  size="small"
                  circular
                  src={"http://aprizal.com/public/avatar/" + this.state.foto}
                  style={{width:"30px", height:"30px"}}
                  />
                  )}
              </Menu.Item>
            </Menu>
          )}
        <Modal dimmer={dimmer} size="large" open={open} onClose={this.close}>
          <Modal.Content>
            <Modal.Description>
              {this.state.tag == 1 ? 
              <i><Message error icon="warning circle" header='Anda Belum Memilih Tag' size="mini"/></i>
              : this.state.post == 1 ?
              <i><Message icon="warning circle" error header='Konten Tidak Boleh Kosong' size="mini"/></i> : null}
              <Header as="h5">This will be great for your Followers</Header>
              <Form>
                <TextArea maxLength={250} name="content" onChange={this.handlePost} autoHeight placeholder="What happen..." />
                <br />
                <div className="input-file-container">
                  <input className="input-file" id="my-file" type="file" onChange={this.fileHandler}/>
                  <Icon bordered name='attach' size='large' htmlFor="my-file" />
                  <br /> { this.state.foto_posting === null ? null : this.state.foto_posting !== null ? this.state.posting : null }
                  { this.state.foto_posting === null ? null : this.state.foto_posting !== null ? <Image
                        src={this.state.preview}
                        size="tiny"
                      /> : null }
                </div>
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
              secondary
              icon="checkmark"
              labelPosition="right"
              content="Post"
              style={{background:"#5b90f6"}}
              onClick={this.publish.bind(this)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}