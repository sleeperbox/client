import React, { Component } from "react";
import {Grid, Container, Segment, Divider, Icon, GridColumn, List} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios'

export default class TagsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: localStorage.getItem('email').slice(1, -1),
      tag: localStorage.getItem('tag').slice(2, -2),
      posting : []
    };
    this.generateSkeleton = this.generateSkeleton.bind(this)
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);

    axios({
      method: 'post',
      url: '/api/posting/tag',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      data: {
        tag: this.state.tag, // This is the body part
      }
    }).then(result => this.setState({posting: result.data},console.log(result)));
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
                  <List.Header as='a'><Skeleton width="10px" height="10px" /></List.Header>
                  <List.Description>
                  <Skeleton />
                    <a>
                      <b><Skeleton /></b>
                    </a>{' '}
                    <small><i><Skeleton /></i></small>.
                  </List.Description>
                </List.Content>
              </List.Item>
              <Divider clearing/>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Skeleton width="10px" height="10px" /></List.Header>
                  <List.Description>
                  <Skeleton />
                    <a>
                      <b><Skeleton /></b>
                    </a>{' '}
                    <small><i><Skeleton /></i></small>.
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
    const {posting} = this.state;
    const { isLoading } = this.state;
    let a;
    return (
      <div>
      {isLoading ? this.generateSkeleton() :
      <Container>
        {posting.map(data => { 
        return (
        <Grid columns={1} key={data._id}>
        <GridColumn>
          <Segment basic>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header as='a'><Icon name='user' color="black" /><b>{' '}{data.username}</b></List.Header>
                  <br />
                  <List.Header as='a'><Icon name='film' color="black" /><small><i>{' '}{data.tags}</i></small></List.Header>
                  <br />
                  <List.Description>
                    <a>
                      <b>{data.content}</b><br /><br />
                    </a>
                    <Icon name='like' color="red" /><small><i>{data.thanks}{' '}Thanks{' '}</i></small>
                    <small style={{float: "right"}}><i>{data.jam}{' '}{data.menit}{' '}{data.date}</i></small>
                    <Divider hidden>
                    </Divider>
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </GridColumn>
      </Grid>
      ); })}
      </Container>
      }
      </div>
        ); 
    }
}