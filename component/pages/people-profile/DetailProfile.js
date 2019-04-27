import React, { Component } from "react";
import { Container, Grid, Divider, Image, Segment, Statistic, Button, Label, Icon } from "semantic-ui-react";
import axios from "axios";

export default class DetailProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: sessionStorage.getItem("username"),
      profile: [],
      rank: null,
      temp_total: null
    };
    this.gotoInfluenceList = this.gotoInfluenceList.bind(this);
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
      this.setState({ profile: result.data, temp_total: result.data[0].total_friends }));
    
    
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
          email: this.state.profile[0].email
        };
        axios({
          method: "post",
          url: "https://api.aprizal.com/api/user/rank",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: stat
        }).then(result => this.setState( {rank : result.data[0].rank+1}));
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

  gotoInfluenceList() {
    window.location = "#/user/influence/list";
  }

  render() {
    //simple css styling
    const smallFont = {
      fontSize: 15
    };
    const toRight = {
      float: "right"
    };
    const square = { width: 175, height: 175 }
    const {profile,rank, temp_total} = this.state
    return (
      <div style={{ marginBottom: -50 }}>
        <Container>
          {profile.map(data => {
            return (
              <Grid columns={1} key={data._id}>
                <Grid.Row>
                  <Grid.Column>
                    <center>
                    <Segment circular style={square}>
                      <Statistic color="yellow">
                        <Statistic.Label>User Rank</Statistic.Label>
                        <Statistic.Value>{rank}</Statistic.Value>
                      </Statistic>
                    </Segment>
                    </center>
                    <Segment basic>
                      <p style={smallFont}>
                        Posts <span style={toRight}>{data.total_posts}</span>
                      </p>
                      <p style={smallFont}>
                        Influencing{" "}
                        <a onClick={this.gotoInfluenceList} style={toRight}>
                          <u style={{ color: "blue" }}>{temp_total} person</u>
                        </a>
                      </p>
                      <p style={smallFont}>
                        Awards{" "}
                        <span style={toRight}>
                          <u style={{ color: "blue" }}>{data.awards}</u>
                        </span>
                      </p>
                      <p style={smallFont}>
                        Tags{" "}
                        <span style={toRight}>
                          <u style={{ color: "blue" }}>{data.tags}</u>
                        </span>
                      </p>
                      <p style={smallFont}>
                        Join Date{" "}
                        <span style={toRight}>
                          <i>{data.join_date}</i>
                        </span>
                      </p>
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
