import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { HashRouter, Route } from "react-router-dom";
import App from "./App";
import "./index.css";


//user personality
import Intro from "./component/pages/form-user/intro";
import Login from "./component/pages/form-user/login";
import Register from "./component/pages/form-user/register";
import Profile from "./component/pages/profile/";

//categories
import Setting from "./component/pages/category/setting/";
import People from "./component/pages/category/people/";
import Notifications from "./component/pages/category/notification/"
import Store from "./component/pages/category/store/"
import TagsPost from "./component/pages/posts/"
import Message from "./component/pages/message/"
import NewMessage from "./component/pages/newmessage/"
import MessagePrivate from "./component/pages/MessagePrivate/"
//people
import UserProfile from "./component/pages/people-profile/"
import Influence from "./component/pages/people-profile/influence-list/"
import Posts from "./component/pages/discuss/"
//home
import Home from "./component/pages/home/"

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/home" component={Home} />
      <Route path="/posts/" component={Posts} />
      <Route path="/user/profile" component={UserProfile} />
      <Route path="/user/influence/list" component={Influence} />
      <Route path="/intro" component={Intro} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/message" component={Message} />
      <Route path="/people" component={People} />
      <Route path="/setting" component={Setting} />
      <Route path="/notification" component={Notifications} />
      <Route path="/store" component={Store} />
      <Route path="/tagspost/:tag" component={TagsPost} />
      <Route path="/dm" component={MessagePrivate} />
      <Route path="/newdm" component={NewMessage} />
    </div>
  </HashRouter>
  </Provider>,
  document.getElementById("root")
  
);
