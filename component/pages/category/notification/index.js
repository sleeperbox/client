import React, { Component } from "react";
import { Dimmer, Loader, Icon, Container, Grid, Divider, Image, List, Header, Label, Statistic } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import Action from "./action";
import axios from "axios"
import Menu from '../../profile/MenuProfile'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      datas: [],
      isLogin: "",
      isLoading: true,
      loading: true
    };
    // this.generateSkeleton = this.generateSkeleton.bind(this);
    // this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    if (this.state.datas) {
      this.setState({ isLoading: false });
  }
  const { isLogin } = this.state;
  isLogin === "false" ? (window.location = "#/login") : "";

  }

  componentDidMount() {
    
    if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
      // this.setState({loading: false})
      setTimeout(() =>  {
          this.setState({loading: false})
      }, 100)
  }
    // axios({
    //   method: "post",
    //   url: "http://apps.aprizal.com/api/follow/notif",
    //   headers: {
    //     "Acces-Control-Allow-Origin": true,
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   data: {
    //     email: this.state.email // This is the body part
    //   }
    // }).then(result => this.setState({ datas: result.data }));
    // this.setState({
    //   isLogin: localStorage.getItem("auth")
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    // const { isLogin } = this.state;
    // if (isLogin === false) {
    //   window.location = "#/login";
    // }
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

render() {
  sessionStorage.setItem("email_friend", this.state.email_friend);
  const {loading} = this.state
  console.log("index.")
  return (
    <div style={{ marginBottom: 45 }}>
      {loading ? (this.loading()) : ( 
      <div>
        <Action />
        <Menu/>
      </div>
      )}
    </div>
  );
}
}
