import React, { Component } from "react";
import { Link } from "react-router-dom";
// should be scss import './app.css';

export default class App extends Component {
  /*
  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }
  */

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to="/welcome">Welcome</Link>
        <br />
        <Link to="/test">Test Pages</Link>
      </div>
    );
  }
}
