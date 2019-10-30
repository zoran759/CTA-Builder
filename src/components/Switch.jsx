import React, { Component } from "react";

class Switch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isActive, onUpdate, label } = this.props;

    return (
      <label className="switch">{label}
        <input type="checkbox" onChange={onUpdate} checked={isActive}/>
        <span className="checkmark"></span>
      </label>

    );
  }
}

export default Switch;