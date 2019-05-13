import React, { Component } from "react";
import { Dimmer, Loader, Icon, Container, Grid, Divider, Image, List, Header, Label, Statistic } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class Comment extends Component {
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
    if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
      // this.setState({loading: false})
      setTimeout(() =>  {
          this.setState({loading: false})
      }, 100)
  }
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/notif/comment/notice",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ datas: result.data, isLoading : false }));
    this.setState({
      isLogin: localStorage.getItem("auth")
    });
  }

  componentDidMount() {
    // if (this.state.datas) {
    //     this.setState({ isLoading: false });
    // }
    const { isLogin } = this.state;
    isLogin === "false" ? (window.location = "#/login") : "";
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === false) {
      window.location = "#/login";
    }
  }

  generateSkeleton() {
    const { datas } = this.state;
    const marginLayer = {
      marginLeft: "2px",
      marginRight: "2px"
    };
    return (
      <div style={{ marginBottom: 45 }}>
        
        <Container>
          <Grid columns={2}style={marginLayer}>
            <Grid.Column>
              <List>
                <List.Item>
                  <Image>
                  <Skeleton width="30px" height="30px" borderRadius="50px" />
                  </Image>
                  <List.Content>
                    <List.Header>
                      <p><Skeleton width="220px" he/></p>
                    </List.Header>
                    <p><Skeleton width="200px" he/></p>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>     
          </Grid>

          <Grid columns={2}style={marginLayer}>
            <Grid.Column>
              <List>
                <List.Item>
                  <Image>
                  <Skeleton width="30px" height="30px" borderRadius="50px" />
                  </Image>
                  <List.Content>
                    <List.Header>
                      <p><Skeleton width="220px" he/></p>
                    </List.Header>
                    <p><Skeleton width="200px" he/></p>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>     
          </Grid>

          <Grid columns={2}style={marginLayer}>
            <Grid.Column>
              <List>
                <List.Item>
                  <Image>
                  <Skeleton width="30px" height="30px" borderRadius="50px" />
                  </Image>
                  <List.Content>
                    <List.Header>
                      <p><Skeleton width="220px" he/></p>
                    </List.Header>
                    <p><Skeleton width="200px" he/></p>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>     
          </Grid>
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

  discuss(value) {
    window.location = '#/posts?id='+ value + '' 
  }


  render() {
    const { datas, isLoading } = this.state;
    const nodatas = datas.length;
    return (
      <div style={{ marginBottom: 45 }}>
        { isLoading ? (
          this.generateSkeleton()
        ) : nodatas === 0 ? (
          this.generateZeroData()
        ) : (
          <Container>
            {datas.map(data => {
              return (
                <Grid columns={1} key={data._id}>
                  <Grid.Column>
                    <List verticalAlign="middle">
                      <List.Item onClick={() => this.discuss(data.id_posts)}>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          <List.Header><strong>{data.username}</strong></List.Header>
                          <span style={{ fontSize: 12}}>{"mengomentari :"}</span>
                          <i style={{ fontSize: 12}}>{data.comment}</i>
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
