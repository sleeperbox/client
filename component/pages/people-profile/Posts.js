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
  Form,
  Popup
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";
import '../profile/Hex.css'

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: sessionStorage.getItem("username"),
      email: sessionStorage.getItem("email"),
      email2: localStorage.getItem("email"),
      posting: [],
      tgl: new Date().toDateString(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: new Date().getDay(),
      datemonth: new Date().toDateString().slice(4, -5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      menitPosting: [],
      waktu: [],
      thanks: 0,
      kode: 0,
      loaders: 1,
      thankLoad: true
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentDidMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/posting/people",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result => this.setState({ posting: result.data, isLoading: false }))
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
        url: "http://apps.aprizal.com/api/posting/people",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          username: this.state.username // This is the body part
        }
      }).then(result => this.setState({ posting: result.data, thank: 0 }));
    }
  }

  givethanks(value, value2) {
    axios({
      method: "put",
      url: "http://apps.aprizal.com/api/posting/thanks/post/user",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email2,
        _id: value,
        username: value2 // This is the body part
      }
    }).then((result) => this.setState({ thanks: 1, kode: result.data.kode.kode, thankLoad: false, loaders: 0 }));
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
    window.location = '#/posts?id=' + value + ''
  }

  render() {
    const { posting, kode, thankLoad, loaders } = this.state;
    const nopost = posting.length;
    const textMargin = {
      marginLeft: "2%"
    };
    const imagePost = {
      marginTop: "1.5em"
    };
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : nopost == 0 ? (
          <Container>
            <Divider hidden />
            <Header as="h2" icon textAlign="center" style={{marginTop: 25, marginBottom: 100}}>
              <Icon name="meh" />
              No Post
              <Header.Subheader>
                <i>This user has no post yet, comeback later</i>
              </Header.Subheader>
            </Header>
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
                                onClick={() => this.setState({ loaders: 1 })}
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
                                          <Popup
                                            trigger={
                                              <Icon
                                                name="handshake outline"
                                                size="large"
                                                onClick={() =>
                                                  this.givethanks(
                                                    data._id,
                                                    data.username
                                                  )
                                                }
                                              />
                                            }
                                          >
                                            {
                                              thankLoad == false && loaders == 0 && kode == 0 ? "thank canceled"
                                                :
                                                thankLoad == false && loaders == 0 && kode == 1 ? "thank has been sent"
                                                  :
                                                  "processing..."
                                            }
                                          </Popup>&nbsp;<b>{data.username}</b> {data.content}
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
                                          <b>{data.thanks}</b> thanks <b>{data.comment}</b> comments, <i style={{ color: "#5b90f6" }}>see more...</i>
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
                                  onClick={() => this.setState({ loaders: 1 })}
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
                                            <Popup
                                              trigger={
                                                <Icon
                                                  name="handshake outline"
                                                  size="large"
                                                  onClick={() =>
                                                    this.givethanks(
                                                      data._id,
                                                      data.username
                                                    )
                                                  }
                                                />
                                              }
                                            >
                                              {
                                                thankLoad == false && loaders == 0 && kode == 0 ? "thank canceled"
                                                  :
                                                  thankLoad == false && loaders == 0 && kode == 1 ? "thank has been sent"
                                                    :
                                                    "processing..."
                                              }
                                            </Popup>&nbsp;<b>{data.username}</b> {data.content}
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
                                            <b>{data.thanks}</b> thanks <b>{data.comment}</b> comments, <i style={{ color: "#5b90f6" }}>see more...</i>
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
