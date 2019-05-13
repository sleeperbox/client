import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Action from "./action";
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
      setTimeout(() =>  {
          this.setState({loading: false})
      }, 100)
  }
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
