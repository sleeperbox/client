import React, { Component } from "react";
import {
  Button,
  Container,
  Modal,
  Icon,
  Segment,
} from "semantic-ui-react";

export default class Forgotpass extends Component {
  render() {
    return (
      <div>
        <Container>
          <Segment textAlign="center" basic>
          <Modal
              defaultOpen={true}
              basic
              size="small"
              >
                <Modal.Actions>
                  <Button
                    primary
                    onClick={() => window.location = "#/login"}
                  >
                    <Icon name="envelope outline" />Verification sent, check your mail
                  </Button>
                </Modal.Actions>
            </Modal>
          </Segment>
        </Container>
      </div>
    );
  }
}
