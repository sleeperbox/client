import React, { Component } from "react"
import { Dimmer, Loader, Container, Card, CardHeader, CardMeta, Divider, CardContent } from 'semantic-ui-react';
import HeaderNews from './HeaderNews';
import MenuProfile from '../../profile/MenuProfile';
import News from './News';
import axios from 'axios'
import Skeleton from "react-skeleton-loader";


const link = 'https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=423ce8e876604636998481b856524a10'


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            datas: [],
            getNews: [],
            newsLoad: true,
            isLogin: '',
            loading: true,
            friend_email: localStorage.getItem('email').slice(1, -1),
        };
    }

    componentWillMount() {
        if(this.state.loading == true || this.setState.isLogin == '' || this.setState.email == ''){
            setTimeout(() =>  {
                this.setState({loading: false})
            }, 100)
        }
        axios.get(link)
        .then((result) => (
            result.data.status == 'ok' ? 
            this.setState({getNews: result.data.articles, newsLoad: false}) : 
            console.log('data not ok'))
            )
        .catch((err) => console.log('errornya: ', err))
    }

    componentDidMount() {
        if(this.state.datas){
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 500);
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
        const {isLogin} = this.state;
        if(isLogin === false){ 
            window.location = '#/login'
        }
    }

    loading() {
        return (
            <div>
                <Dimmer active inverted>
                    <Loader size='large'>Please Wait</Loader>
                </Dimmer>
            </div>        
        );
    }

    skeletonFirst() {
        return (
            <div style={{marginTop: 18}}>
                <Card centered fluid style={{padding: 15, margin: 5}}>
                    <CardHeader><Skeleton/></CardHeader>
                    <Divider hidden style={{marginTop: -1}}/>
                    <Skeleton />
                    <Divider hidden style={{marginTop: -1}}/>
                    <CardMeta style={{textAlign: "center"}}><Skeleton/></CardMeta>
                    <CardContent style={{fontSize: 12}}><Skeleton/></CardContent>
                </Card>
                <Card centered fluid style={{padding: 15, margin: 5, marginTop: 10}}>
                    <CardHeader><Skeleton/></CardHeader>
                    <Divider hidden style={{marginTop: -1}}/>
                    <Skeleton />
                    <Divider hidden style={{marginTop: -1}}/>
                    <CardMeta style={{textAlign: "center"}}><Skeleton/></CardMeta>
                    <CardContent style={{fontSize: 12}}><Skeleton/></CardContent>
                </Card>
                <Card centered fluid style={{padding: 15, margin: 5, marginTop: 10}}>
                    <CardHeader><Skeleton/></CardHeader>
                    <Divider hidden style={{marginTop: -1}}/>
                    <Skeleton />
                    <Divider hidden style={{marginTop: -1}}/>
                    <CardMeta style={{textAlign: "center"}}><Skeleton/></CardMeta>
                    <CardContent style={{fontSize: 12}}><Skeleton/></CardContent>
                </Card>
                <Card centered fluid style={{padding: 15, margin: 5, marginTop: 10}}>
                    <CardHeader><Skeleton/></CardHeader>
                    <Divider hidden style={{marginTop: -1}}/>
                    <Skeleton />
                    <Divider hidden style={{marginTop: -1}}/>
                    <CardMeta style={{textAlign: "center"}}><Skeleton/></CardMeta>
                    <CardContent style={{fontSize: 12}}><Skeleton/></CardContent>
                </Card>
                <Card centered fluid style={{padding: 15, margin: 5, marginTop: 10}}>
                    <CardHeader><Skeleton/></CardHeader>
                    <Divider hidden style={{marginTop: -1}}/>
                    <Skeleton />
                    <Divider hidden style={{marginTop: -1}}/>
                    <CardMeta style={{textAlign: "center"}}><Skeleton/></CardMeta>
                    <CardContent style={{fontSize: 12}}><Skeleton/></CardContent>
                </Card>
            </div>
        )
    }

    render() {
        const {loading, getNews, newsLoad} = this.state;
        return (
            <div style={{marginBottom: 45}}>
                {loading ? (this.loading()
                    ) : (
                        <div>
                            <HeaderNews/>
                            <Container>
                                {newsLoad ? this.skeletonFirst() : (
                                    <News newsContent={getNews}/>
                                )}
                            </Container>
                            <MenuProfile/>
                        </div>
                    )}
            </div>
        );
    }
}