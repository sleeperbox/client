import React, { Component } from "react";
import { Image, Button, Grid, Icon } from 'semantic-ui-react';
import gambar from "./../../../../../assets/images/background/morning.png";
import gambar2 from "./../../../../../assets/images/background/afternoon.png";
import gambar3 from "./../../../../../assets/images/background/evening.png";

export default class intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "",
            time: new Date(),
            // hour: "20",
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        };
      }

    componentWillMount(){
        const { hour } = this.state;
        console.log(hour);
        if (hour < 12) {
            this.setState({
                background: gambar
              });
          } else if (hour < 18) {
            this.setState({
              background: gambar2
            });
          } else {
            this.setState({
              background: gambar3
            });
          }
    }

    render(){
        const{
            background
        }=this.state;
        return(
            <div style={{backgroundImage: `url(${background})`, width: "100%", height: "100%", position: 'absolute', top: 0, left: 0, backgroundSize: 'cover'}}>
                <div style={{
                  float: "right", 
                  zIndex: 1,
                  position: "fixed",
                  bottom: 65,
                  color: "white",
                  marginLeft: "80px",
                  borderRadius: "10px",
                  padding: 4,
                  border: "3px solid white"
                }}>
                  <Image centered src="./src/client/assets/images/icon/1.png" onClick={() => window.location="#/login"} style={{width: "50%", height: "50%"}}/>
                  <center><span>Login</span></center>
                </div>

                <div style={{
                  float: "left", 
                  zIndex: 1,
                  position: "fixed",
                  bottom: 65,
                  right: 1,
                  color: "white",
                  marginRight: "80px",
                  borderRadius: "10px",
                  padding: 4,
                  border: "3px solid white",
                }}>
                  <Image centered src='./src/client/assets/images/icon/2.png' onClick={() => window.location="#/register"} style={{width: "59%", height: "59%"}}/>
                  <center><span>Register</span></center>
                </div>
                                
            </div>
        );
    }

}