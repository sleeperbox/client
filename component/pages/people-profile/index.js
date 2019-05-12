import React, { Component } from "react";
import HeaderProfile from "./HeaderProfile";
import HeaderPeople from "./HeaderPeople";
import Action from "./Action";
import Post from './Posts';
import PostLightWeight from './PostsLightWeight';
import { Icon,Menu, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import MenuProfile from '../profile/MenuProfile'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem("auth"),
      email: localStorage.getItem("email"),
      username: sessionStorage.getItem("username"),
      datas: [],
      email_friend: "",
      loading: true,
      activeItem: "hexagrid"
    };
    this.loading = this.loading.bind(this)
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/follow/user/data",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result => this.setState({ datas: result.data[0], email_friend: result.data[0].email, loading:false }));
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
handleItemClick = (e, { name }) => this.setState({ activeItem: name })
filterPost() {
  const { activeItem } = this.state
  return <Menu fluid pointing secondary widths={2} style={{marginTop: -5, position: "relative", background: "#fff", color: "#222"}}>
          <Menu.Item
          name='hexagrid'
          active={activeItem === 'hexagrid'}
          onClick={this.handleItemClick}
          ><Icon name="h" style={{color: "#5b90f6"}}/><span style={{marginLeft: -5}}>exagrid</span></Menu.Item>
          <Menu.Item
          name='lightweight'
          active={activeItem === 'lightweight'}
          onClick={this.handleItemClick}
          ><Icon name="bolt" style={{color: "#5b90f6"}}/><span style={{marginLeft: -7}}>ightweight</span></Menu.Item>
    
  </Menu>
}

  render() {
    sessionStorage.setItem("email_friend", this.state.email_friend);
    const {loading} = this.state
    return (
      <div>
        {loading ? (this.loading()) : ( <div>
        <HeaderProfile />
        {this.filterPost()}
        {this.state.activeItem == "hexagrid" ? <Post /> : <PostLightWeight/> }
        <MenuProfile/>
        </div>
        )}
        
      </div>
    );
  }
}
