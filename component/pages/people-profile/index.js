import React, { Component } from "react";
import HeaderProfile from "./HeaderProfile";
import HeaderPeople from "./HeaderPeople";
import Action from "./Action";
import Posts from "./Posts";
import { Container, Grid, Divider, Image, List, Header, Button, Modal, Dimmer, Loader, Segment, } from "semantic-ui-react";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: "",
      email: "",
      username: sessionStorage.getItem("username"),
      datas: [],
      email_friend: "",
      loading: true,
    };
    this.loading = this.loading.bind(this)
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/follow/user/data",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result => this.setState({ datas: result.data[0], email_friend: result.data[0].email }));

    const email = JSON.parse(localStorage.getItem("email"));
    const auth = JSON.parse(localStorage.getItem("auth"));
    this.setState({
      email,
      isLogin: auth
    });
  }

  componentDidMount() {
    if (this.state.isLogin != true) {
      window.location = "#/login";
    }
    console.log('first ', this.state.loading)
    setTimeout(() => {
        if(this.state.loading == true){
            this.setState({loading: false}, () => console.log('end: ', this.state.loading))
        }
    }, 100)
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isLogin === "false" ? (window.location = "#/login") : "";
  }

  loading() {
    return (
        <div>    
            <Dimmer active inverted>
                <Loader size='large'>Plase Wait</Loader>
            </Dimmer>    
        </div>  
    );
}


  componentDidUpdate(prevProps, prevState) {}

  render() {
    sessionStorage.setItem("email_friend", this.state.email_friend);
    const {loading} = this.state
    return (
      <div style={{ marginBottom: 45 }}>
        {loading ? (this.loading()) : ( <div>
        <HeaderPeople />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <HeaderProfile />
        <Action />
        </div>
        )}
        
      </div>
    );
  }
}
