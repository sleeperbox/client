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
    this.setState({ tombol: 1 });
  }

  delButtom() {
    this.setState({ tombol: 0 });
  }

  componentWillMount() {
    axios.get('http://apps.aprizal.com/api/posts/' + this.state.url)
      .then(response => {
        this.setState({ posts: response.data })
      })
    axios({
      method: "POST",
      url: "http://apps.aprizal.com/api/comments",
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
        url: "http://apps.aprizal.com/api/comments",
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
      url: "http://apps.aprizal.com/api/posts/comments",
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
      url: "http://apps.aprizal.com/api/comment/delete",
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
                <ItemMeta>
                  <Image
                    style={{ width: "35px", height: "35px", marginLeft: 10, marginBottom: 5 }}
                    src={
                      "http://aprizal.com/public/avatar/" +
                      posts.foto
                    }
                  />{" "}
                  <b style={{ color: "#222" }}>{posts.username}</b>
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
                    style={{ width: "30px", height: "30px", borderRadius: "80px" }}
                    src={
                      "http://aprizal.com/public/avatar/" +
                      data.foto
                    }
                  />
                  <Comment.Content>
                    <Comment.Author>
                      {data.username}
                      {this.state.username == data.username ? <Icon
                        onClick={() => this.openModal(data._id)}
                        name="trash alternate outline"
                        style={{ float: "right", color: "#595959", fontSize: "19px" }}
                        size={"large"}
                      /> : null}
                      <Modal
                        id={data._id}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        basic
                        size='small'
                      >
                        <Modal.Content>
                          <p style={{ textAlign: "center", color: "#fff" }}>
                            are you sure want to delete your comment?
                          </p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button basic inverted onClick={() => this.delete()} style={{ margin: 5 }}>
                          <b>Yes</b>
                          </Button>
                          <Button basic inverted onClick={this.handleClose} style={{ margin: 5 }}>
                          <b>No</b>
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
                  icon="plus circle"
                  style={{ zIndex: 9, position: "fixed", bottom: 52, left: 2, background: "#5b90f6", color: "#fff" }}
                />
              ) : (
                  <Button.Group
                    icon
                    style={{ zIndex: 9, position: "fixed", bottom: 52, left: 2, background: "#5b90f6", color: "#fff" }}
                  >
                    <Button style={{ background: "#5b90f6", color: "#fff" }}>
                      <Icon name="camera" />
                    </Button>
                    <Button style={{ background: "#5b90f6", color: "#fff" }}>
                      <Icon name="file image" />
                    </Button>
                    <Button style={{ background: "#5b90f6", color: "#fff" }} onClick={this.delButtom.bind(this)}>
                      <Icon name="close" />
                    </Button>
                  </Button.Group>
                )}
              <textarea
                name="comment"
                className="type-input"
                style={{
                  left: 0,
                  bottom: 0,
                  position: "fixed",
                  zIndex: 8,
                  width: "100%",
                  background: "#fff",
                  border: "2px solid #999",
                  borderRadius: 5,
                  height: "50px"
                }}
                onChange={this.handleChange}
                placeholder=' Write a comment..'
                required
              />
              <Button
                circular
                onClick={this.handleSubmit}
                style={{
                  zIndex: 9,
                  position: "fixed",
                  bottom: 8,
                  right: 5,
                  color: "#fff",
                  background: "#5b90f6"
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
