import React, { Component } from "react";
import {
  Container,
  Comment,
  Icon,
  Item,
  Image,
  Divider,
  Input,
  Form,
  ItemMeta,
  Modal,
  Header,
  Button,
  CommentAvatar
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: localStorage.getItem("username"),
      posts: [],
      commentByPostId: [],
      comment: "",
      message: "",
      modalOpen: false,
      comments: 0,
      tgl: new Date().toDateString(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: new Date().getDay(),
      datemonth: new Date().toDateString().slice(4, -5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      id: null,
      url: window.location.href.split("=")[1]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose = () => this.setState({ modalOpen: false });


  componentWillMount() {
    axios.get("/api/posts/" + this.state.url).then(response => {
      this.setState({ posts: response.data });
    });
    axios({
      method: "POST",
      url: "http://192.168.100.18:8080/api/comments",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id_posts: this.state.url
      }
    }).then(result => this.setState({ commentByPostId: result.data }));
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments == 1) {
      axios({
        method: "POST",
        url: "http://192.168.100.18:8080/api/comments",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          id_posts: this.state.url
        }
      }).then(result => this.setState({ commentByPostId: result.data }));
    }
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://192.168.100.18:8080/api/posts/comments",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id_posts: this.state.url,
        email: this.state.email,
        username: this.state.username,
        comment: this.state.comment,
        status: "publish"
      }
    }).then(window.location.reload());
  }


  delete() {
    axios({
      method: "delete",
      url: "http://192.168.100.18:8080/api/comment/delete",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        _id: this.state.id,
        id_posts: this.state.url
      }
    }).then(this.setState({ modalOpen: false, comments: 1 }));
  }

  openModal(value) {
    this.setState({ modalOpen: true, id: value });
  }

  render() {
    const { posts, url, commentByPostId } = this.state;
    return (
      <div>
        <Container>
          <Item.Group>
            <Item>
              <Item.Content>
                <ItemMeta as="a" style={{ color: "black" }}>
                  <Image
                    avatar
                    src={
                      "http://192.168.100.18/src/web-api/public/avatar/" +
                      posts.foto
                    }
                  />{" "}
                  <b>{posts.username}</b>
                </ItemMeta>
                <Item.Description style={{ padding: 15, margin: 5 }}>
                  {posts.fotocontent !== null ? (
                    <Image
                      src={
                        "http://192.168.100.18/src/web-api/public/posting/foto/" +
                        posts.fotocontent
                      }
                      size="large"
                    />
                  ) : null}
                  <br />
                  <br />
                  {posts.content}
                </Item.Description>
                <Divider hidden />
                <Divider hidden />
                <ItemMeta>
                  <small>
                    <i>post on {posts.tags}</i>
                  </small>
                  <small style={{ float: "right" }}>
                    {posts.jam}:{posts.menit}{" "}
                  </small>
                </ItemMeta>
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider />
          <Comment.Group>
            {commentByPostId.map(data => {
              return (
                <Comment key={data._id}>
                  <Comment.Avatar
                    src={
                      "http://192.168.100.18/src/web-api/public/avatar/" +
                      data.foto
                    }
                  />
                  <Comment.Content>
                    <Comment.Author>
                      {data.username}
                      <Icon
                        onClick={() => this.openModal(data._id)}
                        name="trash alternate outline"
                        style={{ float: "right", color: "#595959" }}
                        size={"small"}
                      >
                      </Icon>
                      <Modal
                        id={data._id}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        basic
                      >
                        <Header
                          icon="trash alternate outline"
                          content="Delete Comment!"
                        />
                        <Modal.Content>
                          <p>Are You Sure?</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button onClick={this.handleClose} inverted>
                            <Icon name="remove" /> No
                          </Button>
                          <Button onClick={() => this.delete()}>
                            <Icon name="checkmark" /> Yes
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </Comment.Author>
                    <Comment.Text>{data.comment}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>
                        {data.date.slice(11) == this.state.year
                          ? data.date.slice(4, -5) == this.state.datemonth
                            ? data.jam == this.state.jam
                              ? data.menit == this.state.menit
                                ? "Now"
                                : this.state.menit - data.menit + " m ago"
                              : this.state.jam - data.jam + " h ago"
                            : data.date.slice(4, -5)
                          : data.date.slice(4)}
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                  <br />
                </Comment>
              );
            })}
            <Comment.Action>
              <Divider hidden />
              <Form onSubmit={this.handleSubmit}>
                <Input
                  name="comment"
                  style={{
                    bottom: 10,
                    position: "fixed",
                    zIndex: 99,
                    padding: 10,
                    margin: 5,
                    width: "85%"
                  }}
                  size="large"
                  transparent
                  placeholder="komentari ..."
                  icon="paper plane outline"
                  onChange={this.handleChange}
                />
              </Form>
            </Comment.Action>
          </Comment.Group>
        </Container>
      </div>
    );
  }
}
