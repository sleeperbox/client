import React, { Component } from "react";
import Skeleton from "react-skeleton-loader";
import { Container, Grid, Divider, Accordion, Image, Modal, Button, Message, Icon, Dimmer, Header } from "semantic-ui-react";
import axios from "axios";


export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      username: sessionStorage.getItem("username"),
      status: "",
      profile: [],
      emailFriend: "",
      photoFriend: "",
      open: false,
      openSnackbar: false,
      msg: false,
      activeIndex: 0,
      isLoading: true,
      active: false
    };
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/people/profile/get",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result =>
      this.setState({ profile: result.data, temp_total: result.data.total_friends, isLoading: false }, () => {
        let stat = {
          email: this.state.email,
          email_friend: this.state.profile[0].email
        };
        axios({
          method: "post",
          url: "http://apps.aprizal.com/api/follow/status",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: stat
        }).then(result => this.setState({ status: result.data }));
      })
    );
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  generateSkeleton() {
    return (
      <div>
        <Container>
          <Grid columns={2}>
            <Divider hidden />
            <Grid.Row stretched>
              <Grid.Column>
                <Skeleton borderRadius="100%" height="75px" />
                <Divider hidden />
                <Skeleton />
              </Grid.Column>
              <Grid.Column>
                <Skeleton height="150px" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
        </Container>
      </div>
    );
  }

  handleFollow(value) {
    let add = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/follow",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: add
    }).then(result => this.setState({ status: result.data.status, openSnackbar: true, msg: true }));
  }

  unfollowConfirmation() {
    let fotos = []
    const { profile } = this.state
    profile.map(data => fotos.push(data.foto))

    return <Modal basic size='large' open={this.state.open} style={{ background: "#5190ed" }}>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <Image
          src={"http://aprizal.com/public/avatar/" + fotos}
          centered
          style={{
            width: 150,
            height: 150,
            borderRadius: 100
          }}
        />
      </div>
      <Modal.Content>
        <p style={{ textAlign: "center", color: "#fff" }}>
          stop following <i>{sessionStorage.getItem("username")}</i>?
        </p>
        <center>
          <Button basic inverted onClick={() => this.handleUnfollow(this.state.emailFriend)} style={{ margin: 5 }}><b>Yes</b></Button>
          <Button basic inverted onClick={() => this.handleBackClose()} style={{ float: "right" }} style={{ margin: 5 }}><b>No</b></Button>
        </center>
      </Modal.Content>
      <Divider hidden />
    </Modal>
  }

  handleBack(value) {
    this.setState({ open: true, emailFriend: value })
  }
  handleBackClose() {
    this.setState({ open: false })
  }

  handleUnfollow(value) {
    let unfoll = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "put",
      url: "http://apps.aprizal.com/api/unfollow",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: unfoll
    }).then(result => this.setState({ status: result.data.status, open: false }));
  }

  handleCloseMsg() {
    this.setState({ msg: false })
  }

  snackBar() {
    const { msg } = this.state
    return <div style={{ position: "fixed", bottom: 0, zIndex: 99, minWidth: "100%" }}>
      {msg ? (
        <Message color='black' style={{ textAlign: "center" }} onDismiss={() => this.handleCloseMsg()}>you started following  {sessionStorage.getItem("username")}</Message>
      ) : null}
    </div>
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  back() {
    sessionStorage.removeItem("username");
    window.location = "#/people";
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })


  render() {
    const smallFont = {
      fontSize: 14,
    };
    const toRight = {
      float: "right",
    };
    const { profile, status, openSnackbar, active, activeIndex, isLoading } = this.state
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
            <div>
              {open ? this.unfollowConfirmation() : null}
              {openSnackbar ? this.snackBar() : null}
              <Dimmer active={active} onClickOutside={this.handleClose} page>
                <Header as='h3' icon inverted>
                  <Icon name='heart' color="red" />
                  {sessionStorage.getItem('username')} favorited tags
                  <br />
                  <Header.Subheader>{profile[0].tags}</Header.Subheader>
                </Header>
              </Dimmer>
              <Accordion fluid styled>
                <Accordion.Title style={{ background: "#5b90f6", color: "#fff", width: "100%", position: "fixed", top: 0, zIndex: 998 }} active={activeIndex === 1} index={1} onClick={this.handleClick}>
                  <span style={{ float: "right", fontSize: '16px' }} onClick={this.back.bind(this)}>back</span>
                  <span style={{ fontSize: '16px' }}>
                    <Icon name='dropdown' />
                    {sessionStorage.getItem('username')} profile
                    </span>
                </Accordion.Title>
                <Divider hidden />
                <Divider hidden />
                <Accordion.Content active={activeIndex === 1}>
                  <Image
                    style={{
                      border: "1px solid #555",
                      maxHeight: "700px",
                      minWidth: "100%",
                      maxWidth: "100%"
                    }}
                    src={"http://aprizal.com/public/avatar/" + profile[0].foto}
                  />
                  <br />
                  <p style={smallFont}>
                    Username <span style={toRight}>@{profile[0].username}</span>
                  </p>
                  <p style={smallFont}>
                    Post <span style={toRight}>{profile[0].total_posts}</span>
                  </p>
                  <p style={smallFont}>
                    Thank <span style={toRight}>{profile[0].total_thanks}</span>
                  </p>
                  <p style={smallFont}>
                    Follower <span style={toRight}>{profile[0].total_friends}</span>
                  </p>
                  <p style={smallFont}>
                    Tag{" "}
                    <span style={toRight}>
                      <a style={{ fontSize: 12 }} onClick={this.handleOpen}>show</a>
                    </span>
                  </p>
                  <p style={smallFont}>
                    Join Date{" "}
                    <span style={toRight}>
                      <i style={{ fontSize: 14, textAlign: "right", }}>{profile[0].join_date}</i>
                    </span>
                  </p>
                  {status == "followed" ? (
                    <Button primary fluid size="small" onClick={() => this.handleBack(profile[0].email)}>unfollow</Button>
                  ) : (
                      <Button primary fluid size="small" onClick={() => this.handleFollow(profile[0].email)}>follow</Button>
                    )}
                </Accordion.Content>
              </Accordion>
            </div>
          )}
      </div>
    );
  }
}
