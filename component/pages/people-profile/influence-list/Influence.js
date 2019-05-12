import React, { Component } from "react";
import axios from "axios";
import { Header, Statistic, Container, Grid, List, Image, Label, Icon, Divider } from "semantic-ui-react";

export default class Influence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_friend: sessionStorage.getItem("email_friend"),
      datas: []
    };
    this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/follower/list",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email_friend // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }));
  }

  generateZeroData() {
    return (
      <Container>
        <Divider hidden />
        <Header as="h5" icon textAlign="center">
          <Icon name="street view" />
          <Header.Content>
            <Statistic>
              <Statistic.Label>
                <i>not interested to someone yet</i>
              </Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </Container>
    );
  }

  render() {
    const { datas } = this.state;
    return datas.length != 0 ? (
      <div>
        <Container>
          {datas.map(data => {
            return (
              <List horizontal relaxed key={data._id} style={{margin: 10}}>
              <List.Item>
                <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                <List.Content>
                  <List.Header as='a'>{data.username}</List.Header>
                </List.Content>
              </List.Item>
            </List>
            );
          })}
        </Container>
      </div>
    ) : (
        this.generateZeroData()
      );
  }
}
