import React, { Component } from "react";
import { TabComponent } from '@syncfusion/ej2-react-navigations';

export default class Alltag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isLoading: true,
    };
  }


  render() {
    return (
      <div style={{ position: "relative",top: 20, zIndex: 2}}>
        <TabComponent id='defaultTab' overflowMode='Scrollable' style={{position: "fixed", background: "#fff" }}>
          <div className="e-tab-header">
            <div> You Follow </div>
            <div> Computer &amp; Gadget </div>
            <div> Family &amp; Love </div>
            <div> Fact &amp; Rumor </div>
            <div> Business &amp; Work </div>
            <div> Fashion &amp; Lifestyle </div>
            <div> Quotes </div>
            <div> Riddles </div>
            <div> Other </div>
          </div>
          <div className="e-content">
            <div>
              {/* you follow */}
            </div>
            <div>
              {/* Computer &amp; Gadget */}
              <p>opening computer and gadget</p>
            </div>
            <div>
              {/* Family &amp; Love */}
              <p>opening family and love</p>
            </div>
            <div>
              {/* Fact &amp; Rumor */}
              <p>opening fact and rumor</p>
            </div>
            <div>
              {/* Business &amp; Work */}
              <p>opening business and work</p>
            </div>
            <div>
              {/* Fashion &amp; Lifestyle */}
              <p>opening fashion and lifestyle</p>
            </div>
            <div>
              {/* Quotes */}
              <p>opening quotes</p>
            </div>
            <div>
              {/* Riddles */}
              <p>opening riddles</p>
            </div>
            <div>
              {/*  Other */}
              <p>opening other</p>
            </div>
          </div>
        </TabComponent>
      </div>
    )
  }
}