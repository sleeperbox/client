import React, { Component } from "react";
import {
  Menu,
  Header,
  Icon,
  Image
} from "semantic-ui-react";
import { Camera } from 'react-cam';
import gift from "../../../assets/icon/gift.png";
import camera from "../../../assets/icon/camera.png";
export default class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  capture = (imgSrc) => {
    return imgSrc
  }

  openModal() {
    return <Camera
        showFocus={true} //show/hide focus box, basically useless...
        front={false} // true: front camera, false: rear camera
        capture={this.capture}
        width={1920} 
        height={1440}
        btnColor="#f7f7f7"
        />
  }

  modal() {
    this.setState({open: true})
  }

  render() {
    return (
      <div>
        {this.state.open ? this.openModal() : (
        <Menu borderless size="large" fixed="top" style={{background: "#5190ed"}}>
            <Menu.Item name='camera' size="large" style={{color: "white"}}>
              <Image src={camera} style={{width: 25, height: 25}}/> &nbsp;&nbsp;
              <p style={{marginTop: -0, color: "#ffffff", fontFamily: "Trebuchet MS, Helvetica, sans-serif", fontStyle: "italic"}}> &nbsp;Wayhome</p>
            </Menu.Item>
            <Menu.Item name='gift'  position="right">
              <Image src={gift} style={{width: 22, height: 20}}/>
            </Menu.Item>
          </Menu>
          )}
      </div>
    );
  }
}