import React, { Component } from "react";
import {
  Image,
  Container,
  Divider,
  Grid,
  GridColumn,
  Segment,
  Dimmer,
  Header,
  Icon,
  Statistic
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import setting from "./../../../../../assets/images/icon/setting.png";
import people from "./../../../../../assets/images/icon/group.png";
import photo from "./../../../../../assets/images/icon/reputation.png";
import news from "./../../../../../assets/images/icon/news.png";
import axios from "axios";

export default class MoreCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategory: "",
      isLoading: true,
      dimmers: false,
      total_influence: null,
      total_thank: null,
      email: localStorage.getItem("email"),
      rank: null,
      point: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.OpenDimmer = this.OpenDimmer.bind(this);
  }

  componentWillMount() {
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
        total_influence: result.data.total_friends,
        total_thank: result.data.total_thanks
      })
    )
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/rank",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email
      }
    })
  }

  getReputationName() {
    const { total_influence, total_thank } = this.state;
    const total = (total_influence + 1) * (total_thank + 1) * 10;
    if (total >= 0 && total < 1000) {
      return "Baby Born ";
    } else if (total >= 1000 && total < 3500) {
      return "Settle Down ";
    } else if (total >= 3500 && total < 7500) {
      return "Familliar ";
    } else if (total >= 7500 && total < 15000) {
      return "Almost Huge ";
    } else if (total >= 15000 && total < 20000) {
      return "Way Of Glory ";
    } else if (total >= 20000 && total < 50000) {
      return "Geek Explorer ";
    } else if (total >= 50000 && total < 50000) {
      return "Masterpiece ";
    } else if (total > 100000) {
      return "Enough ";
    } else {
      return "what???";
    }
  }

  getReputationPoint() {
    const { total_influence, total_thank } = this.state;
    const total = (total_influence + 1) * (total_thank + 1) * 10;
    if (total >= 0 && total < 1000) {
      return total;
    } else if (total >= 1000 && total < 3500) {
      return total;
    } else if (total >= 3500 && total < 7500) {
      return total;
    } else if (total >= 7500 && total < 15000) {
      return total;
    } else if (total >= 15000 && total < 20000) {
      return total;
    } else if (total >= 20000 && total < 50000) {
      return total;
    } else if (total >= 50000 && total < 50000) {
      return total;
    } else if (total > 100000) {
      return total;
    } else {
      return total;
    }
  }

  componentDidMount() {
    if (this.state.email) {
      this.setState({ isLoading: false });
    }
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/user/rank",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email
      }
    }).then(result => this.setState({ rank: result.data.rank}))
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/user/point",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email
      }
    }).then(result => this.setState({ point: result.data.total_score}));
  }

  handleMenu(category) {
    this.setState({
      isCategory: category
    });
  }

  OpenDimmer() {
    return (
      <Dimmer
        active
        page
        onClickOutside={() => this.setState({ dimmers: false })}
      >
        <Grid centered columns={1}>
          <Grid.Column style={{marginTop: 20}}>
            <Header as="h1" inverted textAlign="center" dividing style={{fontSize:"50px"}}>
              {this.getReputationName()}
            </Header>
          </Grid.Column>

          <Grid.Row centered columns={1} style={{marginBottom: "150px"}}>
            <Grid.Column>
              <Header  size="huge" textAlign="center" inverted icon style={{fontSize:"50px"}}>
                <Icon size="massive" name="universal access" />
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={2} style={{marginTop: -185}}>
            <Grid.Column style={{textAlign: "center"}}>
              <Statistic color="teal">
                <Statistic.Value>{this.state.rank}</Statistic.Value>
                <Statistic.Label style={{ color: "white"}}>Rank</Statistic.Label>
              </Statistic>
            </Grid.Column>

            <Grid.Column style={{textAlign: "center"}}>
              <Statistic color="olive" style={{textAlign: "center", color: "white"}}>
                <Statistic.Value>{this.state.point}</Statistic.Value>
                <Statistic.Label style={{ color: "white"}}>Point</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <Grid.Column  style={{textAlign: "center"}}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/><br/>
        tap here to close...
      </Dimmer>
    );
  }

  generateSkeleton() {
    return (
      <div>
        <Container>
          <Divider hidden />
          <Grid columns={4}>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }

  noSpacing = {
    textAlign: "center",
    margin: 0,
    padding: 0
  };

  smallFontCenter = {
    fontSize: 14,
    textAlign: "center"
  };

  render() {
    /*
    const settingIcon= 'http://192.168.1.14/assets/icons/more-categories/setting.png';
    const peopleIcon= 'http://192.168.1.14/assets/icons/more-categories/people.png';
    const photoIcon= 'http://192.168.1.14/assets/icons/more-categories/photo.png';
    const statisticIcon= 'http://192.168.1.14/assets/icons/more-categories/statistic.png';
    */

    const settingIcon = setting;
    const peopleIcon = people;
    const photoIcon = photo;
    const newsIcon = news;
    const coloring = {
      color: "#555"
    };
    const { isLoading } = this.state;
    // bypass logout user
    if (this.state.isCategory === "setting") {
      window.location = "#/setting";
    } else if (this.state.isCategory === "people") {
      window.location = "#/people";
    } else if (this.state.isCategory === "reputation") {
      return null;
    } else if (this.state.isCategory === "news") {
      window.location = "#/news";
    }
    return (
      <div style={{background: "#f7f7f7", width: "100%"}}>
        {isLoading ? (
          this.generateSkeleton()
        ) : this.state.dimmers ? this.OpenDimmer() : null }
              <Grid columns={4} style={coloring} style={{padding: 5, margin: 2, marginTop: 15}}>
                <GridColumn>
                  <p
                    style={this.noSpacing}
                    onClick={() => this.handleMenu("news")}
                  >
                    <Image src={newsIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>W-news</p>
                </GridColumn>
                <GridColumn>
                  <p
                    style={this.noSpacing}
                    onClick={() => this.setState({ dimmers: true })}
                  >
                    <Image src={photoIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Reputation</p>
                </GridColumn>
                <GridColumn>
                  <p
                    style={this.noSpacing}
                    onClick={() => this.handleMenu("people")}
                  >
                    <Image src={peopleIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>People</p>
                </GridColumn>
                <GridColumn>
                  <p
                    style={this.noSpacing}
                    onClick={() => this.handleMenu("setting")}
                  >
                    <Image src={settingIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Setting</p>
                </GridColumn>
              </Grid>
      </div>
    );
  }
}
