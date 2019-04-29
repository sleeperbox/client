import React, { Component } from "react";
import { Menu, Button, Input, Icon, TextArea } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMenu: "",
      menu: localStorage.getItem("menu"),
      datas: [],
      isLoading: true,
      email: localStorage.getItem("email"),
      content: "",
      tags: "",
      options: [],
      value: "null",
      pesan: "",
      seen: null,
      tag: 0,
      post: 0
    };
    this.handlePost = this.handlePost.bind(this);  
  }
  

  componentWillMount() {
    
  }

  componentDidMount() {
    if(this.state.email){
      this.setState({ isLoading: false });
    }
  }

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    })
    console.log(this.state.pesan)
  }

  generateSkeleton() {
    return (
      <div>
        <Menu
          fluid
          widths={5}
          style={{
            zIndex: 2,
            position: "fixed",
            bottom: 0
          }}
        >
          <Menu.Item name="home">
            <Skeleton width="20px" borderRadius="100%" height="20px" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }

    
  render () {
    return (
      <div>
        <TextArea autoHeight style={{ width:"90%",zIndex: 2,position: "fixed",bottom: 0 }} name="pesan" onChange={this.handlePost} placeholder='Ketik Pesan...' />
        <Button style={{ backgroundColor: "transparent",zIndex: 2,position: "fixed",bottom: 0,right: -0 }}  icon="paper plane outline"></Button>
      </div>
    );
  }
}