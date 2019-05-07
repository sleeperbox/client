import React, { Component } from "react";
import { Dimmer, Loader, Menu } from "semantic-ui-react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MyPostLightWeight from './MyPostLightWeight';
import MoreCategory from './MoreCategory';

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
        return <div style={{ marginTop: -30, padding: 10 }}>
                 <Menu text>
        <Menu.Item><b>Style</b></Menu.Item>
        <Menu.Item
          name='hexagrid'
          active={activeItem === 'hexagrid'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='lightweight'
          active={activeItem === 'lightweight'}
          onClick={this.handleItemClick}
        />
      </Menu>
        </div>
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? (this.loading()
                ) : (
                        <div>
                            <HeaderProfile />
                            <MoreCategory />
                            {this.filterPost()}
                            {this.state.activeItem == "hexagrid" ? <MyPost /> : <MyPostLightWeight/> }
                            <MenuProfile />
                        </div>
                    )}
            </div>
        );
    }


}
