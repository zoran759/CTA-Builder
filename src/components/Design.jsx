import React, { Component } from "react";
import { LAYOUT_NAMES } from "../defines";
import ToolTip from "../components/ToolTip";
import { validateEmail, validURL } from '../utils/utils';


class Design extends Component {
  constructor(props) {
    super(props);

    this.state = { isStatic: false }

    this.contentContainer = React.createRef();
    this.designContainer = React.createRef();
  }

  componentDidMount() {
    this.events();
    this.checkPosition(3000);
  }

  events = () => {
    window.addEventListener("resize", () => {
      this.checkPosition();
    });
    document.addEventListener("updateApp", () => {
      this.checkPosition(200);
    });
  }

  navigateToTab = (name) => {
    const { onUpdateTabs, tabs, setTooltip } = this.props;

    for (let i in tabs) {
      tabs[i] = false;
      if (i == name) tabs[i] = true;
    }
    onUpdateTabs(tabs);

    if (name == "isTriggerButtonTab" && this.ifTriggerButton) setTooltip("isTriggerOnlyTooltip");
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

  generateLink = () => {
    const { data } = this.props;
    let pdata = this.b64EncodeUnicode(JSON.stringify({ email: data.email, company: data.company }));
    let url = data.folder + "privacy/?d=" + pdata;

    return <div className={`cta-content-legal-links ${!validateEmail(data.email) ? "disabled" : ''}`}><a target="_blank" href={url}>Terms & Privacy Policy Information</a></div>;
  }

  b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  checkPosition = (withTimeout) => {

    setTimeout(() => {
      if (this.contentContainer.current && this.designContainer.current) {
        if (this.contentContainer.current.offsetHeight + 200 > this.designContainer.current.offsetHeight) {
          this.setState({ isStatic: true });
        } else {
          this.setState({ isStatic: false });
        }
      }
    }, withTimeout ? withTimeout : 0)
  }

  render() {
    const { isActive, data, behavior, toolTips, isDesign, clearInputs } = this.props;
    const { isStatic } = this.state;

    return (
      <div className={`cta-design ${isStatic ? 'static' : ''} ${isActive ? 'active' : ''}`} ref={this.designContainer}>
        <div className="cta-content-container" ref={this.contentContainer}>
          <div className={`cta-design-clear ${this.ifTriggerButton() ? "d-none" : ''}`} onClick={clearInputs}>
            <i className="icon-refresh"></i> Clear <span>all input fields</span>
          </div>
          <div className={`cta-design-edit ${this.ifTriggerButton() ? "d-none" : ''}`} onClick={() => { this.navigateToTab("isBackgroundTab") }}>
            Card styling <i className="icon-card-style"></i>
          </div>
          <div className={`cta-content active ${this.ifTriggerButton() ? "d-none" : ''}`} style={{ width: data.width + "px", background: data.background, border: data.stroke ? data.stroke : "none", borderRadius: data.corner + "px", borderColor: data.stroke, boxShadow: data.shadow }}>
            <div className={`cta-content-close ${this.ifOnlyImage() ? "d-none" : ''} ${data.closePosition}`}><i className="icon-close"></i></div>
            <div className={`cta-block cta-content-logo ${data.logo && data.logo != "http://" && data.logo != "https://" ? "filed" : ''} ${data.logoAlign} ${data.logoStyle}`} onClick={() => { this.navigateToTab("isLogoTab") }}>
              {data.logo && data.logo != "http://" && data.logo != "https://" ? <a target="_blank"><img style={{ width: data.logoMaxWidth + "px" }} src={data.logo} /></a> : <div><div>Logo <span className="cta-optional">(optional)</span></div></div>}
            </div>
            <div className={`cta-blocks ${data.imageAlign} ${data.imageStyle}`}>
              <div className={`cta-block cta-content-image ${data.image && data.image != "http://" && data.image != "https://" ? "filed" : ''} ${data.imageAlign} ${data.imageStyle}`} onClick={() => { this.navigateToTab("isFeaturedImageTab") }}>
                {data.image && data.image != "http://" && data.image != "https://" ? <img src={data.image} style={{ width: data.imageWidth + "px" }} /> : <div><div>Header image <span className="cta-optional">(optional)</span></div></div>}
              </div>
              <div className={`cta-block cta-content-text ${data.reason ? "filed" : ''}`} onClick={() => { this.navigateToTab("isCallToActionTab") }} style={{ fontSize: data.size + "px", fontFamily: data.font, color: data.color, fontWeight: data.reasonWeight, fontStyle: data.reasonItalic, textAlign: data.reasonAlign }}>
                <ToolTip isActive={isDesign && toolTips.isCallToActionTooltip} text="Click the text block to edit the dummy content." type="left" />
                {data.reason.length > 0 ? data.reason : <div><div>Add Call to action text</div></div>}
              </div>
            </div>
            <div className={`cta-block cta-content-text ${data.secondaryReason ? "filed" : ''}`} onClick={() => { this.navigateToTab("isSecondaryTextTab") }} style={{ fontSize: data.secondarySize + "px", fontFamily: data.secondaryFont, color: data.secondaryColor, fontWeight: data.secondaryReasonWeight, fontStyle: data.secondaryReasonItalic, textAlign: data.secondaryReasonAlign }}>
              {data.secondaryReason.length > 0 ? data.secondaryReason : <div><div>Add Secondary text <span className="cta-optional">(optional)</span></div></div>}
            </div>
            <div style={{ textAlign: data.mainButtonAlign }}>
              {
                this.ifFlyoutButton() ?
                  (
                    <>
                      <div className={`cta-content-button main ${data.mainButtonType} ${data.mainButtonAlign}`} onClick={() => { this.navigateToTab("isMainButtonTab") }} style={{
                        background: data.mainButtonBackground,
                        color: data.mainButtonFontColor,
                        fontFamily: (data.mainButtonLabel || data.mainButtonIcon) ? data.mainButtonFont : '',
                        borderRadius: data.mainButtonCorner + "px",
                        borderColor: data.mainButtonStroke,
                        boxShadow: data.mainButtonShadow,
                        fontSize: data.mainButtonFontSize + "px",
                        fontWeight: data.mainButtonWeight,
                        fontStyle: data.mainButtonItalic
                      }}>
                        {(data.mainButtonLabel || data.mainButtonIcon) ? data.mainButtonIcon ? <><i className={data.mainButtonIcon}></i>{data.mainButtonLabel}</> : <>{data.mainButtonLabel}</> : <span>Setup main button</span>}
                      </div>
                      <ToolTip isActive={isDesign && toolTips.isMainButtonTooltip} text="Only used on mobile, to open the native SMS app" type="top" />
                    </>
                  ) : ''
              }

            </div>
            <div className={`cta-content-legal ${(data.privacy && data.terms) || (data.company && data.email) ? "filed" : ''}`} onClick={() => { this.navigateToTab("isComplianceTab") }} style={{ fontSize: data.complianceSize + "px", fontFamily: data.complianceFont, color: data.complianceColor, fontWeight: data.complianceWeight, fontStyle: data.complianceItalic, textAlign: data.complianceAlign }}>
              {(data.privacy && data.terms) || (data.company && data.email) ?
                <div className="cta-content-unsubscribe">
                  Reply STOP to unsubscribe or HELP for help. Estim. {data.estimated} msgs/month. Msg&Data rates may apply.
            </div>
                :
                ''}
              {data.customPrivacy ?
                (data.privacy && data.terms) ? <div className={`cta-content-legal-links ${!validURL(data.privacy) || !validURL(data.terms) ? "disabled" : ''}`}><a target="_blank" href={data.privacy}>Privacy Policy</a> <a target="_blank" href={data.terms}>Terms & Conditions</a></div> : <div className="cta-legal-toggler">Setup legal footnote</div>
                :
                (data.company && data.email) ? this.generateLink() : <div className="cta-legal-toggler"><span>Setup legal footnote</span></div>
              }
            </div>
            {data.isPowered ? (<div className="cta-content-copyright"><a target="_blank">Powered by SimpleTexting.com</a></div>) : ''}
          </div>
          <div className={`cta-trigger-button-container ${behavior.position}`}>
            <ToolTip isActive={isDesign && toolTips.isTriggerOnlyTooltip && this.ifTriggerButton()} text="Click the button to start editing it" type="middle-trigger" />
            {
              !this.ifOnlyImage() && this.ifFlyoutButton() ?
                (
                  <div className={`cta-content-button trigger ${data.triggerButtonType} ${data.triggerButtonAlign}`} onClick={() => { this.navigateToTab("isTriggerButtonTab") }} style={{
                    background: data.triggerButtonBackground,
                    color: data.triggerButtonFontColor,
                    fontFamily: (data.triggerButtonLabel || data.triggerButtonIcon) ? data.triggerButtonFont : '',
                    borderRadius: data.triggerButtonCorner + "px",
                    borderColor: data.triggerButtonStroke,
                    boxShadow: data.triggerButtonShadow,
                    fontSize: data.triggerButtonFontSize + "px",
                    fontWeight: data.triggerButtonWeight,
                    fontStyle: data.triggerButtonItalic
                  }}>
                    {(data.triggerButtonLabel || data.triggerButtonIcon) ? data.triggerButtonIcon ? <><i className={data.triggerButtonIcon}></i>{data.triggerButtonLabel}</> : <>{data.triggerButtonLabel}</> : <span>Setup trigger button</span>}
                  </div>
                ) : ''
            }
          </div>
          <div className={`cta-contus-button-container ${behavior.position}`}>
            {
              !this.ifOnlyImage() && this.ifTriggerButton() ?
                (
                  <div className={`cta-content-button trigger ${data.textUsButtonType} ${data.textUsButtonAlign}`} onClick={() => { this.navigateToTab("isContactUsButtonTab") }} style={{
                    background: data.textUsButtonBackground,
                    color: data.textUsButtonFontColor,
                    fontFamily: (data.textUsButtonLabel || data.textUsButtonIcon) ? data.textUsButtonFont : '',
                    borderRadius: data.textUsButtonCorner + "px",
                    borderColor: data.textUsButtonStroke,
                    boxShadow: data.textUsButtonShadow,
                    fontSize: data.textUsButtonFontSize + "px",
                    fontWeight: data.textUsButtonWeight,
                    fontStyle: data.textUsButtonItalic
                  }}>
                    {(data.textUsButtonLabel || data.textUsButtonIcon) ? data.textUsButtonIcon ? <><i className={data.textUsButtonIcon}></i>{data.textUsButtonLabel}</> : <>{data.textUsButtonLabel}</> : <span>Setup click-to-text button</span>}
                  </div>
                ) : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Design;