import React, { Component } from "react";
import { Dimmer, Loader, Icon, Container, Grid, Divider, Image, List, Header, Label, Statistic } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import Action from "./action";
import axios from "axios"
import Menu from '../../profile/MenuProfile'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      datas: [],
      isLogin: "",
      isLoading: true,
      loading: true
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
      // this.setState({loading: false})
      setTimeout(() =>  {
          this.setState({loading: false})
      }, 100)
  }
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
                <Loader size='large'>Plase Wait</Loader>
            </Dimmer>
        </div>        
    );
}

render() {
  sessionStorage.setItem("email_friend", this.state.email_friend);
  const {loading} = this.state
  return (
    <div style={{ marginBottom: 45 }}>
      {loading ? (this.loading()) : ( 
      <div>
        <Action />
        <Menu/>
      </div>
      )}
      <Menu/>
    </div>
  );
}
}
