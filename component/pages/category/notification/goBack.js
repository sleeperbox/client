import React from "react";
import {withRouter} from "react-router-dom"
import {Icon} from 'semantic-ui-react';

const Back = ({ history }) =>(
    <Icon onClick={history.goBack} name="arrow left"/>
);

export default withRouter(Back);