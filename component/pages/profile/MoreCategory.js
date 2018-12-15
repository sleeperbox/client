import React, { Component } from "react";
import {Image, Container, Divider, Icon, Grid, GridColumn} from 'semantic-ui-react';
import settingIcon from '../../../assets/images/icon/setting.png';
import groupIcon from '../../../assets/images/icon/group.png';
import galleryIcon from '../../../assets/images/icon/gallery.png';
import statisticIcon from '../../../assets/images/icon/Statistic.png';
import Skeleton from 'react-skeleton-loader';

export default class MoreCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isCategory: '',
        isLoading: true
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount(){
    setTimeout(() => {
        this.setState({isLoading: false})
      }, 500);
  }

  handleMenu(category) {
      this.setState({
        isCategory: category
      }, () => console.log('handle more category: ', this.state.isCategory));
  }

  generateSkeleton() {
   
    return <div>
    <Container>
        <Divider hidden />
        <Grid columns={4}>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
            <GridColumn>
            <p><Skeleton height= "30px" width="30px"/></p>
            </GridColumn>
        </Grid>
    </Container>
    </div>
  }

  noSpacing = {
    textAlign: "center",
    margin:0,
    padding:0
  }

  smallFontCenter = {
    fontSize: 10, 
    textAlign: "center"
  }

  render() {
    const { isLoading } = this.state;
    // bypass logout user
    if(this.state.isCategory === 'setting'){
        window.location='#/setting'
    }
    if(this.state.isCategory === 'people'){
        window.location='#/people'
    }else if(this.state.isCategory === 'gallery'){
        window.location = '#/gallery'
    }else if(this.state.isCategory === 'statistic'){
        window.location = '#/statistic'
    }
    return (
        <div>
            {isLoading ? this.generateSkeleton() :
        <Container>
            <Divider hidden />
            <Grid columns={4}>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('statistic')}><Image src={statisticIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Statistic</p>
                </GridColumn>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('gallery')}><Image src={galleryIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Gallery</p>
                </GridColumn>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('people')}><Image src={groupIcon} avatar /></p>
                    <p style={this.smallFontCenter}>People</p>
                </GridColumn>
                <GridColumn>
                    <p style={this.noSpacing} onClick={() => this.handleMenu('setting')}><Image src={settingIcon} avatar /></p>
                    <p style={this.smallFontCenter}>Setting</p>
                </GridColumn>
            </Grid>
        </Container>
            }
        </div>
    );
  }
}   