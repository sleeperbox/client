/* eslint-disable react/jsx-no-undef */

import React, { Component } from "react";
import {
  Header,
  Container,
  Form,
  Divider,
  Grid,
  GridColumn,
  Image,
  Select,
  Dropdown,
  Button,
  Modal,
  Reveal,
  Icon,
  label,
  Input
} from "semantic-ui-react";
import "./Account.css";
import axios from "axios";
import InputMask from "react-input-mask";

export default class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      gender: "",
      first_name2: "",
      last_name2: "",
      phone_number2: "",
      gender2: "",
      avatar: "",
      file: null,
      reload: "0",
      option: [],
      value: [],
      tags: [],
      tags2: [],
      tags3: [],
      option_gender: [],
      modalNotification: false,
      kode: 0,
      log: [],
      clicked: 0,
      tag1: 0,
      tag2: 0,
      tag3: 0,
      tag4: 0,
      tag5: 0,
      tag6: 0,
      tag7: 0,
      tag8: 0,
      preview: ""
      // message: '3'
    };
    this.handleTags = this.handleTags.bind(this);
  }

  handleOpenNotification = () => this.setState({ modalNotification: true });

  handleCloseNotification = () =>
    setTimeout(() => {
      this.setState({ modalNotification: false });
    }, 4500);

  componentWillMount() {
    axios({
      method: "get",
      url: "https://api.aprizal.com/api/tags",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result => this.setState({ option: result.data }));

    axios({
      method: "post",
      url: "https://api.aprizal.com/api/user",
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
        tags: result.data.tags,
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        phone_number: result.data.phone_number,
        gender: result.data.jenis_kelamin,
        tags2: result.data.tags,
        first_name2: result.data.first_name,
        last_name2: result.data.last_name,
        phone_number2: result.data.phone_number,
        gender2: result.data.jenis_kelamin
      })
    );

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
    }).then(result => this.setState({ avatar: result.data }));
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.reload == "1") {
      const data = new FormData();
      data.append("avatar", this.state.file, this.state.file.name);
      data.append("email", this.state.email);

      axios.post("https://api.aprizal.com/api/upload/avatar", data);
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
      }).then(result => this.setState({ avatar: result.data, reload: "0" }));
    }
  }

  update() {
    event.preventDefault();
    var data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
      gender: this.state.gender,
      tags: this.state.log
    };
    var data2 = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
      gender: this.state.gender,
      tags: this.state.tags
    };
    if (this.state.kode == 1) {
      this.setState({ kode: 0 });
    } else {
      this.setState({ kode: 0 });
    }
    if (
      this.state.first_name != this.state.first_name2 ||
      this.state.last_name != this.state.last_name2 ||
      this.state.phone_number != this.state.phone_number2 ||
      this.state.gender != this.state.gender2 ||
      this.state.log != 0
    ) {
      if (this.state.log.length == 0) {
        fetch("https://api.aprizal.com/api/user/tags", {
          method: "PUT",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(data2)
        }).then(window.location.reload());
      } else {
        fetch("https://api.aprizal.com/api/user/tags", {
          method: "PUT",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(data)
        }).then(window.location.reload());
      }
    } else {
      this.setState({ kode: 1 });
    }
  }

  fileHandler = event => {
    if (!URL.createObjectURL(event.target.files[0])) {
      return false;
    } else {
      this.setState({
        file: event.target.files[0],
        preview: URL.createObjectURL(event.target.files[0]),
        reload: "1"
      });
    }
  };

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  setValue(e, data) {
    this.setState({ value: data.value });
  }
  setGender(e, data) {
    this.setState({ gender: data.value });
  }

  handleTags = event => {
    this.setState({ value: event.target.value });
  };

  saveTags = value => this.setState({ log: [value, ...this.state.log] });

  deleteTags(value) {
    let arr = this.state.log.filter(item => !value.includes(item));
    this.setState({ log: arr });
  }

  handleTag = value => {
    value == "computer-gadget"
      ? this.setState({ tag1: 1 })
      : value == "family-love"
      ? this.setState({ tag2: 1 })
      : value == "fact-rumour"
      ? this.setState({ tag3: 1 })
      : value == "business-work"
      ? this.setState({ tag4: 1 })
      : value == "fashion-lifestyle"
      ? this.setState({ tag5: 1 })
      : value == "quotes"
      ? this.setState({ tag6: 1 })
      : value == "riddles"
      ? this.setState({ tag7: 1 })
      : value == "other"
      ? this.setState({ tag8: 1 })
      : null;
  };

  handleClose = value => {
    value == "computer-gadget"
      ? this.setState({ tag1: 0 })
      : value == "family-love"
      ? this.setState({ tag2: 0 })
      : value == "fact-rumour"
      ? this.setState({ tag3: 0 })
      : value == "business-work"
      ? this.setState({ tag4: 0 })
      : value == "fashion-lifestyle"
      ? this.setState({ tag5: 0 })
      : value == "quotes"
      ? this.setState({ tag6: 0 })
      : value == "riddles"
      ? this.setState({ tag7: 0 })
      : value == "other"
      ? this.setState({ tag8: 0 })
      : null;
  };

  handleRemove(del) {
    this.deleteTags(del);
    this.handleClose(del);
  }

  handleClick(save) {
    this.saveTags(save);
    this.handleTag(save);
  }

  render() {
    const {
      option,
      value,
      tags,
      first_name,
      last_name,
      phone_number,
      gender,
      tag1,
      tag2,
      tag3,
      tag4,
      tag5,
      tag6,
      tag7,
      tag8
    } = this.state;
    const option_gender = [
      { icon: "mars", text: "Male", value: "Laki-laki" },
      { icon: "venus", text: "Female", value: "Perempuan" }
    ];
    const maxButton = {
      margin: "2px"
    };
    return (
      <div>
        <Header as="h3" dividing>
          Profile Setting
        </Header>
        <Container>
          <Grid verticalAlign="middle" columns={2} centered>
            <GridColumn>
              {this.state.preview === "" ? (
                <Image
                  bordered
                  size="large"
                  src={
                    "http://aprizal.com/public/avatar/" +
                    this.state.avatar
                  }
                  circular
                  centered
                  style={{ height: "120px", width: "120px" }}
                />
              ) : (
                <Image
                  bordered
                  size="large"
                  src={this.state.preview}
                  circular
                  centered
                  style={{ height: "120px", width: "120px" }}
                />
              )}

              <Form style={{ marginTop: "-30px", float: "right" }}>
                <Form.Field>
                  <div className="input-file-container">
                    <input
                      className="input-file"
                      id="my-file"
                      type="file"
                      onChange={this.fileHandler}
                    />

                    <Icon
                      bordered
                      circular
                      // style={{color: "#5b90f6"}}
                      name="camera"
                      size="big"
                      htmlFor="my-file"
                      // className="input-file-trigger"
                    />
                  </div>
                  <p className="file-return" />
                </Form.Field>
              </Form>
            </GridColumn>
          </Grid>

          <Form>
            <Form.Field>
              <label>first name</label>
              <input
                placeholder="first name"
                name="first_name"
                defaultValue={first_name}
                onChange={this.handlePost.bind(this)}
              />
              <Divider hidden />
              <label>last name</label>
              <input
                placeholder="last name"
                name="last_name"
                defaultValue={last_name}
                onChange={this.handlePost.bind(this)}
              />
              <Divider hidden />
              <label>gender</label>
              <Dropdown
                placeholder="Gender"
                style={{ position: "relative", display: "block" }}
                onChange={this.setGender.bind(this)}
                options={option_gender}
                fluid
                selection
                value={gender}
              />
              <Divider hidden />
                <label>phone number</label>
              <Input
                type="text"
                placeholder="0811xxxxxxxx"
              >
                <InputMask
                  mask="9999999999999"
                  maskChar={null}
                  name="phone_number"
                  value={phone_number == "" ? "" : phone_number}
                  onChange={this.handlePost.bind(this)}
                />
              </Input>
              <Divider hidden />
              <label>choosen tags :</label>
              <p>
                <i>{tags}</i>
              </p>

              <Divider hidden />
              {option.map((data, index) => {
                return (
                  <Button.Group
                    key={data.value}
                    widths="1"
                    size="tiny"
                    style={maxButton}
                  >
                    {tag1 == 1 && index == 0 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag2 == 1 && index == 1 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag3 == 1 && index == 2 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag4 == 1 && index == 3 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag5 == 1 && index == 4 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag6 == 1 && index == 5 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag7 == 1 && index == 6 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : tag8 == 1 && index == 7 ? (
                      <Button
                        color="blue"
                        onClick={() => this.handleRemove(data.value)}
                      >
                        {data.text}
                      </Button>
                    ) : (
                      <Button
                        basic
                        color="blue"
                        onClick={() => this.handleClick(data.value)}
                      >
                        {data.text}
                      </Button>
                    )}
                  </Button.Group>
                );
              })}

              <Modal
                trigger={
                  <Button
                    fluid
                    style={{
                      background: "#5b90f6",
                      color: "white",
                      marginTop: "10px"
                    }}
                    size="tiny"
                    onClick={this.update.bind(this)}
                  >
                    update profile
                  </Button>
                }
                open={this.state.modalOpenNotification}
                onClose={this.handleCloseNotification}
                basic
                size="small"
              >
                {this.state.kode === 1 ? (
                  <Header
                    style={{ textAlign: "center" }}
                    content="No Updated !"
                  />
                ) : (
                  <Header
                    style={{ textAlign: "center" }}
                    content="Account Updated !"
                  />
                )}
              </Modal>
            </Form.Field>
          </Form>
          <Divider hidden />
        </Container>
        <Divider hidden />
        <Divider hidden />
      </div>
    );
  }
}
