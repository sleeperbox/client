import React, { Component } from "react";

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
            <div>
                <img src={background} />                
                <p onClick={() => window.location="#/login"}>login</p>
                <p onClick={() => window.location="#/register"}>Register</p>
            </div>
            
            
        );
    }

}
