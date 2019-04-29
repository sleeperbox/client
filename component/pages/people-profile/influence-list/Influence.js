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
      url: "https://api.aprizal.com/api/follower/list",
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
          <Divider hidden/>
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
              <Grid columns={2} key={index}>
                <Grid.Column>
                  <List verticalAlign="middle">
                    <List.Item>
                      <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                      <List.Content>
                        <List.Header>{data.username}</List.Header>
                        <p>{data.name}</p>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <Label style={{ width: "100px", float: "right", textAlign: "center" }} color="red" size="small">
                    Influenced
                  </Label>
                </Grid.Column>
              </Grid>
            );
          })}
        </Container>
      </div>
    ) : (
      this.generateZeroData()
    );
  }
}
