import React, { Component } from "react";

class EditTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isActive, content } = this.props;

    return (
      <div className={`cta-edittab ${isActive ? 'active' : ''}`}>
        {content}
      </div>
    );
  }
}

export default EditTab;