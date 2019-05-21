import React, { Component } from "react";
import {
  Container,
  Segment,
  Icon,
  List,
  Grid,
  GridColumn,
  Divider,
  Image
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";
import PostOther from "./PostingOtherlimit";
import PostQuotes from "./PostingQuoteslimit";
import PostRiddles from "./PostingRiddleslimit";
import PostComputerGadget from "./PostingComputerGadgetlimit";
import PostFamilyLove from "./PostingFamilyLovelimit";
import PostFactRumour from "./PostingFactRumourlimit";
import PostBussinessWork from "./PostingBussinessWorklimit";
import PostFashionLifestyle from "./PostingFashionLifestylelimit";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isLoading: true,
      time: new Date(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      tags: [""],
      nilai: [],
      kode: 0
    };
    this.view = this.view.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentDidMount() {
    const email = localStorage.getItem("email");
    this.setState(
      {
        email
      },
      () =>
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
          this.setState({ tags: result.data.tags, isLoading: false })
        )
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
    if (this.state.kode == 1) {
      this.setState({ kode: 0 });
    }
  }

  handleChange() {
    
  }
  view(e, data) {
    if(data.isi == null){
      return false
    }
    this.setState({
      nilai: data.isi
    });
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
                        <Skeleton />
                      </List.Header>
                      </List.Content>
                  </List.Item>
                  <Divider hidden/>
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
    const tags = this.state.tags;
    var element = tags.join();
    const newArray = element.split(",");
    var judul = newArray.values();
    var isi = [];
    return (
      <div style={{marginTop: -5}}>
      {this.state.isLoading ? this.generateSkeleton() : (
        newArray.map(data => {
          isi.push(data);
          return (
            <Grid
              style={{ display: "block", margin: "0px" }}
              columns={1}
              key={data}
            >
                <Segment basic>
                <br/>
                    {data === "null" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/follow.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "computer-gadget" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/komp.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "family-love" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/family.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "fact-rumour" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/f&r.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "business-work" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/bisnis.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "fashion-lifestyle" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/fashion.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "quotes" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/quotes.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "other" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/other.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : data === "riddles" ? (
                      <Image
                        src="http://aprizal.com/public/icon/icon/riddle.png"
                        width="7%"
                        style={{ float: "left" }}
                      />
                    ) : null}
                  <p style={{fontSize: 18}}>
                    &nbsp;
                    {judul.next().value}
                    <Icon onClick={this.view.bind(this)} name="angle right" style={{float: "right"}}/>
                  </p>
                </Segment>
                <Segment basic color="red">
                  <List.Item style={{ float: "block" }}>
                    {data === "other" ? (
                      <PostOther />
                    ) : data === "quotes" ? (
                      <PostQuotes />
                    ) : data === "riddles" ? (
                      <PostRiddles />
                    ) : data === "computer-gadget" ? (
                      <PostComputerGadget />
                    ) : data === "family-love" ? (
                      <PostFamilyLove />
                    ) : data === "business-work" ? (
                      <PostBussinessWork />
                    ) : data === "fact-rumour" ? (
                      <PostFactRumour />
                    ) : data === "fashion-lifestyle" ? (
                      <PostFashionLifestyle />
                    ) : null}
                  </List.Item>
                </Segment>
            </Grid>
          );
        })
        )}
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    );
  }
}
