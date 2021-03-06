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
  GridRow,
  Header
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class PostingOther extends Component {
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
      menitPosting: [],
      waktu: [],
      thanks: 0,
      kode: 0,
      modal: false  ,loaders: 1,
      thankLoad: true
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.givethanks = this.givethanks.bind(this);
  }

  handleOpen = () => this.setState({ modal: true });

  handleClose = () => this.setState({ modal: false });

  componentDidMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/posting/home/quotes",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result =>
      this.setState({ posting: result.data, isLoading: false })
    );
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
        url: "http://apps.aprizal.com/api/posting/home/quotes",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(result => this.setState({ posting: result.data, thanks: 0 }, () => window.location.reload()));
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
        email: this.state.email,
        _id: value,
        username: value2 // This is the body part
      }
    }).then(result =>
      this.setState({ thanks: 1, kode: result.data.kode.kode, thankLoad: false, loaders: 0  })
    );
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

  render() {
    const { posting, isLoading, thankLoad, loaders, kode } = this.state;
    const gridMargin = {
      marginBottom: "20px"
    };
    const textMargin = {
      fontSize: "13px",
      color: "#222"
    };
    return (
      <div style={{minHeight: "465px"}}>
      {isLoading ? (
        this.generateSkeleton()
      ) : posting.length === 0 ? <center>
      <div style={{marginTop: 125}}>
      <Header as="h2" icon textAlign="center">
            <Icon name="wordpress forms" />
            No Post
            <Header.Subheader>
            <i>Make It Now For This Category</i>
            </Header.Subheader>
          </Header>
      </div>
    </center> : (
         <Container>
              {posting.map((data, index) => {
                return (
                  <Grid columns={1} key={data._id}>
                    <GridColumn>
                      <GridRow>
                        <List style={gridMargin}>
                          <List.Item>
                            <List.Content>
                              <List verticalAlign="middle">
                                <List.Item>
                                  <Image
                                    avatar
                                    size="small"
                                    circular
                                    src={
                                      "http://aprizal.com/public/avatar/" +
                                      data.foto
                                    }
                                    style={{ width:"30px", height:"30px" }}
                                  />
                                  <List.Content>
                                    <List.Header as="a">
                                      <span style={textMargin}>
                                        {data.username}
                                      </span>
                                    </List.Header>
                                  </List.Content>
                                </List.Item>
                              </List>
                              <br />
                              <List.Description>
                                {data.fotocontent !== null ? (
                                  <Image
                                    src={
                                      "http://aprizal.com/public/posting/foto/" +
                                      data.fotocontent
                                    }
                                    size="large"
                                  />
                                ) : null}
                                <br />
                                <div>
                                  <p style={{
                                    whiteSpace: "-moz-pre-wrap",
                                    whiteSpace: "-moz-pre-wrap !important",
                                    whiteSpace: "pre-wrap",
                                    whiteSpace: "-webkit-pre-wrap",
                                    wordBreak: "break-all",
                                    whiteSpace: "normal"
                                  }}><b>{data.username}</b> {data.content}</p>
                                </div>

                                <br />
                                <br />
                                <Popup
                                  trigger={
                                    <Icon
                                      name="handshake outline"
                                      onClick={() => this.givethanks(data._id, data.username)}
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
                                </Popup>
                                <small>
                                  <i>{data.thanks} Thanks </i>
                                </small>
                                <br />
                                <br />
                                <p
                                  style={{
                                    fontSize: "13px",
                                    float:"left"
                                  }}
                                  onClick={() => this.discuss(data.id_posts)}
                                >
                                  <b>{data.comment}</b> comments, <i style={{color: "#5b90f6"}}>see more...</i>
                                </p>
                                <small style={{ float: "right" }}>
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
                                          : this.state.jam - data.jam + " h ago"
                                        : data.date.slice(4, -5)
                                      : data.date.slice(4)}
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
              <Divider hidden />
            </Container>
        )}
      </div>
    );
  }
}
