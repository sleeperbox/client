import React, { Component } from "react";
import {
  Container,
  Grid,
  Divider,
  List,
  Icon,
  Header,
  Statistic,
  Label,
  TextArea,
  Button,
  Input,
  Image
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderMessagePrivate from "./HeaderMessagePrivate";
import "./style.css";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      datas: [],
      data_name: [],
      username_user1: window.location.href.split("=")[1],
      username_user2: "",
      isLogin: "",
      pesan: "",
      data_message: "",
      isLoading: true,
      tombol: 0,
      kode: 0
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  addButtom() {
    this.setState({ tombol: 1 });
  }

  delButtom() {
    this.setState({ tombol: 0 });
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/detail/message",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username_user1: this.state.username_user1
      }
    }).then(result => this.setState({ datas: result.data }));
    this.setState({
      isLogin: localStorage.getItem("auth")
    });

    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/read/message",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username_user1: this.state.username_user1
      }
    });

    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/message/head",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username_user1
      }
    }).then(result => this.setState({ data_name: result.data }));
  }

  componentDidMount() {}

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.kode == 1) {
      axios({
        method: "post",
        url: "http://apps.aprizal.com/api/detail/message",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: this.state.email,
          username_user1: this.state.username_user1
        }
      }).then(result =>
        this.setState({ datas: result.data, kode: 0, pesan: "" })
      );
    }
  }

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  message() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/send/message",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username_user2: this.state.username_user1,
        message: this.state.pesan
      }
    }).then(() => this.setState({ kode: 1 }));
  }

  generateSkeleton() {
    const { datas } = this.state;
    return (
      <div style={{ marginBottom: 45 }}>
        <Container>
          <Divider hidden />
          <Skeleton width="100%">
            <Header as="h2" textAlign="center" />
          </Skeleton>
          <Divider />
          {datas.map(data => {
            return (
              <Grid columns={1} key={data._id}>
                <Grid.Column>
                  <List verticalAlign="middle">
                    <List.Item>
                      <List.Content>
                        <List.Header>
                          <Skeleton />
                        </List.Header>
                        <p>
                          <Skeleton />
                        </p>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column verticalAlign="middle">
                  <Skeleton />
                </Grid.Column>
              </Grid>
            );
          })}
        </Container>
      </div>
    );
  }

  generateZeroData() {
    const divConten = {
      marginTop: "65%",
      marginBottom: "60%"
    };
    return (
      <div style={divConten}>
        <Header as="h5" icon textAlign="center">
          <Icon name="bell slash outline" />
          <Header.Content>
            <Statistic>
              <Statistic.Label>
                <i>You Have No Message</i>
              </Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas, tombol } = this.state;
    return (
      <div style={{ marginBottom: 45 }}>
        <HeaderMessagePrivate />
        <Divider hidden />
        <Divider hidden />
        {datas.length === 0 ? (
          this.generateZeroData()
        ) : (
          <Container>
            <Divider hidden />
            <Header as="h4" textAlign="center">
              <Image
                size="tiny"
                circular
                src={
                  "http://aprizal.com/public/avatar/" +
                  this.state.data_name.foto
                }
                style={{ width: "15%" }}
              />
              <Icon />
              {this.state.data_name.first_name +
                " " +
                this.state.data_name.last_name}
              <br />
              <Label size="small" style={{ backgroundColor: "transparent" }}>
                <i>{"@" + this.state.data_name.username}</i>
              </Label>
            </Header>
            <Divider />
            {datas.map(data => {
              return (
                <Grid columns={1} key={data._id}>
                  <Grid.Column>
                    <List verticalAlign="middle">
                      {data.username_user1 === this.state.username_user1 ? (
                        <List.Item style={{ float: "left" }}>
                          <List.Content>
                            <Label
                              size="large"
                              style={{
                                backgroundColor: "#DD4B39",
                                color: "#f7f7f7",
                                fontWeight: "100"
                              }}
                              circular
                            >
                              {data.message}
                            </Label>
                            <br />
                            <Label
                              size="small"
                              style={{
                                backgroundColor: "transparent",
                                float: "left"
                              }}
                            >
                              {data.date.slice(0, 10)}
                            </Label>
                          </List.Content>
                        </List.Item>
                      ) : (
                        <List.Item style={{ float: "right" }}>
                          <List.Content style={{ float: "right" }}>
                            <Label
                              size="small"
                              style={{ backgroundColor: "transparent" }}
                            />
                            <Label
                              style={{
                                float: "right",
                                backgroundColor: "#00ACEE",
                                color: "#f7f7f7",
                                fontWeight: "100"
                              }}
                              size="large"
                              circular
                            >
                              {data.message}
                            </Label>
                            <br />
                            {data.status === "Send" ? (
                              <Label
                                size="small"
                                style={{
                                  backgroundColor: "transparent",
                                  float: "right"
                                }}
                              >
                                {data.date.slice(0, 10)}
                                <Icon />
                                <Icon name="envelope open outline" />
                                <i>{data.status}</i>
                              </Label>
                            ) : (
                              <Label
                                size="small"
                                style={{
                                  backgroundColor: "transparent",
                                  float: "right"
                                }}
                              >
                                {data.date.slice(1, 10)}
                                <Icon />
                                <Icon
                                  name="envelope open outline"
                                  color="blue"
                                />
                                <i>{data.status}</i>
                              </Label>
                            )}
                          </List.Content>
                        </List.Item>
                      )}
                    </List>
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
        )}
        {tombol == 0 ? (
          <Button
            onClick={this.addButtom.bind(this)}
            icon="plus circle"
            style={{
              zIndex: 9,
              position: "fixed",
              bottom: 52,
              left: 2,
              background: "#5b90f6",
              color: "#fff"
            }}
          />
        ) : (
          <Button.Group
            icon
            style={{
              zIndex: 9,
              position: "fixed",
              bottom: 52,
              left: 2,
              background: "#5b90f6",
              color: "#fff"
            }}
          >
            <Button style={{ background: "#5b90f6", color: "#fff" }}>
              <Icon name="camera" />
            </Button>
            <Button style={{ background: "#5b90f6", color: "#fff" }}>
              <Icon name="file image" />
            </Button>
            <Button
              style={{ background: "#5b90f6", color: "#fff" }}
              onClick={this.delButtom.bind(this)}
            >
              <Icon name="close" />
            </Button>
          </Button.Group>
        )}
        <textarea
          className="type-input"
          value={this.state.pesan}
          style={{
            left: 0,
            bottom: 0,
            position: "fixed",
            zIndex: 8,
            width: "100%",
            background: "#fff",
            border: "2px solid #999",
            borderRadius: 5,
            height: "50px"
          }}
          name="pesan"
          onChange={this.handlePost}
          placeholder=' Write a message..'
          required
        />
        <Button
          circular
          onClick={this.message.bind(this)}
          style={{
            zIndex: 9,
            position: "fixed",
            bottom: 8,
            right: 5,
            color: "#fff",
            background: "#5b90f6"
          }}
          icon="paper plane outline"
        />
      </div>
    );
  }
}
