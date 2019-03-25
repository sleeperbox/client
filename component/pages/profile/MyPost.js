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
  Modal,
  Button,
  Popup

} from "semantic-ui-react";

import Skeleton from "react-skeleton-loader";
import axios from "axios";
import "./Hex.css"

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: localStorage.getItem("email").slice(1, -1),
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

  handleClose = () => this.setState({ modal: false });

  handleCloseUpdate = () =>
    this.setState({ modalupdate: false, preview: null });

  componentWillMount() {}

  componentDidMount() {
    axios({
      method: "post",
      url: "/api/posting/profile",
      headers: {
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
      url: "/api/tags",
      headers: {
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
        url: "/api/posting/profile",
        headers: {
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
      url: "/api/posting/thanks/up",
      headers: {
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

  delete() {
    axios({
      method: "delete",
      url: "/api/posting/delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        _id: this.state.id,
        id_posts: this.state.post,
      }
    }).then(this.setState({ modal: false, thanks: 1 }));
  }

  handleOpen(value, postid) {
    this.setState({ modal: true, id: value, post: postid});
    console.log(postid)
  }

  handleOpenUpdate(value) {
    this.setState({ id: value });
    axios({
      method: "post",
      url: "/api/posting/detail",
      headers: {
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
      url: "/api/posting/update",
      headers: {
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
    const { posting, isLoading, dimmer} = this.state;
    const nopost = posting.length;
    // const hexagons = GridGenerator.parallelogram(-1, 2, -1, 0);
    const gridMargin = {
      marginBottom: "40px"
    };
    const textMargin = {
      marginLeft: "2%"
    };
    const postSize = {
      width: "1%",
      float: "left"
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
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Container>
        ) : (
          <Container>
            <Segment basic>
            
            <ul id="grid" className="clear" style={{marginTop: -45}}>
              {posting.map((data, index) => {
                return (
                    <li key={data._id}>
                      <div className="hexagon">       
                        { data.fotocontent !== null ? 
                          (<Modal 
                            onClose={this.close} closeIcon
                            trigger={<Image
                              src={"http://localhost:3000/src/web-api/public/posting/foto/" + data.fotocontent}
                              style={{
                                height: "100%",
                                width: "100%"
                            }}
                            />} 
                            >
                            <Header ><small>
                                {data.tags === "null" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/kategori.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "computer-gadget" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/komp.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "family-love" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/family.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fact-rumour" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/fr.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "business-work" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/bisnis.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fashion-lifestyle" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/fashion.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "quotes" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/quotes.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "other" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/other.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "riddles" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/riddle.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : null}
                                </small>

                                <small>
                                  <i style={textMargin}>{data.tags}</i>
                                </small></Header>

                              <Modal.Content>
                                <Image
                                  src={"http://localhost:3000/src/web-api/public/posting/foto/" + data.fotocontent}
                                  />
                                <Grid>
                                  <Grid.Row columns={4}>
                                    <Grid.Column>
                                      {/* thanks */}
                                      <Popup trigger={
                                      <Icon
                                        name="handshake outline"
                                        size='large'
                                        onClick={() => this.givethanks(data._id)}
                                      />}>{this.state.kode == 1 ? "Anda Telah Thanks" 
                                          : "Anda Telah UnThanks"}
                                      </Popup>
                                      <br />
                                      <small>
                                        <i> {data.thanks} Thanks </i>
                                      </small>
                                    </Grid.Column>
                                    <Grid.Column style={{marginLeft: -50}}>
                                      {/* Coment */}                                
                                      <Icon 
                                        name="facebook messenger"
                                        size='large'
                                        onClick= {() => this.discuss(data.id_posts)}
                                      />{this.state.comment}
                                    </Grid.Column>
                                    <Grid.Column></Grid.Column>
                                    
                                    <Grid.Column style={{marginLeft: 50}}>
                                      {/* delete */}
                                      <Modal
                                        trigger={
                                          
                                          <Icon onClick={this.handleOpen} name="trash alternate outline" size='large'style={{marginLeft: 30}}/>
                                        }
                                        open={this.state.modal}
                                        onClose={this.handleClose}
                                        basic
                                      >
                                        <Header icon="trash alternate outline" content="Delete Posting!" />
                                        <Modal.Content>
                                          <p>Are You Sure?</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                        <Button onClick={this.handleClose} inverted>
                                          <Icon name="remove" /> No
                                        </Button>
                                        <Button inverted onClick={() => this.delete(data._id)}>
                                          <Icon name="checkmark" /> Yes
                                        </Button>

                                        </Modal.Actions>
                                      </Modal>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row columns={1}>
                                    <GridColumn>
                                      <b style={{fontSize: 15}}>{data.content}.</b>
                                        <small>
                                          <i>
                                          {
                                            data.date.slice(11) == this.state.year ? data.date.slice(4, -5) == this.state.datemonth ? data.jam == this.state.jam ? data.menit == this.state.menit ? "Now" 
                                            : this.state.menit - data.menit + " m ago"  : this.state.jam - data.jam + " h ago" : data.date.slice(4, -5) : data.date.slice(4)
                                          }
                                          </i>
                                        </small>
                                        <br />
                                        <br />
                                 
                                    </GridColumn>
                                  </Grid.Row>
                                  
                                </Grid>                      
                              </Modal.Content>
                          </Modal>) : null
                          }
                                
                      </div>
                    </li>
                );
              })}
              </ul>
              <Divider hidden/>
              <Divider hidden/>
              <Divider hidden/>
              <Divider hidden/>
              <Divider hidden/>
            </Segment>
          </Container>
        )}
      </div>
    );
  }
}
