import React, { Component } from "react";

class LayoutChoose extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onLayoutChoose} = this.props;

    return (
      <div className="cta-layout-choose">
        <div onClick={()=>{onLayoutChoose(0)}}>
          <div className="cta-layout-choose-img"><img src="assets/img/graphic-img.svg" /></div>
          <h3>Graphic</h3>
          <p>Create a call-to-action which you can embed on your website or export as an image.</p>
        </div>
        <div onClick={()=>{onLayoutChoose(1)}}>
          <div className="cta-layout-choose-img"><img src="assets/img/button-flyout-img.svg" /></div>
          <h3>Button + flyout</h3>
          <p>Create a button that opens a pop-up with more info. On mobile phones, it opens the native SMS app.</p>
        </div>
        <div onClick={()=>{onLayoutChoose(2)}}>
          <div className="cta-layout-choose-img"> <img src="assets/img/button-img.svg" /></div>
          <h3>Click-to-text button</h3>
          <p>Create a button that redirects users to their default SMS app and prefills the contact number and text.</p>
        </div>
      </div>
    );
  }
}

export default LayoutChoose;