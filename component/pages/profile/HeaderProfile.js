import React, { Component } from "react";
import Skeleton from "react-skeleton-loader";
import { Grid, Container, Accordion, Divider, Image, Icon, Header, Modal, Button, Popup } from "semantic-ui-react";
import axios from "axios";
export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      isLoading: true,
      username: "",
      first_name: "",
      last_name: "",
      awards: 0,
      total_friends: 0,
      total_posts: 0,
      total_thanks: 0,
      join_date: "",
      background: "",
      img_posts: "",
      img_thanks: "",
      followed_topic: "other",
      foto: "",
      time: new Date(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      coloring: "",
      activeIndex: 0
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentWillMount() {
    const { hour, total_posts, total_thanks } = this.state;

    axios({
      method: "post",
      url: "http://192.168.100.66:8080/api/profile",
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
        username: result.data.username,
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        awards: result.data.awards,
        total_friends: result.data.total_friends,
        total_posts: result.data.total_posts,
        total_thanks: result.data.total_thanks,
        join_date: result.data.join_date,
        followed_topic: result.data.tags
      })
    );

    axios({
      method: "post",
      url: "http://192.168.100.66:8080/api/user/avatar",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ foto: result.data }));

    if (hour > 5 && hour < 10) {
      this.setState({
        background: "http://hdbackgroundspic.com/wp-content/uploads/2017/04/beautiful-view-good-morning.jpg",
        coloring: "#625D5D"
      });
    } else if (hour > 9 && hour < 15) {
      this.setState({
        background: "https://c1.staticflickr.com/6/5010/5344146801_e8e2cea999_b.jpg",
        coloring: "#3D3C3A"
      });
    } else if (hour > 14 && hour < 18) {
      this.setState({
        background:
          "https://www.desktop-background.com/p/2014/02/13/716536_1024x1024-beautiful-beach-sunset-wallpapers_1024x1024_h.jpg",
        coloring: "#f0f0f0"
      });
    } else {
      this.setState({
        background: "http://www.tabletwallpapers.org/download/stars-and-snow-night-in-the-alps-wallpaper_1024x1024.jpg",
        coloring: "white"
      });
    }

    if (total_posts == 0) {
      this.setState({ img_posts: "" });
    } else if (total_posts == 1 || total_posts < 10) {
      this.setState({ img_posts: "" });
    } else if (total_posts == 11 || total_posts > 50) {
      this.setState({ img_posts: "" });
    }

    if (total_thanks == 0) {
      this.setState({ img_thanks: "" });
    } else if (total_thanks == 1 || total_thanks < 10) {
      this.setState({ img_thanks: "" });
    } else if (total_thanks == 11 || total_thanks > 50) {
      this.setState({ img_thanks: "" });
    }
  }

  componentDidMount() {
    if(this.state.email){
      this.setState({ isLoading: false });
    }
  }

  post() {
    event.preventDefault();
    localStorage.setItem("tag", JSON.stringify(this.state.followed_topic));
    window.location = "#/TagsPost/" + this.state.followed_topic;
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

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const {
      username,
      first_name,
      last_name,
      awards,
      total_friends,
      total_posts,
      total_thanks,
      join_date,
      followed_topic,
      activeIndex,
      isLoading
    } = this.state;

    //set user data caching
    localStorage.setItem("username", username);
    localStorage.setItem("first_name", first_name);
    localStorage.setItem("last_name", last_name);

    //simple css styling
    const smallFont = {
      fontSize: 10,
    };
    const toRight = {
      float: "right",
    };

    const popupStyle = {
      borderRadius: 0,
      opacity: 0.7,
      padding: '0.5em',
    }

    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            <Grid columns={1} style={{ background: "#5190ed" }}> 
              <Grid.Row style={{marginTop: 20}}>
                <Grid.Column>
                  <Accordion fluid styled>
                    <Accordion.Title  active={activeIndex === 1} index={1} onClick={this.handleClick}>
                      <Icon name='dropdown' />
                      Your public profile
                    </Accordion.Title>
                    <Accordion.Content  active={activeIndex === 1}>
                    <center style={{marginTop: 1}}>
                        <Image
                        style={{
                            alignSelf: 'center',
                            height: 140, 
                            width: 140, 
                            borderWidth: 1, 
                            borderRadius:70
                        }}
                        src={"http://aprizal.com/public/avatar/" + this.state.foto}
                      />
                      </center> 
                      <p style={smallFont}>
                                  Username <span style={toRight}>@{username}</span>
                                </p>
                                <p style={smallFont}>
                                  Posts <span style={toRight}>{total_posts}</span>
                                </p>
                                <p style={smallFont}>
                                  Thanks <span style={toRight}>{total_thanks}</span>
                                </p>
                                <p style={smallFont}>
                                Influencing <span style={toRight}>{total_friends} person</span>
                                </p>
                                <p style={smallFont}>
                                  Awards <span style={toRight}>{awards}</span>
                                </p>
                                <p style={smallFont}>
                                  Tags{" "}
                                  <span style={toRight}>
                                    <i>{followed_topic}</i>
                                  </span>
                                </p>
                                <p style={smallFont}>
                                  Join Date{" "}
                                  <span style={toRight}>
                                    <i>{join_date}</i>
                                  </span>
                                </p>
                    </Accordion.Content>
                    </Accordion>           
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </div>
    );
  }
}
