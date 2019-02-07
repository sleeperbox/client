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
      comment: '',
      message: '',
      url: window.location.href.split('=')[1]
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    axios.get('/api/posts/' + this.state.url)
    .then(response => {
      this.setState({posts: response.data})
    })
    axios({
      method: "POST",
      url: "/api/comments",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id_posts: this.state.url
      }
    }).then(result => this.setState({commentByPostId: result.data}));
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
      url: "/api/posts/comments",
      headers: {
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
  
  render() {
    const {posts, url, commentByPostId} = this.state;
    return (
      <div>
        <Container >
          <Item.Group>
            <Item>
              <Item.Content>
                <ItemMeta as='a' style={{color: "black"}}><Image avatar src={"http://localhost:3000/src/web-api/public/avatar/" + posts.foto}/> <b>{posts.username}</b></ItemMeta>
                <Item.Description style={{padding: 15, margin: 5}}>
                  {posts.content}
                </Item.Description>
                <Divider hidden/>
                <Divider hidden/>
                <ItemMeta>
                <small><i>post on {posts.tags}</i></small>
                <small style={{float: "right"}}>{posts.jam}:{posts.menit} </small></ItemMeta>
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider />
          <Comment.Group>
            {commentByPostId.map(data => {
            return <Comment key={data._id}>
              <Comment.Avatar src={"http://localhost:3000/src/web-api/public/avatar/" + data.foto} />
              <Comment.Content>
                <Comment.Author>{data.username}</Comment.Author>
                <Comment.Text>
                  {data.comment}
                </Comment.Text>
              </Comment.Content>
            </Comment>
            })}
            <Comment.Action>
            <Divider hidden/>
            <Form onSubmit={this.handleSubmit}>
            <Input name="comment" style={{bottom: 10, position: "fixed", zIndex: 99, padding: 10, margin: 5, width: "85%" }} size="large" transparent placeholder='komentari ...' icon='paper plane outline' onChange={this.handleChange}/>
            </Form>
            </Comment.Action>
          </Comment.Group>    
        </Container>
      </div>
    );
  }
}
