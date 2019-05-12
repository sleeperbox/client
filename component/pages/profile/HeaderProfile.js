import React, { Component } from "react";
import Skeleton from "react-skeleton-loader";
import { Grid, Container, Accordion, Divider, Image, Icon, Header, Modal, Button, Popup } from "semantic-ui-react";
import axios from "axios";
import MoreCategory from './MoreCategory'
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
      activeIndex: 0,
      myPoint: 0 
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentWillMount() {
    const { hour, total_posts, total_thanks } = this.state;
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/profile",
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
      url: "http://apps.aprizal.com/api/user/avatar",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ foto: result.data }));
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/user/point",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({myPoint: result.data.total_score}))
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
      myPoint,
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
      fontSize: 14,
    };
    const toRight = {
      float: "right",
    };

    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
          <div>
                  <Accordion fluid styled>
                    <Accordion.Title style={{background: "#5b90f6", color: "#fff", width: "100%",position: "fixed", top: 0, zIndex: 998}} active={activeIndex === 1} index={1} onClick={this.handleClick}>
                    <span style={{fontSize: '16px'}}>
                      <Icon name='dropdown' />
                      your profile menu
                    </span>
                    </Accordion.Title>
                    <Divider hidden/>
                    <Divider hidden/>
                    <Accordion.Content  active={activeIndex === 1}>
                        <Image
                        style={{
                            border: "1px solid #555",
                            maxHeight: "700px",
                            minWidth: "100%",
                            maxWidth: "100%"
                        }}
                        src={"http://aprizal.com/public/avatar/" + this.state.foto}
                      />
                      <br/>
                      <p style={smallFont}>
                                  Username <span style={toRight}>@{username}</span>
                                </p>
                                <p style={smallFont}>
                                Point <span style={toRight}><b>{myPoint}</b></span>
                                </p>
                                <p style={smallFont}>
                                  Post <span style={toRight}>{total_posts}</span>
                                </p>
                                <p style={smallFont}>
                                  Thank <span style={toRight}>{total_thanks}</span>
                                </p>
                                <p style={smallFont}>
                                Follower <span style={toRight}>{total_friends}</span>
                                </p>
                                <p style={smallFont}>
                                Tag{" "}
                                  <span style={toRight}>
                                    <i style={{fontSize: 14}}>{followed_topic}</i>
                                  </span>
                                </p>
                                <p style={smallFont}>
                                  Join Date{" "}
                                  <span style={toRight}>
                                    <i style={{fontSize: 14}}>{join_date}</i>
                                  </span>
                                </p>
                        <MoreCategory/>
                    </Accordion.Content>
                    </Accordion>           
          </div>
        )}
      </div>
    );
  }
}
