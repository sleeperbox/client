import React, { Component } from "react";
import {
  Menu,
  Image,
  Modal
} from "semantic-ui-react";
import giftIco from "../../../assets/icon/gift.png";
import cameraIco from "../../../assets/icon/camera.png";

const egg = "https://media.giphy.com/media/YS65hkIsbZrMeK3VYf/giphy.gif"

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openNotif: false
    }
  }

  openModal() {
    setTimeout(() => {
      this.setState({open: false, openNotif: true});
    }, 4000)
    return <div>
      <Modal open={this.state.open} basic size='small'>
        <Modal.Content>
          <Image src={egg} style={{position: "relative", right: 50}}/>
        </Modal.Content>
      </Modal>
    </div>
  }

  notif() {
    setTimeout(() => {
      this.setState({openNotif: false});
    }, 3000)
    return <div>
      <Modal open={this.state.openNotif} basic size='small'>
        <Modal.Content onClick={() => this.closeModal()}>
          <h2 style={{textAlign: "center"}}>Congrats!!!<br/>You Earn <span style={{color: "lightblue"}}>50 Point</span>!</h2>
        </Modal.Content>
      </Modal>
    </div>
  }
  
  modal() {
    this.setState({ open: true })
  }
  closeModal() {
    this.setState({ open: false, openNotif: false })
  }

  render() {
    return (
      <div>
        {this.state.openNotif ? this.notif() : null}
        {this.state.open ? this.openModal() : null}
          <Menu borderless size="large" fixed="top" style={{ background: "#5190ed" }}>
            <Menu.Item name='camera' size="large" style={{ color: "white" }}>
              <Image src={cameraIco} style={{ width: 25, height: 25 }} /> &nbsp;&nbsp;
              <p style={{ marginTop: -0, color: "#ffffff", fontFamily: "Trebuchet MS, Helvetica, sans-serif", fontStyle: "italic" }}> &nbsp;Wayhome</p>
            </Menu.Item>
            <Menu.Item name='gift' position="right" onClick={() => this.modal()}>
              <Image src={giftIco} style={{ width: 22, height: 20 }} />
            </Menu.Item>
          </Menu>
      </div>
    );
  }
}