import _ from 'lodash'
import axios from 'axios'
import React, { Component } from 'react'
import MenuProfile from "../profile/MenuProfile";
import { Input, Grid, Divider, Container, List, Image, Header, Statistic } from 'semantic-ui-react'

export default class Contack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      email: localStorage.getItem('email').slice(1, -1),
      cari: "",
      isLoading: false,
      kode: 0
    };
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/search",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.cari
      }
    }).then(result => this.setState({ datas: result.data}));
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
        url: "http://192.168.100.18:8080/api/search",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          username: this.state.cari
        }
      }).then(result => this.setState({ datas: result.data, kode: 0 }));
    }
  }

  message(Value) {
    event.preventDefault();
    window.location = "#/dm?username=" + Value
  }

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
      kode: 1
    })
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
              </Statistic.Label>
              <Statistic.Label>No Result</Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas } = this.state

    return (
      <div>
        <Input
          fluid
          icon="search"
          onChange={this.handlePost}
          name="cari"
          value={this.state.cari}
        />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
            {datas.length === 0 ? (
              this.generateZeroData()
            ) : (
            <Container>
            {datas.map(data => {
              return (
                <Grid columns={2} key={data._id}>  
                  <Grid.Column>
                    <List verticalAlign="middle" onClick={() => {this.message(data.username)}}>
                      { data.email === this.state.email ? null : 
                      <List.Item>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          <List.Header>{data.username}</List.Header>
                        </List.Content>
                      </List.Item>
                      }
                    </List>
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
            )}
        <MenuProfile />
    </div>
    )
  }
}