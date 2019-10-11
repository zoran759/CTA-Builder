
import React, { Component } from "react";

class SocialShare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {

    return (
      <div className="cta-socials-share">
        <h3>Enjoyed this app?</h3>
        <p>Help us spread the word about this free app</p>
        <div className="btn-neutral-outline"><i className="icon-twitter"></i><span>Twitter</span></div>
        <div className="btn-neutral-outline"><i className="icon-facebook"></i><span>Facebook</span></div>
        <div className="btn-neutral-outline mb-0"><i className="icon-mail"></i><span>E-mail</span></div>
      </div>
    );
  }
}

export default SocialShare;