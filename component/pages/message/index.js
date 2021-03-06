import React, { Component } from "react";
import {
  Container,
  Grid,
  Divider,
  Image,
  List,
  Header,
  Statistic,
  Button,
  Modal,
  Dimmer,
  Loader,
  Segment,
  Icon,
  Input
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderMessage from "./HeaderMessage";
import MenuProfile from "../profile/MenuProfile";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      datas: [],
      username_user1: "",
      username_user2: "",
      isLogin: "",
      data_message: "",
      isLoading: true,
      loading: true,
      maxlength: 30,
      today: new Date().getDate()
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    if (
      this.state.loading == true ||
      this.setState.isLogin == "" ||
      this.setState.email == ""
    ) {
      // this.setState({loading: false})
      setTimeout(() => {
        this.setState({ loading: false });
      }, 100);
    }
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/list/message",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }));

    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/profile",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ username_user1: result.data.username }));
    this.setState({
      isLogin: localStorage.getItem("auth")
    });
  }

  componentDidMount() {
    if (this.state.datas) {
      this.setState({ isLoading: false });
    }
    const { isLogin } = this.state;
    isLogin === "false" ? (window.location = "#/login") : "";
    // console.log('first ', this.state.loading)
    //     setTimeout(() => {
    //         if(this.state.loading == true){
    //             this.setState({loading: false}, () => console.log('end: ', this.state.loading))
    //         }
    //     }, 500)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === false) {
      window.location = "#/login";
    }
  }

  message(Value) {
    event.preventDefault();
    window.location = "#/dm?username=" + Value;
  }

  newmessage() {
    event.preventDefault();
    window.location = "#/newdm";
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

  loading() {
    return (
      <div>
        <Dimmer active inverted>
          <Loader size="large">Plase Wait</Loader>
        </Dimmer>
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
    const { datas, isLoading, loading } = this.state;
    const marginSearch = {
      marginTop : "1.5em",
      marginBottom: "-0.8em",
      marginLeft : "1em",
      marginRight : "1em"
    }
    return (
      <div>
        <Input 
          style={marginSearch}
          fluid
          icon="search"
          onChange={this.handlePost}
          name="cari"
          placeholder="Search Contact"
          value={this.state.cari}
        />
        <Divider hidden />
        {loading ? (
          this.loading()
        ) : datas.length === 0 ? (
          this.generateZeroData()
        ) : isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {datas.map(data => {
              return (
                <Grid columns={1} key={data._id} style={{marginBottom: "-1.5em"}}>  
                  <Grid.Column>
                    {data.username_user1 === this.state.username_user1 ? (
                      <List
                        verticalAlign="middle"
                        onClick={() => {
                          this.message(data.username_user2);
                        }}
                      >
                        <List.Item>
                          <List.Content floated="right">
                            <small>
                              {data.date.slice(14, 16) == this.state.today
                                ? data.date.slice(0, 5)
                                : data.date.slice(10)}
                            </small>
                          </List.Content>
                          <Image
                            avatar
                            src="https://react.semantic-ui.com/images/avatar/small/tom.jpg"
                            style={{ width: "12%", height: "12%" }}
                          />
                          <List.Content>
                            {data.username_user1 ===
                            this.state.username_user1 ? (
                              <List.Header style={{ fontSize: "15px" }}>
                                {data.username_user2}
                              </List.Header>
                            ) : (
                              <List.Header style={{ fontSize: "15px" }}>
                                {data.username_user1}
                              </List.Header>
                            )}
                            <p style={{ fontSize: "12px", color: "#8C8C8C" }}>
                              {data.message.length > this.state.maxlength
                                ? data.message.substring(
                                    0,
                                    this.state.maxlength
                                  ) + "..."
                                : data.message}
                            </p>
                          </List.Content>
                        </List.Item>
                      </List>
                    ) : (
                      <List
                        verticalAlign="middle"
                        onClick={() => {
                          this.message(data.username_user1);
                        }}
                      >
                        <List.Item>
                          <List.Content floated="right">
                            <small>
                              {data.date.slice(14, 16) == this.state.today
                                ? data.date.slice(0, 5)
                                : data.date.slice(10)}
                            </small>
                          </List.Content>
                          <Image
                            avatar
                            src="https://react.semantic-ui.com/images/avatar/small/tom.jpg"
                            style={{ width: "12%", height: "12%" }}
                          />
                          <List.Content>
                            {data.username_user1 ===
                            this.state.username_user1 ? (
                              <List.Header style={{ fontSize: "15px" }}>
                                {data.username_user2}
                              </List.Header>
                            ) : (
                              <List.Header style={{ fontSize: "15px" }}>
                                {data.username_user1}
                              </List.Header>
                            )}
                            <p style={{ fontSize: "12px", color: "#8C8C8C", marginTop: "5px" }}>
                              {data.message.length > this.state.maxlength
                                ? data.message.substring(
                                    0,
                                    this.state.maxlength
                                  ) + "..."
                                : data.message}
                            </p>
                          </List.Content>
                        </List.Item>
                      </List>
                    )}
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
        )}
        <Button
          circular
          size="big"
          icon="plus"
          style={{
            float: "right",
            zIndex: 1,
            position: "fixed",
            bottom: 70,
            right: 5,
            background: "#5b90f6",
            color: "white"
          }}
          onClick={() => {
            this.newmessage();
          }}
        />
        <MenuProfile />
      </div>
    );
  }
}
