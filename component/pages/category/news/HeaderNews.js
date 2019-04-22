import React from "react";
import {Icon, Menu, Header} from 'semantic-ui-react';

const back = () => {
    window.location = "#/profile"
    localStorage.setItem('menu', 'profile');
}

const HeaderStore = () => {
    return (
      <div style={{marginBottom: 65}}>
        <Menu borderless size="huge" fixed="top">
        <Menu.Item name='back'>
          <Icon onClick={back} name="arrow left"/>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='help'>
            <Header as="h5">News</Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </div>
    );
}

export default HeaderStore