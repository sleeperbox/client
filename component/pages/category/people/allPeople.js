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
      isFetching: true,
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
      url: "http://apps.aprizal.com/api/friend",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result =>
      this.setState({datas: JSON.parse(result.data.user), allfoto: JSON.parse(result.data.foto), isLoading: false})
    )
  }
  componentDidMount(){
   
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
        url: "http://apps.aprizal.com/api/search",
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
        url: "http://apps.aprizal.com/api/user/avatar",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: value
        } // This is the body part
      }).then(result => 
          this.setState({ fotos: result.data, isFetching: false  })
        )
    );

    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/user",
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
        total_thank: result.data.total_thanks,
        isFetching: false
      })
    );

    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/user/rank",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: value
      }
    }).then(result => this.setState({ rank: result.data[0].rank + 1, isFetching: false }));
  }

  close(){
    sessionStorage.removeItem("username")
    this.setState({ open: false, email_friend: "", rank: null, isFetching: true, total_influence: null, total_thank: null,fotos: null })
  }

  generateSkeleton() {
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

          <Grid columns={2} style={marginLayer}>
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

          <Grid columns={2} style={marginLayer}>
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

          <Grid columns={2} style={marginLayer}>
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
      marginTop: "30%",
      marginBottom: "50%"
    };
    return (
      <div style={divConten}>
      <Header as="h5" icon textAlign="center">
      <Icon name="bus" />
        <Header.Content>
          <Statistic>
            <Statistic.Label>
              <i style={{color: "#777"}}>Nobody Here...</i>
            </Statistic.Label>
          </Statistic>
        </Header.Content>
      </Header>
    </div>
    );
  }    

  render() {
    const {
      datas,
      isLoading,
      friendship,
      isFetching,
      open,
      dimmer,
      fotos,
      rank
    } = this.state;
    const reputationIcon = reputation;
    const marginLayer = {
      marginLeft: "2px",
      marginRight: "2px",
      fontSize: "17px"
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
        { isLoading ? (
          this.generateSkeleton()
        ) : datas.length === 0 ? (
          this.generateZeroData()
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
              onClose={() => this.close()}
              basic
              closeIcon
              size="small"
            >
              <Modal.Header style={{ marginLeft: "14px" }}>
                <center>
                  {isFetching ? <Skeleton/> : (
                    <div>
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
                   {isFetching ? <Skeleton/> : (
                  <Header style={{ color: "white" }}>
                      {"@" + friendship.username} 
                  </Header>
                   )}
                  </div>
                  )}
                  
                </center>
              </Modal.Header>
              <Modal.Content>
              {isFetching ? <center><Skeleton/><br/><Skeleton/></center> : (
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
              )}
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
