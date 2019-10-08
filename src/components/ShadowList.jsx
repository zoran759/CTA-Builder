import React, { Component } from "react";
import { SHADOWS } from "../defines"

class ShadowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }
  }

  onClickContainer = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  onChooseShadow = (i) => {
    const { onUpdate } = this.props

    onUpdate(SHADOWS[i].shadow);

  }

  render() {

    const { active } = this.state;
    const { value } = this.props;

    return (
      <div className={`cta-shadow-list ${active ? "active" : ''}`} onClick={this.onClickContainer}>
        <div className="cta-shadow-list-dropdown">
          {SHADOWS.map((item, i) => {
            return (<div key={"s" + i} className={`${item.class} ${item.shadow == value ? "active" : ''}`} style={{ boxShadow: item.shadow }} onClick={() => { this.onChooseShadow(i) }}></div>)
          })}
        </div>
      </div>
    );
  }
}

export default ShadowList;