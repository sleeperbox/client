import React, { Component } from "react";
import {
  Icon,
  Menu,
  Loader,
  Grid,
  Modal,
  Form,
  Button,
  Dropdown,
  Image,
  Message
} from "semantic-ui-react";
import axios from "axios";

export default class Posting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      file: null,
      preview: null,
      content: "",
      tags: "",
      value: "null",
      tag: 0,
      post: 0,
      email: localStorage.getItem("email"),
      kode_post: 1,
      open: false,
      isLoading: false,
      directing: false
    };
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    axios({
      method: "get",
      url: "http://apps.aprizal.com/api/tags",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result => this.setState({ options: result.data }));
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("auth");
    window.location = "#/login";
  }

  back() {
    window.location = "#/profile";
    localStorage.setItem("menu", "profile");
  }

  backConfirmation() {
    return <Modal basic size='small' open={this.state.open}>
    <Modal.Content>
      <p>
       Are you sure wanna cancel this post?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic inverted onClick={()=>this.back()}>
        Yes
      </Button>
      <Button inverted onClick={() => this.handleBackClose()}>
        No
      </Button>
    </Modal.Actions>
  </Modal>
  }
  
  handleBack() {
    this.setState({open: true})
  }
  handleBackClose() {
    this.setState({open: false})
  }

  setValue(e, data) {
    this.setState({ value: data.value });
  }

  fileHandler = event => {
    this.setState({
      file: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0])
    });
  };

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  publish() {
    this.setState({
      isLoading: true
    })
    event.preventDefault();
    var data = {
      email: this.state.email,
      content: this.state.content,
      tags: this.state.value
    };
    if (data.tags == "null") {
      this.setState({ tag: 1, post: 0 });
    } else if (data.content == "") {
      this.setState({ tag: 0, post: 1 });
    } else if (this.state.file == null) {
      axios({
        method: "post",
        url: "http://apps.aprizal.com/api/posting",
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
      }).then(() => window.location = "#/profile");
    } else {
      const data = new FormData();
      data.append("fotocontent", this.state.file, this.state.file.name);
      data.append("email", this.state.email);
      data.append("content", this.state.content);
      data.append("tags", this.state.value);
      data.append("kode_post", this.state.kode_post);
      axios({
        method: "post",
        url: "http://apps.aprizal.com/api/posting",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: data
      }).then(() => this.setState({isLoading: false, directing: true}));
    }
  }

  render() {
    const {open, options, value, content, isLoading, directing } = this.state;
    return (
      <div>
        {directing ? window.location.href = "#/profile" : null}
        {open ? this.backConfirmation() : null}
        <Menu borderless size="small">
          <Menu.Item name="back">
            <Icon onClick={() => this.handleBack()} name="arrow left" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              {content == "" ? (
                <Button
                  disabled
                  secondary
                  icon="checkmark"
                  labelPosition="right"
                  content="Post"
                  style={{ background: "#5b90f6" }}
                />
              ) : isLoading ? 
              <Button loading secondary style={{ background: "#5b90f6" }} >&nbsp;-Loading&nbsp;&nbsp;</Button>
              : (
                <Button
                  secondary
                  icon="checkmark"
                  labelPosition="right"
                  content="Post"
                  style={{ background: "#5b90f6" }}
                  onClick={this.publish.bind(this)}
                />
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid.Row columns={1}>
          <Grid.Column>
            {this.state.tag == 1 ? (
              <i>
                <Message
                  error
                  icon="warning circle"
                  header="Anda Belum Memilih Tag"
                  size="mini"
                />
              </i>
            ) : this.state.post == 1 ? (
              <i>
                <Message
                  icon="warning circle"
                  error
                  header="Konten Tidak Boleh Kosong"
                  size="mini"
                />
              </i>
            ) : null}
            <Form>
              <textarea
                maxLength={250}
                name="content"
                onChange={this.handlePost}
                placeholder="What happen..."
                style={{ border: "none" }}
              />
            </Form>
            <br />{" "}
            {this.state.foto_posting === null
              ? null
              : this.state.foto_posting !== null
              ? this.state.posting
              : null}
            {this.state.foto_posting === null ? null : this.state
                .foto_posting !== null ? (
              <Image src={this.state.preview} size="medium" centered />
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Menu
          borderless
          size="small"
          widths={3}
          style={{
            zIndex: 2,
            position: "fixed",
            bottom: 0
          }}
        >
         <Menu.Item style={{ minWidth: "65px", width: "75px", maxWidth: "100px" }} >
            <i style={{marginLeft: 15, marginRight: 15 }}>category</i>
          </Menu.Item>
          <Menu.Item name="button" style={{ minWidth: "180px", width: "215px", maxWidth: "500px" }}>
            <Dropdown
              onChange={this.setValue.bind(this)}
              options={options}
              value={value}
              selection
              style={{ width: "100%" }}
            />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item style={{ minWidth: "35px"}}>
              <div className="input-file-container">
                <input
                  className="input-file"
                  id="my-file"
                  type="file"
                  onChange={this.fileHandler}
                />
                <Icon name="picture" size="large" htmlFor="my-file" style={{marginLeft: 15, marginRight: 15 }} />
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
