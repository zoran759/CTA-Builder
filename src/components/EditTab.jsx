import React, { Component } from "react";

class EditTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isActive, content, onClose } = this.props;

    return (
      <div className={`cta-edittab ${isActive ? 'active' : ''}`}>
        <div className="cta-edit-tab-close" onClick={onClose}><i className="icon-close"></i></div>
        {content}
      </div>
    );
  }
}

export default EditTab;