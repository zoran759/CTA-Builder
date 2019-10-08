import React, { Component } from "react";

class DropDown extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { isOpen } = this.props;

    return (
      <div className={`cta-dropdown ${isOpen ? 'active' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

export default DropDown;