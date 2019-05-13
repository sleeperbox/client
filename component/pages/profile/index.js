import React, { Component } from "react";
import { Dimmer, Loader, Menu, Icon } from "semantic-ui-react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MyPostLightWeight from './MyPostLightWeight';
import PullToRefresh from 'pulltorefreshjs';
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem('auth'),
            email: localStorage.getItem('email'),
            loading: true,
            activeItem: "hexagrid"
        };
    }

    componentDidMount() {
        PullToRefresh.init({
            mainElement: 'body',
            onRefresh() {
                window.location.reload();
            }
        });
    }

    componentWillUnmount() 
    {
        // Don't forget to destroy all instances on unmout
        // or you will get some glitches.
        PullToRefresh.destroyAll();
    }

    componentWillMount() {
        if (this.state.loading == true || this.setState.isLogin == '' || this.setState.email == '') {
            setTimeout(() => {
                this.setState({ loading: false })
            }, 100)
        }

    }

    shouldComponentUpdate(newProps, newState) {
        if (newState.isLogin) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.isLogin === "false" ? window.location = '#/login' : '';
    }

    loading() {
        return (
            <div>
                <Dimmer active inverted>
                    <Loader size='large'>Plase Wait</Loader>
                </Dimmer>
            </div>
        );
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    filterPost() {
        const { activeItem } = this.state
        return <Menu fluid pointing secondary widths={2} style={{marginTop: -5, position: "relative", background: "#fff", color: "#222"}}>
                <Menu.Item
                name='hexagrid'
                active={activeItem === 'hexagrid'}
                onClick={this.handleItemClick}
                ><Icon name="h" style={{color: "#5b90f6"}}/><span style={{marginLeft: -5}}>exagrid</span></Menu.Item>
                <Menu.Item
                name='lightweight'
                active={activeItem === 'lightweight'}
                onClick={this.handleItemClick}
                ><Icon name="bolt" style={{color: "#5b90f6"}}/><span style={{marginLeft: -7}}>ightweight</span></Menu.Item>
          
        </Menu>
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? (this.loading()
                ) : (
                        <div>
                            <HeaderProfile />
                            {this.filterPost()}
                            {this.state.activeItem == "hexagrid" ? <MyPost /> : <MyPostLightWeight/> }
                            <MenuProfile />
                        </div>
                    )}
            </div>
        );
    }


}
