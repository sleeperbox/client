import React, { Component } from "react";
import {
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  GridColumn,
  List,
  Image,
  Popup,
  GridRow
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class PostingOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: localStorage.getItem("email").slice(1, -1),
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
      kode: 0,
      modal: false
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.givethanks = this.givethanks.bind(this);
  }

  handleOpen = () => this.setState({ modal: true });

  handleClose = () => this.setState({ modal: false });

  componentDidMount() {
    axios({
      method: "post",
      url: "/api/posting/home/bussiness-work",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }).then(result => this.setState({ posting: result.data, isLoading: false }));
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
        url: "/api/posting/home/bussiness-work",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      }).then(result => this.setState({ posting: result.data, thanks: 0 }));
      
    }
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

  render() {
    
    const { posting, isLoading } = this.state;
    const gridMargin = {
      marginBottom: "40px"
    };
    const textMargin = {
      marginLeft: "2%"
    };
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            <Segment basic>
              {posting.map((data, index) => {
                return (
                  <Grid columns={1} key={data._id}>
                    <GridColumn>
                      <GridRow>
                        <List style={gridMargin}>
                          <List.Item>
                            <List.Content>
                              <List.Header as="a">
                                <small>
                                {data.tags === "null" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/pilihkategori.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "computer-gadget" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/komputergadget.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "family-love" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/keluargaasmara.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fact-rumour" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/faktarumor.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "business-work" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/bisnispekerjaan.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fashion-lifestyle" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/fashion.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "quotes" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/quotes.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "other" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/lainnya.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "riddles" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/riddle.png"
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
                              <b>{data.content}</b>
                              <br />
                              <br />
                                <Popup trigger={
                                <Icon
                                  name="handshake outline"
                                  onClick={() => this.givethanks(data._id)}
                                />}>{this.state.kode == 1 ? "Anda Telah Thanks" 
                                    : "Anda Telah UnThanks"}
                                </Popup>
                              <small>
                                <i>{data.thanks} Thanks </i>
                              </small>
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
                    </GridColumn>
                  </Grid>
                );
              })}
              <Divider hidden/>
            </Segment>
          </Container>
        )}
      </div>
    );
  }
}
