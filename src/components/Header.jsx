import React, { Component } from "react";
import DropDown from "../components/DropDown";
import { LAYOUT_NAMES } from "../defines"

let isMounted = false;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMainMenu: false,
      currentView: "design",
    };
  }

  componentDidMount() {
    isMounted = true;
    this.events();
  }

  componentWillUnmount(){
    isMounted: false;
    document.removeEventListener("click", ()=>{});
  }

  events = () =>{
    document.addEventListener("click", (e) => {
      if (isMounted) if (e.target.closest('.cta-dropdown') == null && e.target.closest('.cta-toggler') == null) this.setState({ isOpenMainMenu: false });
    });
  }

  onMainToggler = () => {
    const { isOpenMainMenu } = this.state;
    this.setState({ isOpenMainMenu: !isOpenMainMenu });
  }

  render() {
    const { isOpenMainMenu } = this.state;
    const { view, layoutName, onViewChange, onLayoutToggler } = this.props;

    return (
      <div className="cta-header">
        <div className="cta-header-menu">
          <button className="btn btn-transparent cta-toggler" onClick={this.onMainToggler}><i className="icon-menu"></i></button>
          <DropDown isOpen={isOpenMainMenu}>
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
          <div className={`cta-link ${view == "design" ? 'active' : ''}`} onClick={()=>{onViewChange("design")}}>Design</div>
          <div className={`cta-link ${view == "preview" ? 'active' : ''}`}  onClick={()=>{onViewChange("preview")}}>Preview</div>
        </div>
        <div className="cta-header-button">
          <button className="btn btn-special">Export <span className="hide-mobile">& embed</span></button>
        </div>
      </div>
    );
  }
}

export default Header;