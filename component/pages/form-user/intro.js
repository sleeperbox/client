import React, { Component } from "react";

export default class intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
          time: new Date(),
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
        };
      }

    componentWillMount(){
        
        const { hour } = this.state;
        console.log(hour);
        if (hour > 5 || hour < 12) {
            <img src="./assets/images/background/goodmorning2.png"/>
            console.log("./assets/images/background/goodmorning2.png")
          } else if (hour > 14 && hour < 18) {
            this.setState({
              background:
                "orage",
              coloring: "#f0f0f0"
            });
          } else {
            this.setState({
              background: "grey",
              coloring: "white"
            });
          }
    }

    render(){
        return(
            <div>
                <img src="./assets/images/background/goodmorning2.png"/>
                lol
            </div>
            // <p onClick={() => window.location="#/login"}>login</p>
            // <p onClick={() => window.location="#/register"}>Register</p>
            
        );
    }

}
