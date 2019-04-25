import React, { Component } from "react";
import {
  Icon,
  Menu,
  Header,
  Container,
  Grid,
  TextArea,
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
      email: localStorage.getItem("email").slice(1, -1),
      kode_post: 1
    };
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    axios({
      method: "get",
      url: "http://192.168.100.18:8080/api/tags",
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
        url: "http://192.168.100.18:8080/api/posting",
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
      })
        .then(result => console.log(result))
        .then(() => window.location = "#/profile");
    } else {
      const data = new FormData();
      data.append("fotocontent", this.state.file, this.state.file.name);
      data.append("email", this.state.email);
      data.append("content", this.state.content);
      data.append("tags", this.state.value);
      data.append("kode_post", this.state.kode_post);

      axios
        .post("http://192.168.100.18:8080/api/posting", data)
        .then(() => console.log(this.state.file))
        .then(() => window.location = "#/profile");
    }
  }

  render() {
    const { options, value, content } = this.state;
    return (
      <div>
        <Menu borderless size="small">
          <Menu.Item name="back">
            <Icon onClick={this.back.bind(this)} name="arrow left" />
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
              ) : (
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
          widths={2}
          style={{
            zIndex: 2,
            position: "fixed",
            bottom: 0
          }}
        >
          <Menu.Item name="button" style={{ left: 65 }}>
            <i style={{marginRight: 12}}>category</i>
            <Dropdown
              onChange={this.setValue.bind(this)}
              options={options}
              value={value}
              selection
              style={{ minWidth: "17em" }}
            />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item style={{ right: 15 }}>
              <div className="input-file-container">
                <input
                  className="input-file"
                  id="my-file"
                  type="file"
                  onChange={this.fileHandler}
                />
                <Icon name="picture" size="large" htmlFor="my-file" />
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
