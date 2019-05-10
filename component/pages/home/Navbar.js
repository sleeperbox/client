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
      openNotif: false,
      openCamera: false
    }
  }

  openModal() {
    setTimeout(() => {
      this.setState({open: false, openNotif: true});
    }, 1500)
    return <div>
      <Modal open={this.state.open} basic size='small'>
        <Modal.Content>
          <center><h3>there's no event, check again later.</h3></center>
          {/* <Image src={egg} style={{position: "relative", right: 50}}/> */}
        </Modal.Content>
      </Modal>
    </div>
  }

  notif() {
    setTimeout(() => {
      this.setState({openNotif: false});
    }, 800)
    return <div>
      <Modal open={this.state.openNotif} basic size='small'>
        <Modal.Content onClick={() => this.closeModal()}>
          <center><h3>automatically directing...</h3></center>
          {/* <h2 style={{textAlign: "center"}}>Congrats!!!<br/>You Earn <span style={{color: "lightblue"}}>50 Point</span>!</h2> */}
        </Modal.Content>
      </Modal>
    </div>
  }

  camera() {
    setTimeout(() => {
      this.setState({openCamera: false});
    }, 1800)
    return <div>
      <Modal open={this.state.openCamera} basic size='small'>
        <Modal.Content onClick={() => this.closeModal()}>
          <center><h3>can't access this feature for now...</h3></center>
        </Modal.Content>
      </Modal>
    </div>
  }

  modalCamera() {
    this.setState({ openCamera: true })
  }
  
  modal() {
    this.setState({ open: true })
  }
  closeModal() {
    this.setState({ open: false, openNotif: false, openCamera: false })
  }

  render() {
    return (
      <div>
        {this.state.openNotif ? this.notif() : null}
        {this.state.open ? this.openModal() : null}
        {this.state.openCamera ? this.camera() : null}
          <Menu borderless size="large" fixed="top" style={{ background: "#5190ed" }}>
            <Menu.Item name='camera' size="large" style={{ color: "white" }} onClick={() => this.modalCamera() }>
              <Image src={cameraIco} style={{ width: 25, height: 25 }} /> &nbsp;&nbsp;
              <p style={{ marginTop: -0, color: "#ffffff", fontFamily: "Trebuchet MS, Helvetica, sans-serif", fontStyle: "italic" }}> &nbsp;way</p>
            </Menu.Item>
            <Menu.Item name='gift' position="right" onClick={() => this.modal()}>
              <Image src={giftIco} style={{ width: 22, height: 20 }} />
            </Menu.Item>
          </Menu>
      </div>
    );
  }
}