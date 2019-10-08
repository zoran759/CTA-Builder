import React, { Component } from "react";
import Select from 'react-select';
import { BEHAVIOR_POSITIONS } from "../defines";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  getPositionValue = () => {
    const { behavior } = this.props;
    let pos = {};
    BEHAVIOR_POSITIONS.forEach((position) => {
      if (behavior.position == position.value) pos = position
    })

    return pos;
  }

  onPositionChange = () => {

  }

  render() {
    const { isActive, behavior, onUpdate, isMinimal } = this.props;

    return (
      <div className={`cta-sidebar ${isActive ? 'active' : ''}`}>
        <div className={`mb-d ${isMinimal ? "d-none": ''}`}>
          <label>Display on</label>
          <label className="checkbox text-default">
            Desktop
          <input name="custom-links" type="checkbox" checked={behavior.displayOnDesktop} onChange={(e) => { behavior.displayOnDesktop = !behavior.displayOnDesktop; onUpdate(behavior) }} />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox text-default">
            Mobile
          <input name="custom-links" type="checkbox" checked={behavior.displayOnMobile} onChange={(e) => { behavior.displayOnMobile = !behavior.displayOnMobile; onUpdate(behavior) }} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div>
          <label>Position</label>
          <Select
            value={this.getPositionValue()}
            onChange={(value) => { behavior.position = value.value; onUpdate(behavior) }}
            options={BEHAVIOR_POSITIONS}
            className={"cta-select inline-transparent ml-input"}
            classNamePrefix={"cta-select"}
          />
          <label>Margins</label>
          <div className={`cta-inline-label ${behavior.position == BEHAVIOR_POSITIONS[1].value ? "mb-d" : ''}`}>
            <span>bottom</span>
            <div className="cta-size-input"><input type="number" value={behavior.bottom} onChange={(e) => { behavior.bottom = e.target.value; onUpdate(behavior) }} placeholder="" /></div>
          </div>
          <div className={`cta-inline-label ${behavior.position != BEHAVIOR_POSITIONS[2].value ? "d-none" : 'mb-d'}`}>
            <span>left</span>
            <div className="cta-size-input"><input type="number" value={behavior.left} onChange={(e) => { behavior.left = e.target.value; onUpdate(behavior) }} placeholder="" /></div>
          </div>
          <div className={`cta-inline-label mb-d ${behavior.position != BEHAVIOR_POSITIONS[0].value ? "d-none" : ''}`}>
            <span>right</span>
            <div className="cta-size-input"><input type="number" value={behavior.right} onChange={(e) => { behavior.right = e.target.value; onUpdate(behavior) }} placeholder="" /></div>
          </div>
        </div>
        <div className={`${isMinimal ? "d-none": ''}`}>
          <label>Behavior</label>
          <label className="checkbox text-default">
            Auto-open on page load
          <input name="custom-links" type="checkbox" checked={behavior.autoOpen} onChange={(e) => { behavior.autoOpen = !behavior.autoOpen; onUpdate(behavior) }} />
            <span className="checkmark"></span>
          </label>
          <div className={`cta-inline-label mb-d ${!behavior.autoOpen ? "disabled" : ''}`}>
            <span>Delay</span>
            <div className="cta-size-input ms"><input type="number" value={behavior.delay} onChange={(e) => { behavior.delay = e.target.value; onUpdate(behavior) }} placeholder="" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;