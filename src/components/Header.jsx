import React, { Component } from "react";
import DropDown from "../components/DropDown";
import { LAYOUT_NAMES } from "../defines"

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
    this.setState({isOpenMainMenu:false});
  }

  render() {
    const { isOpenMainMenu } = this.state;
    const { isDesign, layoutName, onViewChange, onLayoutToggler } = this.props;

    return (
      <div className="cta-header">
        <div className="cta-header-menu">
          <button className="btn btn-transparent cta-toggler cta-dropdown-toggler" onClick={this.onMainToggler}><i className="icon-menu"></i></button>
          <DropDown isOpen={isOpenMainMenu} onClose={this.onCloseMenu}>
            <div><i className="icon-help-circle"></i><span>Self-help center</span><i className="icon-new-window op05 ml-1"></i></div>
            <div><i className="icon-share"></i><span>Share this app</span></div>
            <div><i className="icon-sidebar"></i><span>Exit</span></div>
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
          <div className={`cta-link ${isDesign ? 'active' : ''}`} onClick={()=>{onViewChange(true)}}>Design</div>
          <div className={`cta-link ${!isDesign ? 'active' : ''}`}  onClick={()=>{onViewChange(false)}}>Preview</div>
        </div>
        <div className="cta-header-button">
          <button className="btn btn-special">Export <span className="hide-mobile">& embed</span></button>
        </div>
      </div>
    );
  }
}

export default Header;