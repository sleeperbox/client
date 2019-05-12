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
  Popup,
  Label,
  Form
} from "semantic-ui-react";

import Skeleton from "react-skeleton-loader";
import axios from "axios";
import "./Hex.css";

export default class MyPost extends Component {
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
      preview: null,
      loaders: 1,
      thanksLoad: true
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

  componentWillMount() {}

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
      this.setState({ thanks: 1, kode: result.data.kode.kode, loaders: 0, thankLoad: false })
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
        _id: value
      }
    }).then(this.setState({ modal: false, thanks: 1 }));
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
    const { posting, isLoading, thankLoad, kode, loaders} = this.state;
    const nopost = posting.length;
    // const hexagons = GridGenerator.parallelogram(-1, 2, -1, 0);
    const textMargin = {
      marginLeft: "2%"
    };
    const imagePost = {
      marginTop: "1.5em"
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
            <ul id="grid" className="clear">
              {posting.map((data, index) => {
                return (
                    <li key={data._id}>
                      <div className="hexagon">
                        {data.fotocontent !== null ? (
                          <Modal
                          onClick={() => this.setState({ kode: 0 })}
                            onClose={this.close}
                            closeIcon
                            trigger={
                              <Image
                                src={
                                  "http://aprizal.com/public/posting/foto/" +
                                  data.fotocontent
                                }
                                className="imgzoom"
                                style={imagePost}
                              />
                            }
                          >
                            <Header>
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
                            </Header>

                            <Modal.Content>
                              <Image
                                src={
                                  "http://aprizal.com/public/posting/foto/" +
                                  data.fotocontent
                                }
                              />
                              <Grid>
                                <Grid.Row columns={4} centered textAlign="center">  
                                <Grid.Column width={6} />
                                  <Grid.Column  width={6} /> 
                                  <Grid.Column width={2}>
                                    {/* update */}
                                    <Modal
                                      trigger={
                                          <Icon name="edit" size="large"  onClick={() =>
                                            this.handleOpenUpdate(data._id)
                                          } 
                                          style={{marginLeft: 15}}
                                         />
                                      }
                                      open={this.state.modalupdate}
                                      onClose={this.handleCloseUpdate}
                                    >
                                      <Header content="Edit Posting" />
                                      <Modal.Content>
                                        <Image
                                          src={
                                            "http://aprizal.com/public/posting/foto/" +
                                            data.fotocontent
                                          }
                                        />
                                        <Form>
                                          <textarea
                                            maxLength={250}
                                            name="content"
                                            onChange={this.handlePost}
                                            style={{ border: "none" }}
                                          >
                                            {this.state.content}
                                          </textarea>
                                        </Form>
                                      </Modal.Content>
                                      <Modal.Actions>
                                        <Button
                                          onClick={this.handleCloseUpdate}
                                        >
                                        cancel
                                        </Button>
                                        <Button
                                          primary
                                          onClick={() => this.update()}
                                        >
                                        edit
                                        </Button>
                                      </Modal.Actions>
                                    </Modal>
                                  </Grid.Column>
                                  <Grid.Column width={2}>
                                    {/* delete */}
                                    <Modal
                                    style={{marginTop: 250}}
                                      trigger={
                                          <Icon
                                            name="trash alternate outline"
                                            size="large"
                                            onClick={this.handleOpen}
                                          />
                                      }
                                      open={this.state.modal}
                                      onClose={this.handleClose}
                                      basic
                                    >
                                      <Modal.Content>
                                        <p style={{textAlign: "center"}}>are you sure want to delete this post?</p>
                                      </Modal.Content>
                                      <Modal.Actions>
                                        <center>
                                        <Button
                                          inverted
                                          onClick={() => this.delete(data._id)}
                                        >
                                        yes
                                        </Button>
                                        <Button
                                          onClick={this.handleClose}
                                          inverted
                                        >
                                        no
                                        </Button>
                                        </center>
                                       
                                      </Modal.Actions>
                                    </Modal>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row
                                  style={{
                                    marginTop: "-1.5em",
                                    marginBottom: "-1.5em"
                                  }}
                                >
                                </Grid.Row>
                                <Grid.Row columns={1}>
                                  <GridColumn>
                                    <p
                                      style={{
                                        whiteSpace: "-moz-pre-wrap",
                                        whiteSpace: "-moz-pre-wrap !important",
                                        whiteSpace: "pre-wrap",
                                        whiteSpace: "-webkit-pre-wrap",
                                        wordBreak: "break-all",
                                        whiteSpace: "normal"
                                      }}
                                    >
                                      <b>{data.username}</b> {data.content}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "13px",
                                        float: "left"
                                      }}
                                      onClick={() =>
                                        this.discuss(data.id_posts)
                                      }
                                    >
                                       <b>{data.thanks}</b> thanks <b>{data.comment}</b> comments, <i style={{color: "#5b90f6"}}>see more...</i>
                                    </p>
                                    <br />
                                    <small style={{ float: "right", marginTop: "-18px" }}>
                                      <i>
                                        {data.date.slice(11) == this.state.year
                                          ? data.date.slice(4, -5) ==
                                            this.state.datemonth
                                            ? data.jam == this.state.jam
                                              ? data.menit == this.state.menit
                                                ? "Now"
                                                : this.state.menit -
                                                  data.menit +
                                                  " m ago"
                                              : this.state.jam -
                                                data.jam +
                                                " h ago"
                                            : data.date.slice(4, -5)
                                          : data.date.slice(4)}
                                      </i>
                                    </small>
                                    <br />
                                    <br />
                                  </GridColumn>
                                </Grid.Row>
                              </Grid>
                            </Modal.Content>
                          </Modal>
                        ) : (
                          <Modal
                          onClick={() => this.setState({ kode: 0 })}
                            onClose={this.close}
                            closeIcon
                            trigger={
                              data.tags === "null" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/kategori.png"
                                  width="80%"
                                />
                              ) : data.tags === "computer-gadget" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/komp.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : data.tags === "family-love" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/family.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : data.tags === "fact-rumour" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/f&r.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : data.tags === "business-work" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/bisnis.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : data.tags === "fashion-lifestyle" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/fashion.png"
                                  width="80%"
                                />
                              ) : data.tags === "quotes" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/quotes.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : data.tags === "other" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/other.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : data.tags === "riddles" ? (
                                <Image
                                  src="http://aprizal.com/public/icon/icon/riddle.png"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "black"
                                  }}
                                />
                              ) : null
                            }
                          >
                            <Header>
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
                                    src="http://aprizal.com/public/icon/icon/fr.png"
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
                            </Header>
                            <Modal.Content>
                            <center><small><i>this post has no images...</i></small></center>
                              <Grid>
                                <Grid.Row columns={4}>

                                <Grid.Column width={6} />
                                  <Grid.Column  width={6} /> 
                                  <Grid.Column width={2}>
                                    {/* update */}
                                    <Modal
                                      trigger={
                                          <Icon name="edit" size="large"  onClick={() =>
                                            this.handleOpenUpdate(data._id)
                                          } 
                                          style={{marginLeft: 15}}
                                         />
                                      }
                                      open={this.state.modalupdate}
                                      onClose={this.handleCloseUpdate}
                                    >
                                      <Header sub textAlign="center" size="tiny" content={<div><Icon name="pencil square"/>update your post</div>}/>
                                      <Modal.Content>
                                        <Form>
                                          <textarea
                                            maxLength={250}
                                            name="content"
                                            onChange={this.handlePost}
                                            defaultValue={this.state.content}
                                            />
                                        </Form>
                                      </Modal.Content>
                                      <Modal.Actions>
                                        <Button
                                         primary
                                         onClick={() => this.update()}
                                        >
                                        update
                                        </Button>
                                        <Button
                                          onClick={this.handleCloseUpdate}
                                        >
                                        cancel
                                        </Button>
                                      </Modal.Actions>
                                    </Modal>
                                  </Grid.Column>
                                  <Grid.Column width={2}>
                                    {/* delete */}
                                    <Modal
                                      trigger={
                                          <Icon
                                            name="trash alternate outline"
                                            size="large"
                                            onClick={this.handleOpen}
                                          />
                                      }
                                      open={this.state.modal}
                                      onClose={this.handleClose}
                                      basic
                                    >
                                      <Modal.Content>
                                        <p style={{textAlign: "center"}}>are you sure want to delete this post?</p>
                                      </Modal.Content>
                                      <Modal.Actions>
                                        <center>
                                        <Button
                                          inverted
                                          onClick={() => this.delete(data._id)}
                                        >
                                        yes
                                        </Button>
                                        <Button
                                          onClick={this.handleClose}
                                          inverted
                                        >
                                        no
                                        </Button>
                                        </center>
                                       
                                      </Modal.Actions>
                                    </Modal>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row
                                  style={{
                                    marginTop: "-1.5em",
                                    marginBottom: "-1.5em"
                                  }}
                                >
                                </Grid.Row>
                                <Grid.Row columns={1}>
                                  <GridColumn>
                                    <p
                                      style={{
                                        whiteSpace: "-moz-pre-wrap",
                                        whiteSpace: "-moz-pre-wrap !important",
                                        whiteSpace: "pre-wrap",
                                        whiteSpace: "-webkit-pre-wrap",
                                        wordBreak: "break-all",
                                        whiteSpace: "normal"
                                      }}
                                    >
                                      <b>{data.username}</b> {data.content}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "13px",
                                        float: "left"
                                      }}
                                      onClick={() =>
                                        this.discuss(data.id_posts)
                                      }
                                    >
                                       <b>{data.thanks}</b> thanks <b>{data.comment}</b> comments, <i style={{color: "#5b90f6"}}>see more...</i>
                                    </p>
                                    <br />
                                    <small style={{ float: "right", marginTop: "-18px" }}>
                                      <i>
                                        {data.date.slice(11) == this.state.year
                                          ? data.date.slice(4, -5) ==
                                            this.state.datemonth
                                            ? data.jam == this.state.jam
                                              ? data.menit == this.state.menit
                                                ? "Now"
                                                : this.state.menit -
                                                  data.menit +
                                                  " m ago"
                                              : this.state.jam -
                                                data.jam +
                                                " h ago"
                                            : data.date.slice(4, -5)
                                          : data.date.slice(4)}
                                      </i>
                                    </small>
                                    <br />
                                    <br />
                                  </GridColumn>
                                </Grid.Row>
                              </Grid>
                            </Modal.Content>
                          </Modal>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
            </Segment>
          </Container>
        )}
      </div>
    );
  }
}
