import React, { Component } from "react";
import { TabComponent } from '@syncfusion/ej2-react-navigations';
import { Image, Container } from "semantic-ui-react";
import comp from '../../../assets/icon/komp.png'
import fam from '../../../assets/icon/family.png'
import fnr from '../../../assets/icon/f&r.png'
import bis from '../../../assets/icon/bisnis.png'
import fash from '../../../assets/icon/fashion.png'
import quo from '../../../assets/icon/quotes.png'
import rid from '../../../assets/icon/riddle.png'
import oth from '../../../assets/icon/other.png'
import fol from '../../../assets/icon/follow.png'
import Content from "./content";
import PostOther from "./PostingOther";
import PostQuotes from "./PostingQuotes";
import PostRiddles from "./PostingRiddles";
import PostComputerGadget from "./PostingComputerGadget";
import PostFamilyLove from "./PostingFamilyLove";
import PostFactRumour from "./PostingFactRumour";
import PostBussinessWork from "./PostingBussinessWork";
import PostFashionLifestyle from "./PostingFashionLifestyle";


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
        <TabComponent id='defaultTab' overflowMode='Scrollable' style={{ background: "#fff", boxShadow: '0 8px 6px -6px #999999'}}>
          <div className="e-tab-header" style={{position: "fixed", zIndex: 1}}>
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
          <br />
          <br />
          <br />
          <div className="e-content">
            <div>
              <Container>
                <Content />
              </Container>
            </div>
            <div>
              <Container>
                <PostComputerGadget />
              </Container>
            </div>
            <div>
              <Container>
                <PostFamilyLove />
                </Container>
            </div>
            <div>
              <Container>
                <PostFactRumour />
              </Container>
            </div>
            <div>
              <Container>
                <PostBussinessWork />
              </Container>
            </div>
            <div>
              <Container>
                <PostFashionLifestyle />
              </Container>
            </div>
            <div>
              <Container>
                <PostQuotes />
              </Container>
            </div>
            <div>
              <Container>
                <PostRiddles />
              </Container>
            </div>
            <div>
              <Container>
                <PostOther />
              </Container>
            </div>
          </div>
        </TabComponent>
      </div>
    )
  }
}