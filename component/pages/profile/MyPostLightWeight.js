import React, { Component } from "react";
import {
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  GridColumn,
  List,
  Header,
  Image,
  Popup,
  GridRow,
  Modal,
  Label,
  Button

} from "semantic-ui-react";

import Skeleton from "react-skeleton-loader";
import axios from "axios";
import "./Hex.css"

export default class MyPostLightWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: localStorage.getItem("email"),
      posting: [],
      tgl: new Date().toDateString(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: new Date().getDay(),
      datemonth: new Date().toDateString().slice(4, -5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      thanks: 0,
      kode_post: 0,
      options: [],
      contents: [],
      tags: "",
      file: null,
      value: "null",
      kode: 0,
      tag: 0,
      post: 0,
      s: 0,
      fotocontent: null,
      id: null,
      post: null,
      modal: false,
      modalupdate: false,
      modalDiscuss: false,
      content: "",
      preview: null
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.givethanks = this.givethanks.bind(this);
    this.delete = this.delete.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleOpen = () => this.setState({ modal: true });

  handleClose = () => this.setState({ modal: false });

  handleCloseUpdate = () =>
    this.setState({ modalupdate: false, preview: null });

  componentWillMount() { }

  componentDidMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/posting/profile",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result =>
      this.setState({
        posting: result.data,
        jamm: result.data,
        isLoading: false
      })
    );

    axios({
      method: "get",
      url: "http://apps.aprizal.com/api/tags",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result => this.setState({ options: result.data }));
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.thanks == 1) {
      axios({
        method: "post",
        url: "http://apps.aprizal.com/api/posting/profile",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: this.state.email // This is the body part
        }
      }).then(result => this.setState({ posting: result.data, thanks: 0 }));
    }
  }
  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  givethanks(value) {
    axios({
      method: "put",
      url: "http://apps.aprizal.com/api/posting/thanks/up",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        _id: value // This is the body part
      }
    }).then(result =>
      this.setState({ thanks: 1, kode: result.data.kode.kode })
    );
  }
  delete(value) {
    axios({
      method: "delete",
      url: "http://apps.aprizal.com/api/posting/delete",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        _id: value,
      }
    }).then(this.setState({ modal: false, thanks: 1, }, () => window.location.reload()));
  }


  handleOpen(value, postid) {
    this.setState({ modal: true, id: value, post: postid });
  }

  handleOpenUpdate(value) {
    this.setState({ id: value });
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/posting/detail",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        _id: value
      }
    }).then(result =>
      this.setState({
        modalupdate: true,
        contents: result.data,
        content: result.data.content,
        tags: result.data.tags
      })
    );
  }

  update() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/posting/update",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id: this.state.id,
        content: this.state.content,
        tags: this.state.tags,
        kode_post: 1
      }
    }).then(this.setState({ modalupdate: false, thanks: 1 }));
  }



  generateSkeleton() {
    return (
      <div>
        <Container>
          <Grid>
            <GridColumn>
              <Segment basic>
                <List>
                  <List.Item>
                    <List.Content>
                      <List.Header as="a">
                        <Skeleton width="10px" height="10px" />
                      </List.Header>
                      <List.Description>
                        <Skeleton />
                        <a>
                          <b>
                            <Skeleton />
                          </b>
                        </a>{" "}
                        <small>
                          <i>
                            <Skeleton />
                          </i>
                        </small>
                        .
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <Divider clearing />
                  <List.Item>
                    <List.Content>
                      <List.Header as="a">
                        <Skeleton width="10px" height="10px" />
                      </List.Header>
                      <List.Description>
                        <Skeleton />
                        <a>
                          <b>
                            <Skeleton />
                          </b>
                        </a>{" "}
                        <small>
                          <i>
                            <Skeleton />
                          </i>
                        </small>
                        .
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }

  discuss(value) {
    window.location = "#/posts?id=" + value + "";
  }

  setValue(e, data) {
    this.setState({ tags: data.value });
  }

  fileHandler = event => {
    this.setState({
      file: event.target.files[0],
      fotocontent: 1,
      preview: URL.createObjectURL(event.target.files[0])
    });
  };

  render() {
    const { posting, isLoading } = this.state;
    const nopost = posting.length;
    const listMargin = {
      marginBottom: "20px"
    };
    const gridMargin = {
      marginBottom: "-80px"
    };
    const textMargin = {
      marginLeft: "2%"
    };
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : nopost == 0 ? (
          <Container>
            <Header as="h2" icon textAlign="center">
              <Icon name="wordpress forms" />
              No Post
              <Header.Subheader>
                <i>You Have No Post Yet, Make It Now!</i>
              </Header.Subheader>
            </Header>
            <Divider hidden />
          </Container>
        ) : (
              <div style={{ marginTop: -30, marginBottom: 50 }}>
                <Segment basic>
                  {posting.map((data, index) => {
                    return (
                      <Grid columns={1} key={data._id} style={gridMargin}>
                        <GridColumn>
                          <GridRow>
                            {/* delete */}
                            <Modal
                              trigger={<Label onClick={this.handleOpen} style={{ color: "black", border: "1", float: "right", background: "transparent", marginTop: -8, marginRight: -22 }}><Icon name="trash alternate outline" size="large" /></Label>}
                              open={this.state.modal}
                              onClose={this.handleClose}
                              basic
                            >
                              <Header icon="trash alternate outline" size="large" content="Delete Posting!" />
                              <Modal.Content>
                                <p>Are You Sure?</p>
                              </Modal.Content>
                              <Modal.Actions>
                                <Button inverted onClick={() => this.delete(data._id)}>
                                  <Icon name="checkmark" /> Yes
                                        </Button>
                                <Button onClick={this.handleClose} inverted>
                                  <Icon name="remove" /> No
                                        </Button>
                              </Modal.Actions>
                            </Modal>
                            <List style={listMargin}>
                              <List.Item>
                                <List.Content>
                                  <List.Header as="a">
                                    <small>
                                      {data.tags === "null" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/kategori.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "computer-gadget" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/komp.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "family-love" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/family.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "fact-rumour" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/f&r.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "business-work" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/bisnis.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "fashion-lifestyle" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/fashion.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "quotes" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/quotes.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "other" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/other.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : data.tags === "riddles" ? (
                                        <Image
                                          src="http://aprizal.com/public/icon/icon/riddle.png"
                                          width="7%"
                                          style={{ float: "left" }}
                                        />
                                      ) : null}
                                    </small>
                                    <small>
                                      <i style={textMargin}>{data.tags}</i>
                                    </small>
                                  </List.Header>
                                  <br />
                                  <List.Description>
                                    {data.fotocontent !== null ?
                                      <Image
                                        src={"http://aprizal.com/public/posting/foto/" + data.fotocontent}
                                        size="large" /> : null}
                                    <br />
                                    <b>{data.content}</b>
                                    <br />
                                    <br />
                                    <Popup
                                      trigger={
                                        <Icon
                                          name="handshake outline"
                                          onClick={() => this.givethanks(data._id, data.username)}
                                        />}>{this.state.kode == 1 ? "Anda Telah Thanks"
                                          : "Anda Telah UnThanks"}
                                    </Popup>
                                    <small>
                                      <i>{data.thanks} Thanks </i>
                                    </small>
                                    <br />
                                    <br />
                                    <a onClick={() => this.discuss(data.id_posts)}>comment</a>
                                    <small style={{ float: "right" }}>
                                      <i>
                                        {
                                          data.date.slice(11) == this.state.year ? data.date.slice(4, -5) == this.state.datemonth ? data.jam == this.state.jam ? data.menit == this.state.menit ? "Now"
                                            : this.state.menit - data.menit + " m ago" : this.state.jam - data.jam + " h ago" : data.date.slice(4, -5) : data.date.slice(4)
                                        }
                                      </i>
                                    </small>
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                            </List>
                          </GridRow>
                          <Divider fitted />
                        </GridColumn>
                        <Divider hidden />
                      </Grid>
                    );
                  })}
                  <Divider hidden />
                </Segment>
              </div>
            )}
      </div>
    );
  }
}