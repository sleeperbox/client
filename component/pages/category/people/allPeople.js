import React, { Component } from "react"
import { Container, Grid, Divider, Image, List, Header, Button, Modal, Input, Statistic, Icon, Label } from 'semantic-ui-react';
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

    newmessage(username){
        event.preventDefault();
        window.location = "#/dm?username=" + username
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
                <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon 
                    basic size='small'
                >
                    <Header icon='user' content={friendship.first_name +" "+ friendship.last_name}/>
                    <Modal.Content>
                    <Image
                            style={{
                                alignSelf: 'center',
                                height: 225, 
                                width: 225, 
                                bordeerWidth: 1, 
                                borderRadius: 110
                            }}
                            resizeMode="cover" 
                            src={"http://localhost:3000/src/web-api/public/avatar/" + fotos} 
                            />
                    <center><Header style={{color: "white"}}>{"@"+friendship.username}</Header></center>
                        <p><i>Followed Tags:<br/><a style={{color: "white", marginLeft:"20px"}}>{friendship.tags}</a></i></p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Grid>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Button circular size='big' icon='user circle' color='twitter' onClick={() => this.gotoprofile(friendship.username)} />
                                    <div style={{marginRight:"15px", marginTop:"3px"}}>
                                        View    
                                    </div>            
                                </Grid.Column>
                                <Grid.Column>
                                    <Button circular size='big' icon='handshake outline' color='vk' />
                                    <div style={{marginRight:"5px", marginTop:"3px"}}>
                                        Tnks: {friendship.total_thanks}
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button circular size='big' icon='edit' color='vk' />
                                    <div style={{marginRight:"5px", marginTop:"3px"}}>
                                        Post: {friendship.total_posts}
                                    </div>               
                                </Grid.Column>
                                <Grid.Column>           
                                    <Button circular size='big' icon='facebook messenger' color='vk' onClick={() => this.newmessage(friendship.username)} />               
                                    <div style={{marginRight:"15px", marginTop:"3px"}}>
                                        Mail
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                                                
                    </Modal.Actions>
                </Modal>
            </Container>
              )}
            </div>
        );
    }
}