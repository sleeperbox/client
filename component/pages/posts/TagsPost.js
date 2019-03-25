import React, { Component } from "react";
import {
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  GridColumn,
  List,
  Image
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class TagsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: localStorage.getItem("email").slice(1, -1),
      tag: localStorage.getItem("tag").slice(2, -2),
      posting: []
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentDidMount() {
    axios({
      method: "post",
      url: "/api/posting/tag",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        tag: this.state.tag // This is the body part
      }
    }).then(result =>
      this.setState({ posting: result.data, isLoading: false })
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
    window.location = '#/posts?id='+ value + '' 
  }

  render() {
    const { posting } = this.state;
    const { isLoading } = this.state;
    const gridMargin = {
      marginBottom: "-70px"
    };
    const textMargin = {
      marginLeft: "2%"
    };
    let a;
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {posting.map(data => {
              return (
                <Grid columns={1} key={data._id}>
                  <GridColumn style={gridMargin}>
                    <Segment basic>
                      <List>
                        <List.Item>
                          <List.Content>
                            <List.Header as="a">
                              <Icon name="user" color="black" />
                              <b> {data.username}</b>
                            </List.Header>
                            <br />
                            <List.Header as="a">
                            <small>
                            {data.tags === "null" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/kategori.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "computer-gadget" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/komp.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "family-love" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/family.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fact-rumour" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/fr.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "business-work" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/bisnis.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fashion-lifestyle" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/fashion.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "quotes" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/quotes.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "other" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/other.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "riddles" ? (
                                  <Image
                                    src="http://localhost:3000/src/web-api/public/icon/riddle.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : null}
                              </small>
                              <small>
                                <i style={textMargin}> {data.tags}</i>
                              </small>
                            </List.Header>
                            <br />
                            <List.Description>
                            { data.fotocontent !== null ? 
                              <Image
                              src={"http://localhost:3000/src/web-api/public/posting/foto/" + data.fotocontent}
                                    size="large" /> : null }
                              <br />
                              <b>{data.content}</b>
                              <br />
                              <br />
                              <Icon name="handshake outline" />
                              <small>
                                <i>{data.thanks} Thanks </i>
                              </small>
                              <br/>
                                <br/>
                                <a onClick= {() => this.discuss(data.id_posts)}>comment</a>
                              <small style={{ float: "right" }}>
                                <i>
                                  {data.jam} {data.menit} {data.date}
                                </i>
                              </small>
                              <Divider hidden />
                              <Divider fitted />
                              <Divider hidden />
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                  </GridColumn>
                </Grid>
              );
            })}
          </Container>
        )}
      </div>
    );
  }
}
