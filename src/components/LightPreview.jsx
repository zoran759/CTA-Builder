import React, { Component } from "react";
import DropDown from "./DropDown";
import { LAYOUT_NAMES } from "../defines";
import ReactTooltip from 'react-tooltip';
import shortLinks from "../services/shortLinks";

let isMounted = false;

class LightPreview extends Component {
  constructor(props) {
    super(props);

    this.shortLinks = new shortLinks();

    this.state = {
      isDesktop: true,
      isModal: false,
      isDesign: true,
      isOpenDropDown: false,
    }
  }

  componentDidMount() {
    isMounted = true;
    this.events();
  }

  componentWillUnmount() {
    isMounted: false;
    document.removeEventListener("click", () => { });
  }

  events = () => {
    document.addEventListener("click", (e) => {
      if (isMounted) if (e.target.closest('.cta-content') == null && e.target.closest('.cta-content-button.trigger') == null) {
        this.setState({ isModal: false });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { isDesign } = this.props;

    isMounted = true;

    if (!isDesign == prevProps.isDesign) {
      if (isDesign) {
        this.setState({ isModal: false });
      } else {
        this.setState({ isModal: false }, () => {
          this.behaviorInit();
        });
      }
    }
  }

  onDesktop = () => {
    this.setState({ isDesktop: true, isModal: false }, () => {
      this.behaviorInit();
    });
  }

  onPhone = () => {
    this.setState({ isDesktop: false, isModal: false }, () => {
      this.behaviorInit();
    });
  }

  behaviorInit = () => {
    const { data, behavior } = this.props;
    if (data.triggerButtonLabel || data.triggerButtonIcon) {
      if (behavior.autoOpen) {
        setTimeout(() => {
          this.setState({ isModal: true });
        }, behavior.delay)
      }
    }
  }

  navigateToTab = (name) => {
    const { onUpdateTabs, tabs } = this.props;

    for (let i in tabs) {
      tabs[i] = false;
      if (i == name) tabs[i] = true;
    }
    onUpdateTabs(tabs);
  }

  ifOnlyImage = () => {
    const { layoutName } = this.props;
    return layoutName == LAYOUT_NAMES[0];
  }

  ifFlyoutButton = () => {
    const { layoutName } = this.props;
    return layoutName == LAYOUT_NAMES[1];
  }

  ifTriggerButton = () => {
    const { layoutName } = this.props;
    return layoutName == LAYOUT_NAMES[2];
  }

  onTrigger = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  }

  onClose = () => {
    this.setState({ isModal: false });
  }

  ifTriggerAvailable = () => {
    const { data } = this.props;
    return (data.triggerButtonLabel || data.triggerButtonIcon);
  }

  onCloseTriger = () => {
    this.setState({ isOpenDropDown: true });
  }

  onCloseNotification = () => {
    this.setState({ isOpenDropDown: false });
  }

  onCloseNot = () => {
    this.setState({ isOpenDropDown: false });
  }

  generateLink = () => {
    const {data} = this.props;
    var pdata = this.b64EncodeUnicode(JSON.stringify({ email: data.email, company: data.company }));

    //if(validateEmail(data.email) && (data.company.length > 0)) this.shortLinks.set(url);

    return <div className="cta-content-legal-links"><a target="_blank" href={data.folder + "privacy/?d=" + pdata}>For Terms & Privacy Policy, please visit {data.folder + "privacy/?d=" + pdata}</a></div>;
  }

  b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  render() {
    const { isDesktop, isModal, isOpenDropDown } = this.state;
    const { data, behavior, modal } = this.props;

    return (
      <div className={`cta-design preview active pointer-none`}>
        <div
          className={`cta-content-container ${!this.ifOnlyImage() ? behavior.position : ''}`}
          style={!this.ifOnlyImage() ? {
            bottom: Number(behavior.bottom) + "px",
            left: Number(behavior.left) + 16 + "px",
            right: behavior.right + 16 + "px"
          } : {}}
        >
          <div
            className={`cta-content ${isModal || this.ifOnlyImage() ? "active" : ''} ${this.ifTriggerButton() ? "d-none" : ''} ${(!data.logo || data.logo == "http://" || data.logo == "https://") && data.image ? "without-logo" : ''}`}
            style={{
              width: data.width + "px",
              background: data.background,
              border: data.stroke ? data.stroke : "none",
              borderRadius: data.corner + "px",
              borderColor: data.stroke,
              boxShadow: data.shadow
            }}
            ref={modal}
          >
            <div className={`cta-content-close ${this.ifOnlyImage() ? "d-none" : ''} ${data.closePosition}`} onClick={this.onClose}><i className="icon-close"></i></div>
            <div className={`cta-block cta-content-logo ${data.logo && data.logo != "http://" && data.logo != "https://" ? "filed" : ''} ${data.logoAlign} ${data.logoStyle}`}>
              {data.logo && data.logo != "http://" && data.logo != "https://" ? <a target="_blank" href={data.hyperlink ? data.hyperlink : "#"}><img style={{ width: data.logoMaxWidth + "px" }} src={data.logo} /></a> : <div><div>Logo <span className="cta-optional">(optional)</span></div></div>}
            </div>
            <div className={`cta-blocks ${data.imageAlign} ${data.imageStyle}`}>
              <div className={`cta-block cta-content-image ${data.image && data.image != "http://" && data.image != "https://" ? "filed" : ''} ${data.imageAlign} ${data.imageStyle}`}>
                {data.image && data.image != "http://" && data.image != "https://" ? <img src={data.image} /> : <div><div>Header image <span className="cta-optional">(optional)</span></div></div>}
              </div>
              <div className={`cta-block cta-content-text ${data.reason ? "filed" : ''}`} style={{ fontSize: data.size + "px", fontFamily: data.font, color: data.color, fontWeight: data.reasonWeight, fontStyle: data.reasonItalic, textAlign: data.reasonAlign }}>
                {data.reason.length > 0 ? data.reason : <div><div>Add Call to action text</div></div>}
              </div>
            </div>
            <div className={`${isDesktop ? "d-none" : ''}`} style={{ textAlign: data.mainButtonAlign }}>
              {
                this.ifFlyoutButton() ?
                  (
                    <div className={`cta-content-button main ${data.mainButtonType} ${data.mainButtonAlign}`} style={{
                      background: data.mainButtonBackground,
                      color: data.mainButtonFontColor,
                      fontFamily: data.mainButtonFont,
                      borderRadius: data.mainButtonCorner + "px",
                      borderColor: data.mainButtonStroke,
                      boxShadow: data.mainButtonShadow,
                      fontSize: data.mainButtonFontSize + "px",
                      fontWeight: data.mainButtonWeight,
                      fontStyle: data.mainButtonItalic
                    }}>
                      {data.mainButtonLabel || data.mainButtonIcon ? data.mainButtonIcon ? <><i className={data.mainButtonIcon}></i>{data.mainButtonLabel}</> : <>{data.mainButtonLabel}</> : <span>Main button not configured</span>}
                    </div>
                  ) : ''
              }
            </div>
            <div className={`cta-content-legal ${(data.privacy && data.terms) || (data.company && data.email) ? "filed" : ''}`} style={{ fontSize: data.complianceSize + "px", fontFamily: data.complianceFont, color: data.complianceColor, fontWeight: data.complianceWeight, fontStyle: data.complianceItalic, textAlign: data.complianceAlign }}>
              {(data.privacy && data.terms) || (data.company && data.email) ?
                <div className="cta-content-unsubscribe">
                  Reply STOP to unsubscribe or HELP for help. Estim. {data.estimated} msgs/month. Msg&Data rates may apply.
            </div>
                :
                ''}
              {data.customPrivacy ?
                (data.privacy && data.terms) ? <div className="cta-content-legal-links"><div><a target="_blank" href={data.privacy}>For Privacy Policy, visit {data.privacy}</a></div><div><a target="_blank" href={data.terms}>For Terms & Conditions visit {data.terms}</a></div></div> : <div className="cta-legal-toggler">Setup legal footnote</div>
                :
                (data.company && data.email) ? this.generateLink() : <div className="cta-legal-toggler"><span>Legal footnote not configured.</span></div>
              }
            </div>
          </div>
          <div className={`cta-trigger-button-container ${behavior.position}`}>
            <div className={`cta-btn-close cta-dropdown-toggler ${!this.ifTriggerAvailable() ? "d-none" : ''}`} onClick={this.onCloseTriger}><i className="icon-close"></i></div>
            <ReactTooltip id='dropdown' place="left" className="tolltip-basic" effect="solid" />
            <DropDown isOpen={isOpenDropDown} onClose={this.onCloseNot}>
              <div className="cta-btn-close" onClick={this.onCloseNotification}><i className="icon-close"></i></div>
              <div className="cta-dropdown-link" data-tip="Buttons disabled in preview" data-for='dropdown'><span>Remind me later</span></div>
              <div className="cta-dropdown-link" data-tip="Buttons disabled in preview" data-for='dropdown'><span>Don’t show this again</span></div>
            </DropDown>
            {
              !this.ifOnlyImage() ?
                (
                  <div
                    onClick={this.onTrigger}
                    className={`cta-content-button trigger ${(isDesktop && !behavior.displayOnDesktop) ? "d-none" : ''} ${(!isDesktop && !behavior.displayOnMobile) ? "d-none" : ''} ${data.triggerButtonType} ${data.triggerButtonAlign} ${(!data.triggerButtonLabel && !data.triggerButtonIcon) ? "disabled" : ''}`}
                    style={{
                      background: data.triggerButtonBackground,
                      color: data.triggerButtonFontColor,
                      fontFamily: data.triggerButtonFont,
                      borderRadius: data.triggerButtonCorner + "px",
                      borderColor: data.triggerButtonStroke,
                      boxShadow: data.triggerButtonShadow,
                      fontSize: data.triggerButtonFontSize + "px",
                      fontWeight: data.triggerButtonWeight,
                      fontStyle: data.triggerButtonItalic
                    }}>
                    {this.ifTriggerAvailable() ? data.triggerButtonIcon ? <><i className={data.triggerButtonIcon}></i>{data.triggerButtonLabel}</> : <>{data.triggerButtonLabel}</> : <span>Trigger button not configured</span>}
                  </div>
                ) : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default LightPreview;