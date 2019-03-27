import React, { Component } from "react";
import { Image, Button, Grid, Icon } from 'semantic-ui-react';
  
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
                background: "./assets/images/background/goodmorning2.png",
              });
              console.log("./assets/images/background/goodemorning.png")
          } else if (hour < 18) {
            this.setState({
              background: "./assets/images/background/goodafternoon.png",
            });
            console.log("./assets/images/background/goodafternoon.png")
          } else {
            this.setState({
              background: "./assets/images/background/goodevening.png",
            });
            console.log("./assets/images/background/goodevening.png")
          }
    }

    render(){
        const{
            background
        }=this.state;
        return(
            <div style={{backgroundImage: `url(${background})`, width: "100%", height: "100%", position: 'absolute', top: 0, left: 0, backgroundSize: 'cover'}}>
              
                <div columns='three' style={{
                  
                  background: "#5190ed",
                
                }}>
                  
                    
                  <Icon name='sign-in alternate' size='large' onClick={() => window.location="#/login"} style={{float: "right", zIndex: 1,
                  position: "fixed",
                  bottom: 65,
                  color: "white",
                  marginLeft: "110px"}}>Login</Icon>  
                  <Icon name='share square outline' size='large' onClick={() => window.location="#/register"} style={{float: "left", zIndex: 1,
                  position: "fixed",
                  bottom: 65,
                  right: 1,
                  color: "white",
                  marginRight: "110px"}}>Register</Icon>
                    
                  
              </div>
                                
            </div>
        );
    }

}
