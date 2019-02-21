import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Modal, Input, Statistic } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import axios from 'axios';

export default class allPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('email').slice(1, -1),
            datas: [],
            isLogin: '',
            friendship: [],
            isLoading: true,
            email_friend: '',
            open: false,
            fotos: '',
            allfoto: [],
            cari: "",
            kode: 0
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
        this.handlePost = this.handlePost.bind(this);
    }

    componentWillMount() {
        axios({
            method: 'post',
            url: '/api/friend',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.email, // This is the body part
            }
          }).then(result => this.setState({datas: result.data.user, allfoto: result.data.foto}));
        this.setState({
            isLogin: localStorage.getItem('auth')
        })
    }

    componentDidMount() {
        if(this.state.datas){
            this.setState({isLoading: false})
        }
        const {isLogin} = this.state
        isLogin === "false" ? window.location = '#/login' : ''
    }

    shouldComponentUpdate(newProps, newState){
        if(newState){
            return true;
        }else{
            return false;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.kode == 1) {
            axios({
              method: "post",
              url: "/api/search",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              data: {
                username: this.state.cari,
                email: this.state.email
              }
            }).then(result => this.setState({ datas: result.data, kode: 0 }));
          }
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    handleClick(value) {
        this.setState({email_friend: value, dimmer: 'blurring', open: true}, () => axios({
            method: 'post',
            url: '/api/user/avatar',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: value
            }, // This is the body part
          }).then(result => this.setState({fotos: result.data})))

          axios({
            method: 'post',
            url: '/api/user',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email: value
            }, // This is the body part
          }).then(result => this.setState({friendship: result.data}))
    }

    generateSkeleton() {
        const {datas} = this.state;
        return <div style={{marginBottom: 45}}>
        <Container>
        <Divider hidden />
            <Skeleton width="100%">
                <Header as="h2" textAlign="center">
            </Header>
            </Skeleton>
            <Divider/>
            {datas.map(data => {  
                return (
            <Grid columns={2} key={data._id}>
                <Grid.Column>
                <List verticalAlign="middle">
                    <List.Item>
                        <List.Content>
                            <List.Header><Skeleton/></List.Header>
                            <p><Skeleton/></p>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>

                <Grid.Column verticalAlign="middle">
                <Skeleton />
                </Grid.Column>
            </Grid>
            ); })}
        </Container>
        </div>
    }

    handlePost(event) {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
          [name]: value,
          kode: 1
        })
      }

    loop() {
        const test = []
        const {allfoto} = this.state
        allfoto.map(fotox => test.push(fotox.avatar))
        return test
    }

    gotoprofile(username) {
        sessionStorage.setItem('username', username)
        window.location='#/user/profile';
    }

    generateZeroData() {
        const divConten = {
          marginTop: "40%",
          marginBottom: "60%"
        };
        return (
          <div style={divConten}>
            <Header as="h2" icon textAlign="center">
              <Image
                centered
                size="large"
                src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png"
              />
              <Header.Content>
                <Statistic>
                  <Statistic.Value text>You Haven't friend,</Statistic.Value>
                  <Statistic.Label>
                  </Statistic.Label>
                  <Statistic.Label>No Result</Statistic.Label>
                </Statistic>
              </Header.Content>
            </Header>
          </div>
        );
      }

    close = () => this.setState({ open: false, email_friend: '', friendship: [] }, () => sessionStorage.removeItem('username'))
    
    render() {
        const { datas, isLoading, friendship, open, dimmer, fotos, allfoto } = this.state
        return (
            <div style={{marginBottom: 45}}>
            <Input
                fluid
                icon="search"
                onChange={this.handlePost}
                name="cari"
                value={this.state.cari}
                placeholder="Seacrh"
            />
            <br />
            {datas.length === 0 ? (
                this.generateZeroData()
              ) : (
            isLoading ? this.generateSkeleton() :
            <Container>
                {datas.map(data => {  
                    return (
                <Grid columns={1} key={data._id}>
                    { data.email === this.state.email ? null :
                    <Grid.Column>
                        <List verticalAlign="middle" onClick={() => {this.handleClick(data.email)}}>
                            <List.Item>
                                <Image avatar src={"http://localhost:3000/src/web-api/public/avatar/" + data.foto} />
                                <List.Content>
                                    <List.Header>{ data.first_name } {data.last_name}</List.Header>
                                    <p>@{ data.username }</p>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                    }
                </Grid>
                ); })}
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon>
            <Modal.Header>{friendship.first_name} {friendship.last_name}</Modal.Header>
            <Modal.Content>
                <Image
                    bordered 
                    wrapped size='medium' 
                    src={"http://localhost:3000/src/web-api/public/avatar/" + fotos} 
                    circular
                    style={{height: "220px", width: "220px"}}
                    />
                <Modal.Description>
                <center><Header>{friendship.username}</Header></center>
                <br />
                <p><i>Followed Tags: <a>{friendship.tags}</a></i></p>
                {/* <span>
                    <span style={{float: "left"}}>thanks: {friendship.total_thanks}</span>
                    <span style={{float: "right"}}>posts: {friendship.total_posts}</span>
                    <br/>
                    <hr/>
                </span> */}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions style={{marginTop: "-20px"}}>
                <center>
                <Button size="big" circular icon='handshake outline' content={friendship.total_thanks}></Button>
                <Button size="big" circular icon='comment outline' content={friendship.total_posts}></Button>
                <Button
                    size="big"
                    circular
                    icon="user circle"
                    onClick={() => this.gotoprofile(friendship.username)}
                />
                </center>
            </Modal.Actions>
            <Divider hidden/>
        </Modal>
            </Container>
              )}
            </div>
        );
    }
}