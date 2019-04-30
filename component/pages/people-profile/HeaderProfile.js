import React, { Component } from "react";
import { Container, Grid, Divider, Image, Segment, Modal, Button, Message, Icon } from "semantic-ui-react";
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
      msg: false
    };
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.33:8080/api/people/profile/get",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result =>
      this.setState({ profile: result.data, temp_total: result.data.total_friends }, () => {
        let stat = {
          email: this.state.email,
          email_friend: this.state.profile[0].email
        };
        axios({
          method: "post",
          url: "http://192.168.100.33:8080/api/follow/status",
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

  handleFollow(value) {
    let add = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "post",
      url: "http://192.168.100.33:8080/api/follow",
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
        <p style={{ textAlign: "center" }}>
          stop influence <b>{sessionStorage.getItem("username")}</b>?
        </p>
        <center>
          <Button basic inverted onClick={() => this.handleUnfollow(this.state.emailFriend)} style={{ margin: 5 }}>Yes</Button>
          <Button basic inverted onClick={() => this.handleBackClose()} style={{ float: "right" }} style={{ margin: 5 }}>No</Button>
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
      url: "http://192.168.100.33:8080/api/unfollow",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: unfoll
    }).then(result => this.setState({ status: result.data.status, open: false }));
  }

  handleCloseMsg() {
    this.setState({msg: false})
  }

  snackBar() {
    const {msg} = this.state
    return <div style={{position: "fixed", bottom: 0, zIndex: 99, minWidth: "100%"}}>
    {msg ? (
           <Message color='black' style={{textAlign: "center"}} onDismiss={() => this.handleCloseMsg()}>now you are influence to {sessionStorage.getItem("username")}</Message>
    ) : null}
    </div>
  }

  render() {
    const { profile, status, openSnackbar } = this.state
    return (
      <div style={{ marginBottom: 15 }}>
        {open ? this.unfollowConfirmation() : null}
        {openSnackbar ? this.snackBar() : null}
        <Container>
          {profile.map(data => {
            var removeSpace = data.foto.split(' ').join('%20')
            const peoplePhoto = "http://aprizal.com/public/avatar/" + removeSpace
            return (
              <Grid columns={1} key={data._id}>
                <Grid.Row style={{
                  backgroundImage: 'url(' + peoplePhoto + ')',
                  backgroundSize: 'cover',
                  overflow: 'hidden',
                  maxHeight: 325,
                  minHeight: 275,
                  height: 300
                }}>
                  <Grid.Column>
                    <Segment basic textAlign="center">
                      {status === "followed" ? (
                        <Button
                          circular
                          size='big'
                          icon='close'
                          style={{
                            float: "right",
                            zIndex: 1,
                            position: "relative",
                            margin: 0,
                            background: "#5b90f6",
                            color: "white",
                            marginRight: -10,
                            marginTop: -10,
                            boxShadow: "0 8px 6px -6px black"
                          }}
                          onClick={() => this.handleBack(data.email)}
                        />) : (
                          <Button
                            circular
                            size='big'
                            icon='plus'
                            style={{
                              float: "right",
                              zIndex: 1,
                              position: "relative",
                              margin: 0,
                              marginRight: -10,
                              marginTop: -10,
                              background: "#5b90f6",
                              color: "white",
                              boxShadow: "0 8px 6px -6px black"
                            }}
                            onClick={() => this.handleFollow(data.email)}
                          />
                        )}
                    </Segment>
                  </Grid.Column>

                </Grid.Row>
                <div style={{ minWidth: "100%", background: "#5190ed", color: "#f7f7f7", textAlign: "center" }}>
                  <h4 style={{ margin: 5 }}>{data.first_name} {data.last_name}</h4>
                </div>
              </Grid>
            );
          })}
        </Container>
      </div>
    );
  }
}
