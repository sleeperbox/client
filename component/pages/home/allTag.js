import React, { Component } from "react";
import { TabComponent } from '@syncfusion/ej2-react-navigations';
import { Divider, Image } from "semantic-ui-react";
import comp from '../../../assets/icon/komp.png'
import fam from '../../../assets/icon/family.png'
import fnr from '../../../assets/icon/f&r.png'
import bis from '../../../assets/icon/bisnis.png'
import fash from '../../../assets/icon/fashion.png'
import quo from '../../../assets/icon/quotes.png'
import rid from '../../../assets/icon/riddle.png'
import oth from '../../../assets/icon/other.png'
import fol from '../../../assets/icon/follow.png'


const iconSizing = {
  width: 18, height: 18
}

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
        <TabComponent id='defaultTab' overflowMode='Scrollable' style={{position: "fixed", background: "#fff", boxShadow: '0 8px 6px -6px #999999' }}>
          <div className="e-tab-header">
            <div> <Image src={fol} style={iconSizing}/> You Follow </div>
            <div> <Image src={comp} style={iconSizing}/>&nbsp;Computer &amp; Gadget </div>
            <div> <Image src={fam}  style={iconSizing}/>&nbsp;Family &amp; Love </div>
            <div> <Image src={fnr}  style={iconSizing}/>&nbsp;Fact &amp; Rumor </div>
            <div> <Image src={bis}  style={iconSizing}/>&nbsp;Business &amp; Work </div>
            <div> <Image src={fash}  style={iconSizing}/>Fashion &amp; Lifestyle </div>
            <div> <Image src={quo} style={iconSizing}/>&nbsp;Quotes </div>
            <div> <Image src={rid} style={iconSizing}/> Riddles </div>
            <div> <Image src={oth}  style={iconSizing}/>&nbsp;Other </div>
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