import React, { Component } from "react";
import { Container, Grid, Divider, Image, Segment, Statistic, Button, Label, Icon } from "semantic-ui-react";
import axios from "axios";

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: sessionStorage.getItem("username"),
      status: "",
      profile: []
    };
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "https://api.aprizal.com/api/people/profile/get",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result =>
      this.setState({ profile: result.data, temp_total: result.data[0].total_friends }, () => {
        let stat = {
          email: this.state.email,
          email_friend: this.state.profile[0].email
        };
        axios({
          method: "post",
          url: "https://api.aprizal.com/api/follow/status",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: stat
        }).then(result => this.setState({ status: result.data }));
      })
    );
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  handleFollow(value) {
    let add = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "post",
      url: "https://api.aprizal.com/api/follow",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: add
    }).then(result => this.setState({ status: result.data.status }));
  }

  handleUnfollow(value) {
    let unfoll = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "put",
      url: "https://api.aprizal.com/api/unfollow",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: unfoll
    }).then(result => this.setState({ status: result.data.status }));
  }

  render() {
    const {profile, status} = this.state
    return (
      <div style={{ marginBottom: 15 }}>
        <Container>
          {profile.map(data => {
            return (
              <Grid columns={1} key={index}>
                <Grid.Row style={{background: '#5190ed'}}>
                  <Grid.Column>
                    <Segment basic textAlign="center">
                      <Image
                        src={"http://aprizal.com/public/avatar/" + data.foto}
                        size="medium"
                        circular
                        centered
                        bordered
                        style={{height: "150px", width: "150px" }} />
                      <br />@{data.username}
                      <br />
                      {data.first_name} {data.last_name}
                      <Divider hidden/>
                      {status === "followed" ? (
                        <Button
                          content="unfollow"
                          size="tiny"
                          fluid
                          style={{background: "#f7f7f7", fontSize: "14px", color: "#5190ed"}}
                          onClick={() => this.handleUnfollow(data.email)}
                        />
                      ) : (
                        <Button
                          content="follow"
                          size="tiny"
                          style={{background: "#f7f7f7", fontSize: "14px", color: "#5190ed"}}
                          fluid
                          onClick={() => this.handleFollow(data.email)}
                        />
                      )}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          })}
        </Container>
      </div>
    );
  }
}
