import React, { Component } from "react";
import { Icon, Container, Grid, Divider, Image, List, Header,  Statistic } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";``

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
    if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
      setTimeout(() =>  {
          this.setState({loading: false})
      }, 100)
  }
  }

  componentDidMount() {
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
    }).then(result => 
      this.setState({ 
        datas: result.data, 
        isLoading: false
      }));
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

 

  render() {
    const { datas, isLoading} = this.state;
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
                      <List.Item>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          <List.Header>{data.name}</List.Header>
                          <i>{"Followed you"}</i>
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
