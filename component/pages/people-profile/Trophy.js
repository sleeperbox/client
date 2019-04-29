import React, { Component } from "react";
import { Container, Divider, Statistic, Icon, Header } from "semantic-ui-react";

export default class Trophy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      username: sessionStorage.getItem("username"),
    };
  }

  render() {
    return (
        <Container>
        <Divider hidden/>
        <Header as="h5" icon textAlign="center">
        <Icon name="lock" />
          <Header.Content>
            <Statistic>
              <Statistic.Label>
                <i>Locked, You Can't See This Content</i>
              </Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </Container>
    );
  }
}
