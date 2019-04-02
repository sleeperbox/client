import React, { Component } from "react"
import { Tab, Menu } from "semantic-ui-react"
import axios from 'axios'
import Posts from "./Posts";
import DetailProfile from "./DetailProfile"
import InfluenceList from "./influence-list/"
import Trophy from "./Trophy"

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('username'),
      profile: []
    };
  }

  componentWillMount() {
    axios({
        method: 'post',
        url: 'http://192.168.100.18:8080/api/people/profile/get',
        headers: { 
          "Acces-Control-Allow-Origin": true,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
          username: this.state.username, // This is the body part
        }
      }).then(result => this.setState({profile: result.data}));
  }

  render() {
    const panes = [
      {menuItem: (
        <Menu.Item key='compose' icon='compose' style={{width: "25%"}}/>
      ), render: () => <Tab.Pane attached={false} basic><Posts/></Tab.Pane> },
      {menuItem: (
        <Menu.Item key='user' icon='user' style={{width: "25%"}}/>
      ), render: () => <Tab.Pane attached={false} basic><InfluenceList/></Tab.Pane> },
      {menuItem: (
        <Menu.Item key='eye' icon='eye' style={{width: "25%"}}/>
      ), render: () => <Tab.Pane attached={false} basic><DetailProfile/></Tab.Pane> },
      {menuItem: (
        <Menu.Item key='trophy' icon='trophy' style={{width: "25%"}}/>
      ), render: () => <Tab.Pane attached={false} basic><Trophy/></Tab.Pane> },
    ]

    return (
        <div>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
        </div>
        )
    }
}


