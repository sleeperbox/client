import React, { Component } from "react";
import {
  Menu,
  Header,
  Icon,
  Image
} from "semantic-ui-react";
import { Camera } from 'react-cam';

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
        <Menu borderless size="large" fixed="top">
            <Menu.Item name='camera' size="large">
              <Icon name="camera" size="large" style={{color: "#222"}} onClick={()=> this.modal()}/>
            <Header as="h4" style={{marginTop: -0}}>Way Home</Header>
            </Menu.Item>
            <Menu.Item name='gift'  position="right">
              <Icon name="gift"  size="large" style={{color: "#222"}}/>
            </Menu.Item>
          </Menu>
          )}
      </div>
    );
  }
}