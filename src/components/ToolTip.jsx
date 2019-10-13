import React, { Component } from "react";

class ToolTip extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  renderArrow = (type) => {
    switch (type) {
      case 'left':
        return <i className="icon-arrow-special-right"></i>;
      case 'right':
        return <i className="icon-arrow-special-left"></i>;
      case 'top':
        return <i className="icon-arrow-special-bottom-left"></i>;
      case 'top-header':
        return <i className="icon-arrow-special-right-bottom"></i>;
      case 'top-preview':
        return <i className="icon-arrow-special-left-bottom"></i>;
      case 'bottom-trigger':
        return <i className="icon-arrow-special-right-top"></i>;
      case 'middle-trigger':
        return <i className="icon-arrow-special-right-top"></i>;
      default:
        return <i className="icon-arrow-special-right"></i>;
    }
  }

  render() {
    const { isActive, text, type } = this.props;

    return (
      <div className={`cta-special-tooltip ${type} ${isActive ? 'active' : ''}`}>
        {this.renderArrow(type)}
        {text}
      </div>
    );
  }
}

export default ToolTip;