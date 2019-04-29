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
import "./../MessagePrivate/style.css";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      username: localStorage.getItem("username"), 
      posts: [],
      commentByPostId: [],
      comment: "",
      message: "",
      modalOpen: false,
      comments: 0,
      date: "",
      year: new Date().getFullYear(),
      datemonth: new Date().toDateString().slice(4, -5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      id: null,
      url: window.location.href.split("=")[1],
      tombol: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose = () => this.setState({ modalOpen: false });

  addButtom() {
    this.setState({tombol: 1});
  }

  delButtom() {
    this.setState({tombol: 0});
  }

  componentWillMount() {
    console.log(this.state.username)
    axios({
      method: "POST",
      url: "http://192.168.100.66:8080/api/comments",
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
        url: "http://192.168.100.66:8080/api/comments",
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
      url: "http://192.168.100.66:8080/api/posts/comments",
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
      url: "http://192.168.100.66:8080/api/comment/delete",
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
    const { posts, date, tombol, url, commentByPostId } = this.state;
    return (
      <div>
        <Container>
          <Item.Group>
            <Item>
              <Item.Content>
                <ItemMeta as="a" style={{ color: "black" }}>
                  <Image
                    circular
                    style={{ width:"30px", height:"30px" }}
                    src={
                      "http://aprizal.com/public/avatar/" +
                      posts.foto
                    }
                  />{" "}
                  <b>{posts.username}</b>
                </ItemMeta>
                <Item.Description style={{ padding: 15, margin: 5 }}>
                  {posts.fotocontent !== null ? (
                    <Image
                      src={
                        "http://aprizal.com/public/posting/foto/" +
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
                <ItemMeta>
                  <small>
                    <i>post on {posts.tags}</i>
                  </small>
                  <small style={{ float: "right" }}>
                    {date.slice(11) == this.state.year
                      ? date.slice(4, -5) == this.state.datemonth
                        ? posts.jam == this.state.jam
                          ? posts.menit == this.state.menit
                            ? "Now"
                            : this.state.menit - posts.menit + " m ago"
                          : this.state.jam - posts.jam + " h ago"
                        : date.slice(4, -5)
                      : date.slice(4)}
                  </small>
                </ItemMeta>
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider style={{ marginTop: "-1.5em" }} />
          <Comment.Group>
            {commentByPostId.map(data => {
              return (
                <Comment key={data._id}>
                  <Comment.Avatar
                    style={{ width:"30px", height:"30px", borderRadius: "80px" }}
                    src={
                      "http://aprizal.com/public/avatar/" +
                      data.foto
                    }
                  />
                  <Comment.Content>
                    <Comment.Author>
                      {data.username}
                      { this.state.username == data.username ? <Icon
                        onClick={() => this.openModal(data._id)}
                        name="trash alternate outline"
                        style={{ float: "right", color: "#595959", fontSize:"19px"}}
                        size={"large"}
                      /> : null}
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
              {tombol == 0 ? (
                <Button
                  onClick={this.addButtom.bind(this)}
                  circular
                  icon="plus circle"
                  style={{ zIndex: 9, position: "fixed", bottom: 50, left: 8 }}
                />
              ) : (
                <Button.Group
                  icon
                  style={{ zIndex: 9, position: "fixed", bottom: 50, left: 8 }}
                >
                  <Button>
                    <Icon name="camera" />
                  </Button>
                  <Button>
                    <Icon name="file image" />
                  </Button>
                  <Button onClick={this.delButtom.bind(this)}>
                    <Icon name="close" />
                  </Button>
                </Button.Group>
              )}
              <textarea
                name="comment"
                className="type-input"
                style={{
                  left: 8,
                  bottom: 8,
                  position: "fixed",
                  zIndex: 99,
                  width: "84%"
                }}
                onChange={this.handleChange}
                placeholder="Write a comment.."
                required
              />
              <Button
                color="teal"
                onClick={this.handleSubmit}
                style={{
                  zIndex: 9,
                  position: "fixed",
                  bottom: 8,
                  right: 4,
                  borderRadius: "18px",
                  color: "#2F4A57"
                }}
                icon="paper plane outline"
              />
            </Comment.Action>
          </Comment.Group>
        </Container>
      </div>
    );
  }
}
