import React, { Component } from "react";
import { Container, Grid, Divider, Image, List, Header, Statistic, Button, Modal, Dimmer, Loader, Segment, } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderMessage from "./HeaderMessage";
import MenuProfile from "../profile/MenuProfile";
import axios from "axios";


export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      datas: [],
      username_user1: "",
      username_user2: "",
      isLogin: "",
      data_message: "",
      isLoading: true,
      loading: true,
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
      url: "https://api.aprizal.com/api/list/message",
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
      url: "https://api.aprizal.com/api/profile",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ username_user1: result.data.username}));
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
    window.location = "#/dm?username=" + Value
  }

  newmessage() {
    event.preventDefault();
    window.location = "#/newdm"
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
              <Grid columns={2} key={index}>
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
                    <Loader size='large'>Plase Wait</Loader>
                </Dimmer>
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
          <Image
            centered
            size="large"
            src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png"
          />
          <Header.Content>
            <Statistic>
              <Statistic.Value text>Hell Yeah,</Statistic.Value>
              <Statistic.Label>
                <i>0 Million</i>
              </Statistic.Label>
              <Statistic.Label>Message</Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas, isLoading, loading } = this.state;
    return (
      <div style={{ marginBottom: 45, marginTop: 20 }}>
        {loading ? (this.loading()) : datas.length === 0 ? (
          this.generateZeroData()
        ) : isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {datas.map(data => {
              return (
                <Grid columns={1} key={index}>  
                  <Grid.Column>
                    { data.username_user1 === this.state.username_user1 ? <List verticalAlign="middle" onClick={() => {this.message(data.username_user2)}}>
                      <List.Item>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          { data.username_user1 === this.state.username_user1 ? (<List.Header>{data.username_user2}</List.Header>) : (<List.Header>{data.username_user1}</List.Header>)}
                          <p><i><small>{data.message}</small></i></p>
                        </List.Content>
                      </List.Item>
                    </List> : 
                    <List verticalAlign="middle" onClick={() => {this.message(data.username_user1)}}>
                    <List.Item>
                      <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                      <List.Content>
                        { data.username_user1 === this.state.username_user1 ? (<List.Header>{data.username_user2}</List.Header>) : (<List.Header>{data.username_user1}</List.Header>)}
                        <p><i><small>{data.message}</small></i></p>
                      </List.Content>
                    </List.Item>
                    </List> }
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
        )}
        <Button 
          circular 
          size='big' 
          icon='plus'  
          style={{
            float: "right",
            zIndex: 1,
            position: "fixed",
            bottom: 70,
            right: 5,
            background: "#5b90f6",
            color: "white" 
          }} 
          onClick={() => {this.newmessage()}} />                  
        <MenuProfile />
      </div>
    );
  }
}
