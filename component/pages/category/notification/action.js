import React, { Component } from "react"
import { Tab, Menu, Button } from "semantic-ui-react"
import Infuenced from "./infuenced"
import Comment from "./comment"

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('username')
    };
  }

  render() {
    const panes = [
      {menuItem: (
        <Menu.Item key='compose' name="Following" style={{width: "50%", fontSize: 16}}/>
      ), render: () => <Tab.Pane attached={false} basic><Infuenced/></Tab.Pane> },
      {menuItem: (
        <Menu.Item key='user' name="Discussion" style={{width: "50%", fontSize: 16}}/>
      ), render: () => <Tab.Pane attached={false} basic><Comment/></Tab.Pane> },
    ]

    return (
        <div>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
        )
    }
}


