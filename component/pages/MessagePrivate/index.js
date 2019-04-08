import React, { Component } from "react";
import { Container, Grid, Divider, List, Icon, Header, Statistic, Label, TextArea, Button, Input, Image } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderMessagePrivate from "./HeaderMessagePrivate";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      datas: [],
      data_name: [],
      username_user1 : window.location.href.split('=')[1],
      username_user2: "",
      isLogin: "",
      pesan: "",
      data_message: "",
      isLoading: true,
      kode: 0
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/detail/message",
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
      url: "http://192.168.100.18:8080/api/read/message",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username_user1: this.state.username_user1
      }
    })

    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/message/head",
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

  componentDidMount() {
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
        url: "http://192.168.100.18:8080/api/detail/message",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: this.state.email,
          username_user1: this.state.username_user1
        }
      }).then(result => this.setState({ datas: result.data, kode: 0,pesan:"" }));
    }
  }

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    })
  }

  message() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/send/message",
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
    }).then( () => this.setState({kode: 1}) );
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
      marginTop: "40%",
      marginBottom: "60%"
    };
    return (
      <div style={divConten}>
        <Header as="h2" icon textAlign="center">
          <Header.Content>
            <Statistic>
              <Statistic.Value text>Hell Yeah,</Statistic.Value>
              <Statistic.Label>
                <i>No Message</i>
              </Statistic.Label>
              <Statistic.Label></Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas } = this.state;
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
              <Header as="h4" textAlign="center"><Image size="tiny"
                  circular
                  src={"http://192.168.100.18/src/web-api/public/avatar/" + this.state.data_name.foto}
                  style={{width:"15%"}}></Image><Icon></Icon>{this.state.data_name.first_name + " " + this.state.data_name.last_name}
              <br />
              <Label size="small" style={{ backgroundColor: "transparent" }}><i>{"@" + this.state.data_name.username}</i></Label></Header>
            <Divider />
            {datas.map(data => {
              return (
                <Grid columns={1} key={data._id}>
                  <Grid.Column>
                    <List verticalAlign="middle">
                      {data.username_user1 === this.state.username_user1 ?
                      <List.Item style={{float: "left"}}>
                        <List.Content>
                          <Label size="large" style={{ backgroundColor: "#DD4B39", color: "#f7f7f7",fontWeight: "100"}} circular>
                            {data.message}
                          </Label>
                          <br />
                          <Label size="small" style={{ backgroundColor: "transparent",float: "left"}}>{data.date.slice(0, 10)}</Label>
                        </List.Content>
                      </List.Item>
                      : 
                      <List.Item style={{float: "right"}}>
                        <List.Content style={{float: "right"}}>
                        <Label size="small" style={{ backgroundColor: "transparent"}}></Label><Label style={{float: "right",backgroundColor: "#00ACEE", color: "#f7f7f7",fontWeight: "100"}} size="large" circular>
                            {data.message}
                          </Label>
                          <br />
                          { data.status === "Send" ? <Label size="small" style={{ backgroundColor: "transparent",float: "right"}}>{data.date.slice(0, 10)}<Icon /><Icon name="envelope open outline"/><i>{data.status}</i></Label> : <Label size="small" style={{ backgroundColor: "transparent",float: "right"}}>{data.date.slice(1, 10)}<Icon /><Icon name="envelope open outline" color="blue"/><i>{data.status}</i></Label> }
                        </List.Content>
                      </List.Item>}
                    </List>
                  </Grid.Column>
                </Grid>
              );
            })}
            
          </Container>
        )}
        <TextArea value={this.state.pesan} style={{ width:"90%",zIndex: 2,position: "fixed",bottom: 0 }} name="pesan" onChange={this.handlePost} placeholder='Ketik Pesan...' />
        <Input name="focus" hidden style={{ width:"90%",zIndex: -2,position: "fixed",bottom: 0 }}/>
        <Button onClick={this.message.bind(this)} style={{ backgroundColor: "transparent",zIndex: 2,position: "fixed",bottom: 0,right: -0 }}  icon="paper plane outline"></Button>
      </div>
    );
  }
}
