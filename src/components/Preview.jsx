import React, { Component } from "react";

class Preview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { isActive, data } = this.props;

    return (
      <div className={`cta-preview ${isActive ? 'active' : ''}`}>
        <div className="cta-content"></div>
      </div>
    );
  }
}

export default Preview;