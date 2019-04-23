import React, { Component } from "react";
import {
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  GridColumn,
  List,
  Dimmer,
  Header,
  Image,
  Popup,
  GridRow
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: sessionStorage.getItem("username"),
      email: sessionStorage.getItem("email"),
      email2: localStorage.getItem("email").slice(1, -1),
      posting: [],
      tgl: new Date().toDateString(),
      month: new Date().getMonth(),
      year : new Date().getFullYear(),
      date: new Date().getDay(),
      datemonth: new Date().toDateString().slice(4, -5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      menitPosting: [],
      waktu: [],
      thanks: 0,
      kode: 0
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentDidMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/posting/people",
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
        url: "http://192.168.100.18:8080/api/posting/people",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          username: this.state.username // This is the body part
        }
      }).then(result => this.setState({ posting: result.data }));
    }
  }

  givethanks(value, value2) {
    axios({
      method: "put",
      url: "http://192.168.100.18:8080/api/posting/thanks/post/user",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email2,
        _id: value,
        username : value2 // This is the body part
      }
    }).then((result) => this.setState({ thanks: 1, kode: result.data.kode.kode}));
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
    window.location = '#/posts?id='+ value + '' 
  }

  render() {
    const { posting } = this.state;
    const { thankpost } = this.state;
    const nopost = posting.length;
    const { isLoading } = this.state;
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
            <Divider hidden />
            <Header as="h2" icon textAlign="center">
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
              {posting.map((data, index) => {
                return (
                  <Grid columns={1} key={data._id} style={gridMargin}>
                    <GridColumn>
                      <GridRow>
                        <List style={listMargin}>
                          <List.Item>
                            <List.Content>
                              <List.Header as="a">
                                <small>
                                {data.tags === "null" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/kategori.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "computer-gadget" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/komp.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "family-love" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/family.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fact-rumour" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/fr.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "business-work" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/bisnis.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fashion-lifestyle" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/fashion.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "quotes" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/quotes.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "other" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/other.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "riddles" ? (
                                  <Image
                                    src="http://192.168.100.18/src/web-api/public/icon/riddle.png"
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
                              { data.fotocontent !== null ? 
                              <Image
                                src={"http://192.168.100.18/src/web-api/public/posting/foto/" + data.fotocontent}
                                size="large" /> : null }
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
                                <br/>
                                <br/>
                                <a onClick= {() => this.discuss(data.id_posts)}>comment</a>
                                <small style={{ float: "right" }}>
                                  <i>
                                  {
                                  data.date.slice(11) == this.state.year ? data.date.slice(4, -5) == this.state.datemonth ? data.jam == this.state.jam ? data.menit == this.state.menit ? "Now"
                                  : this.state.menit - data.menit + " m ago"  : this.state.jam - data.jam + " h ago" : data.date.slice(4, -5) : data.date.slice(4)
                                  }
                                  </i>
                                </small>
                                </List.Description>
                            </List.Content>
                          </List.Item>
                        </List>
                        <Divider fitted />
                      </GridRow>
                      <Divider hidden />
                    </GridColumn>
                    <Divider hidden />
                  </Grid>
                );
              })}
              <Divider hidden />
            </Segment>
          </Container>
        )}
      </div>
    );
  }
}
