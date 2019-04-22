import React, { Component } from "react";
import { Image, Container, Divider, Grid, GridColumn, Segment, Dimmer, Header, Icon } from "semantic-ui-react";
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
      email: localStorage.getItem('email').slice(1, -1)
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.OpenDimmer = this.OpenDimmer.bind(this)
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/profile",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({total_influence: result.data.total_friends, total_thank: result.data.total_thanks}));
  }

  getReputation() {
    const {total_influence, total_thank} = this.state
    const total = ((total_influence + 1) * (total_thank + 1)) * 10
    if(total >= 0 && total < 1000 ){
      return "Baby Born " + total + " point"
    }else if(total >= 1000 && total < 3500){
      return "Settle Down " + total + " point"
    }else if(total >= 3500 && total < 7500){
      return "Familliar " + total + " point"
    }else if(total >= 7500 && total < 15000){
      return "Almost Huge " + total + " point"
    }else if(total >= 15000 && total < 20000){
      return "Way Of Glory " + total + " point"
    }else if(total >= 20000 && total < 50000){
      return "Geek Explorer " + total + " point"
    }else if(total >= 50000 && total < 50000){
      return "Masterpiece " + total + " point"
    }else if(total > 100000){
      return "Enough " + total + " point"
    }else{
      return "what???" + total + " point"
    }
  }

  componentDidMount() {
    if(this.state.email){
      this.setState({ isLoading: false });
    }
  }

  handleMenu(category) {
    this.setState({
      isCategory: category
    });
  }

  OpenDimmer() {
    return (
    <Dimmer active page onClickOutside={() => this.setState({ dimmers: false })}>
                <Header as="h2" icon inverted>
                  <Icon name="studiovinari" />
                {this.getReputation()}
                </Header>
              </Dimmer>
    )
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
    fontSize: 10,
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
      <div style={{ marginBottom: 10 }}>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {this.state.dimmers ? (
              this.OpenDimmer()
            ) : null}
            <Divider hidden />
            <Segment basic>
              <Grid columns={4} style={coloring}>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.handleMenu("news")}>
                    <Image src={newsIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>News</p>
                </GridColumn>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.setState({ dimmers: true })}>
                    <Image src={photoIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Reputation</p>
                </GridColumn>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.handleMenu("people")}>
                    <Image src={peopleIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>People</p>
                </GridColumn>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.handleMenu("setting")}>
                    <Image src={settingIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Setting</p>
                </GridColumn>
              </Grid>
            </Segment>
            <Divider hidden/>
          </Container>
        )}
      </div>
    );
  }
}
