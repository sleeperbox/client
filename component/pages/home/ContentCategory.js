
import React, { Component } from "react";
import MenuProfile from '../profile/MenuProfile';

export default class ContentCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: localStorage.getItem('email')
        };
    }

    render () {
        return (
        <div>
            <MenuProfile />
        </div>
        );
    }


}