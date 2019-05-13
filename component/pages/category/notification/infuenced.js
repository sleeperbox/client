import React, { Component } from "react";
import {
  Dimmer,
  Loader,
  Icon,
  Container,
  Grid,
  Divider,
  Image,
  List,
  Header,
  Label,
  Statistic
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class Infuenced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      datas: [],
      isLogin: "",
      isLoading: true,
      loading: true
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
      url: "http://apps.aprizal.com/api/follow/notif",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }));
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
    //     }, 250)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === false) {
      window.location = "#/login";
    }
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

  generateZeroData() {
    const divConten = {
      marginTop: "50%",
      marginBottom: "50%"
    };
    return (
      <div style={divConten}>
        <Header as="h5" icon textAlign="center">
          <Icon name="bell slash outline" />
          <Header.Content>
            <Statistic>
              <Statistic.Label>
                <i>You Have No Notification</i>
              </Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
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

  render() {
    const { datas, isLoading, loading } = this.state;
    const border = {
      width: "32px",
      height: "32px",
      marginLeft: "-12px",
      paddingTop: "4px",
      borderRadius: "25px",
      border: "2px solid"
    };
    return (
      <div style={{ marginBottom: 45 }}>
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
                <Grid columns={4} key={data._id}>
                  <Grid.Column width={1}>
                    <div style={border}>
                      <b style={{marginLeft: "9px"}}>{data.username.charAt(0).toUpperCase()}</b>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <List verticalAlign="middle">
                      <List.Item>
                        <List.Content>
                          <List.Header>
                            <strong>{data.username}</strong>
                          </List.Header>
                          <span style={{ fontSize: 12 }}>{"Followed you"}</span>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
        )}
      </div>
    );
  }
}
