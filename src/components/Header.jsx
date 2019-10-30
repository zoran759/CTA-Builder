import React, { Component } from "react";
import DropDown from "../components/DropDown";
import ReactTooltip from 'react-tooltip';
import { LAYOUT_NAMES } from "../defines";
import ToolTip from "../components/ToolTip";
import {validateEmail, validURL} from '../utils/utils';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMainMenu: false,
      currentView: "design",
    };
  }

  onMainToggler = () => {
    const { isOpenMainMenu } = this.state;
    this.setState({ isOpenMainMenu: !isOpenMainMenu });
  }

  onCloseMenu = () => {
    this.setState({ isOpenMainMenu: false });
  }

  isExportDisabled = () => {
    const { data, layoutName } = this.props;

    if (layoutName == LAYOUT_NAMES[0] || layoutName == LAYOUT_NAMES[1]) {
      if (!data.customPrivacy) if (!data.company || !validateEmail(data.email)) return true;
      if (data.customPrivacy) if (!validURL(data.terms) || !validURL(data.privacy)) return true;
      if (layoutName == LAYOUT_NAMES[1]) if (!data.triggerButtonLabel && !data.triggerButtonIcon) return true;
    }

    if (layoutName == LAYOUT_NAMES[2]) {
      if (layoutName == LAYOUT_NAMES[2]) if (!data.textUsButtonLabel && !data.textUsButtonIcon) return true;
    }

    return false;

  }

  getError = () => {
    const { data, layoutName } = this.props;
    let error = '';

    if (layoutName == LAYOUT_NAMES[0] || layoutName == LAYOUT_NAMES[1]) {
      if (!data.customPrivacy) {
        if (!data.company || !validateEmail(data.email)) error += " Legal footnote";
      }else{
        if (!validURL(data.terms) || !validURL(data.privacy)) error += " Legal footnote";
      }
  
      if (layoutName != LAYOUT_NAMES[0]) {
        if (!data.triggerButtonLabel && !data.triggerButtonIcon) error += " Trigger button";
      }
    }

    if (layoutName == LAYOUT_NAMES[2]) {
      if (!data.textUsButtonLabel && !data.textUsButtonIcon) error += " Call-to-action button";
    }

    return error;
  }

  render() {
    const { isOpenMainMenu } = this.state;
    const { isDesign, layoutName, onViewChange, onLayoutToggler, onSocialToggle, onExportToggle, toolTips } = this.props;

    return (
      <div className="cta-header">
        <div className="cta-header-menu">
          <button className="btn btn-transparent cta-toggler cta-dropdown-toggler" onClick={this.onMainToggler}><i className="icon-menu"></i></button>
          <DropDown isOpen={isOpenMainMenu} onClose={this.onCloseMenu}>
            <div className="cta-dropdown-link"><i className="icon-help-circle"></i><span>Self-help center</span><i className="icon-new-window op05 ml-1"></i></div>
            <div className="cta-dropdown-link" onClick={() => { onSocialToggle() }}><i className="icon-share"></i><span>Share this app</span></div>
            <div className="cta-dropdown-link"><i className="icon-sidebar"></i><span>Exit</span></div>
          </DropDown>
          <div className="cta-layout-toggler" onClick={onLayoutToggler}>
            <div className="cta-layout-toggler-img show-mobile">
              {layoutName == LAYOUT_NAMES[0] ? <img src="assets/img/graphic-img.svg" /> : ''}
              {layoutName == LAYOUT_NAMES[1] ? <img src="assets/img/button-flyout-img.svg" /> : ''}
              {layoutName == LAYOUT_NAMES[2] ? <img className="mt-1" src="assets/img/button-img.svg" /> : ''}
            </div>
            <div className="hide-mobile">{layoutName} <i className="icon-arrow-down"></i></div>
          </div>
        </div>
        <div className="cta-header-view cta-links">
          <div className={`cta-link ${isDesign ? 'active' : ''}`} onClick={() => { onViewChange(true) }}><span>Design</span></div>
          <div className={`cta-link ${!isDesign ? 'active' : ''}`} onClick={() => { onViewChange(false) }}><ToolTip isActive={isDesign && toolTips.isPreviewTooltip} text="Switch to preview to see the final result." type="top-preview" /><span>Preview</span></div>
        </div>
        <div className="cta-header-button">
          <div className="d-inline pos-r" data-tip={`${this.isExportDisabled() ? "Some elements not configued:"+this.getError() : ''}`} data-for='export-tooltip'>
            <button className={`btn btn-special ${this.isExportDisabled() ? "disabled" : ''}`} onClick={() => { onExportToggle() }}>Export <span className="hide-mobile">& embed</span></button>
            <ReactTooltip id='export-tooltip' place="bottom" className="tolltip-basic tw-200" effect="solid" />
            <ToolTip isActive={isDesign && toolTips.isExportTooltip} text="All done? Get your embed instructions here." type="top-header" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;