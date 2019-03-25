import React, { Component } from "react";
import { Grid, Menu } from "semantic-ui-react";

export default class Store extends Component {
  render() {
      const marginText = {
          marginTop : "200px"
      }
    return (
      <div>
        <Grid textAlign="center" columns={1}>
          <Grid.Row>
            <Grid.Column>
              <h1 style={marginText}>We Will Comming Soon !</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
