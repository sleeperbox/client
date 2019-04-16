import React, { Component } from "react";
import BackgroundSlideshow from 'react-background-slideshow'
import image1 from './assets/images/background/h1.png'
import image2 from './assets/images/background/h2.png'

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLogin: false,
      slideIndex: 0,
      pindah: 0,
      login: localStorage.getItem("email").slice(1, -1)
    }
  }

  componentWillMount() {
    const {isLogin} = this.state;
    isLogin === true ? window.location = '#/profile' : '';
    if( this.state.login !==  null){
      window.location = '#/profile'
    }
  }
  
  render() {
    return (
      <div>
      <BackgroundSlideshow disableInterval={true} images={[ image1, image2]} onChange={(data)=> data.index === 0 ? window.location="#/intro" : ''}/>
    </div>
    );
  }
}
