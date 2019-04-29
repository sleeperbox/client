import React, { Component } from "react";
import {
  Container,
  Grid,
  Divider,
  Image,
  List,
  Header,
  Button,
  Modal,
  Input,
  Statistic,
  Icon,
  Label
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";
import reputation from "./../../../../../../assets/images/icon/reputation2.png";

export default class allPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      datas: [],
      isLogin: "",
      isLogin: localStorage.getItem("auth"),
      friendship: [],
      isLoading: true,
      email_friend: "",
      open: false,
      fotos: "",
      allfoto: [],
      cari: "",
      kode: 0,
      rank: null,
      total_influence: null,
      total_thank: null
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.66:8080/api/friend",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: "test2@gmail.com" // This is the body part
      }
    }).then(result =>
      this.setState({ datas: JSON.parse(result.data.user), allfoto: JSON.parse(result.data.foto), isLoading: false }, console.log(result))
    );
  }

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
        url: "http://192.168.100.66:8080/api/search",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          username: this.state.cari,
          email: this.state.email
        }
      }).then(result => this.setState({ datas: result.data, kode: 0 }));
    }
    const { isLogin } = this.state;
    if (isLogin === false) {
      window.location = "#/login";
    }
  }

  getReputationName() {
    const { total_influence, total_thank } = this.state;
    const total = (total_influence + 1) * (total_thank + 1) * 10;
    if (total >= 0 && total < 1000) {
      return "Baby Born ";
    } else if (total >= 1000 && total < 3500) {
      return "Settle Down ";
    } else if (total >= 3500 && total < 7500) {
      return "Familliar ";
    } else if (total >= 7500 && total < 15000) {
      return "Almost Huge ";
    } else if (total >= 15000 && total < 20000) {
      return "Way Of Glory ";
    } else if (total >= 20000 && total < 50000) {
      return "Geek Explorer ";
    } else if (total >= 50000 && total < 50000) {
      return "Masterpiece ";
    } else if (total > 100000) {
      return "Enough ";
    } else {
      return "what???";
    }
  }

  handleClick(value) {
    this.setState({ email_friend: value, dimmer: "blurring", open: true }, () =>
      axios({
        method: "post",
        url: "http://192.168.100.66:8080/api/user/avatar",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: value
        } // This is the body part
      }).then(result => this.setState({ fotos: result.data }))
    );

    axios({
      method: "post",
      url: "http://192.168.100.66:8080/api/user",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: value
      } // This is the body part
    }).then(result =>
      this.setState({
        friendship: result.data,
        total_influence: result.data.total_friends,
        total_thank: result.data.total_thanks
      })
    );

    axios({
      method: "post",
      url: "http://192.168.100.66:8080/api/user/rank",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: value
      }
    }).then(result => this.setState({ rank: result.data[0].rank + 1 }));
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
              <Grid columns={2} key={data._id}>
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

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
      kode: 1
    });
  }

  loop() {
    const test = [];
    const { allfoto } = this.state;
    allfoto.map(fotox => test.push(fotox.avatar));
    return test;
  }

  gotoprofile(username) {
    sessionStorage.setItem("username", username);
    window.location = "#/user/profile";
  }

  newmessage(username) {
    event.preventDefault();
    window.location = "#/dm?username=" + username;
  }

  generateZeroData() {
    const divConten = {
      marginTop: "40%",
      marginBottom: "60%"
    };
    return (
      <div style={divConten}>
        <Header as="h2" icon textAlign="center">
          <Image
            centered
            size="large"
            src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png"
          />
          <Header.Content>
            <Statistic>
              <Statistic.Value text>You Haven't friend,</Statistic.Value>
              <Statistic.Label />
              <Statistic.Label>No Result</Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  close = () =>
    this.setState({ open: false, email_friend: "", friendship: [] }, () =>
      sessionStorage.removeItem("username")
    );

  render() {
    const {
      datas,
      isLoading,
      friendship,
      open,
      dimmer,
      fotos,
      rank
    } = this.state;
    const reputationIcon = reputation;
    const marginLayer = {
      marginLeft: "2px",
      marginRight: "2px"
    };
    const marginSearch = {
      marginLeft: "1em",
      marginRight: "1em"
    };
    return (
      <div style={{ marginBottom: 45 }}>
        <Input
          fluid
          icon="search"
          onChange={this.handlePost}
          name="cari"
          value={this.state.cari}
          placeholder="Seacrh"
          style={marginSearch}
        />
        <br />
        {datas.length === 0 ? (
          this.generateZeroData()
        ) : isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {datas.map(data => {
              return (
                <Grid columns={1} key={data._id} style={marginLayer}>
                  {data.email === this.state.email ? null : (
                    <Grid.Column>
                      <List
                        verticalAlign="middle"
                        onClick={() => {
                          this.handleClick(data.email);
                        }}
                      >
                        <List.Item>
                          <Image
                            avatar
                            src={
                              "http://aprizal.com/public/avatar/" +
                              data.foto
                            }
                          />
                          <List.Content>
                            <List.Header>
                              {data.first_name} {data.last_name}
                            </List.Header>
                            <p>@{data.username}</p>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>
                  )}
                </Grid>
              );
            })}
            <Modal
              dimmer={dimmer}
              open={open}
              onClose={this.close}
              basic
              closeIcon
              size="small"
            >
              <Modal.Header style={{ marginLeft: "14px" }}>
                <center>
                  <Image
                    style={{
                      height: "210px",
                      width: "210px"
                    }}
                    circular
                    src={
                      "http://aprizal.com/public/avatar/" + fotos
                    }
                  />
                  <Header style={{ color: "white" }}>
                    {"@" + friendship.username}
                  </Header>
                </center>
              </Modal.Header>
              <Modal.Content>
                <center>
                  <Image src={reputationIcon} size="mini" circular/>
                  <p style={{ fontSize: "14px", textTransform: "uppercase"}}>
                    <b>{this.getReputationName()}</b>
                  </p>
                  <Statistic inverted size="small" color="yellow">
                    <Statistic.Value>{rank}</Statistic.Value>
                    <Statistic.Label>User Rank</Statistic.Label>
                  </Statistic>
                </center>
              </Modal.Content>
              <Modal.Actions>
                <Grid>
                  <Grid.Row columns={4}>
                    <Grid.Column width={3} />
                    <Grid.Column width={5}>
                      <Button
                        circular
                        size="big"
                        icon="user circle"
                        style={{ background: "#5b90f6", color: "white" }}
                        onClick={() => this.gotoprofile(friendship.username)}
                      />
                      <div style={{ marginRight: "6px", marginTop: "5px" }}>
                        Profile
                      </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Button
                        circular
                        size="big"
                        icon="facebook messenger"
                        style={{ background: "#5b90f6", color: "white" }}
                        onClick={() => this.newmessage(friendship.username)}
                      />
                      <div style={{ marginTop: "5px" }}>Message</div>
                    </Grid.Column>
                    <Grid.Column width={3} />
                  </Grid.Row>
                </Grid>
              </Modal.Actions>
            </Modal>
          </Container>
        )}
      </div>
    );
  }
}
