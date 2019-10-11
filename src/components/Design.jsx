import React, { Component } from "react";
import { LAYOUT_NAMES } from "../defines"

class Design extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const { isActive, data,  behavior } = this.props;

    return (
      <div className={`cta-design ${isActive ? 'active' : ''}`}>
        <div className="cta-content-container">
          <div className={`cta-design-edit ${this.ifTriggerButton() ? "d-none" : ''}`} onClick={() => { this.navigateToTab("isBackgroundTab") }}>
            Card styling <i className="icon-card-style"></i>
          </div>
          <div className={`cta-content active ${this.ifTriggerButton() ? "d-none" : ''}`} style={{ width: data.width + "px", background: data.background, border: data.stroke ? data.stroke : "none", borderRadius: data.corner + "px", borderColor: data.stroke, boxShadow: data.shadow }}>
            <div className={`cta-content-close ${this.ifOnlyImage() ? "d-none" : ''} ${data.closePosition}`}><i className="icon-close"></i></div>
            <div className={`cta-block cta-content-logo ${data.logo && data.logo != "http://" && data.logo != "https://" ? "filed" : ''} ${data.logoAlign} ${data.logoStyle}`} onClick={() => { this.navigateToTab("isLogoTab") }}>
              {data.logo && data.logo != "http://" && data.logo != "https://" ? <a target="_blank" href={data.hyperlink ? data.hyperlink : "#"}><img style={{ width: data.logoMaxWidth + "px" }} src={data.logo} /></a> : <div><div>Logo <span className="cta-optional">(optional)</span></div></div>}
            </div>
            <div className={`cta-blocks ${data.imageAlign} ${data.imageStyle}`}>
              <div className={`cta-block cta-content-image ${data.image && data.image != "http://" && data.image != "https://" ? "filed" : ''} ${data.imageAlign} ${data.imageStyle}`} onClick={() => { this.navigateToTab("isFeaturedImageTab") }}>
                {data.image && data.image != "http://" && data.image != "https://" ? <img src={data.image} /> : <div><div>Header image <span className="cta-optional">(optional)</span></div></div>}
              </div>
              <div className={`cta-block cta-content-text ${data.reason ? "filed" : ''}`} onClick={() => { this.navigateToTab("isCallToActionTab") }} style={{ fontSize: data.size + "px", fontFamily: data.font, color: data.color, fontWeight: data.reasonWeight, fontStyle: data.reasonItalic, textAlign: data.reasonAlign }}>
                {data.reason.length > 0 ? data.reason : <div><div>Add Call to action text</div></div>}
              </div>
            </div>
            <div style={{ textAlign: data.mainButtonAlign }}>
              {
                this.ifFlyoutButton() ?
                  (
                    <div className={`cta-content-button main ${data.mainButtonType} ${data.mainButtonAlign}`} onClick={() => { this.navigateToTab("isMainButtonTab") }} style={{
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
                      {(data.mainButtonLabel || data.mainButtonIcon) ? data.mainButtonIcon ? <><i className={data.mainButtonIcon}></i>{data.mainButtonLabel}</> : <>{data.mainButtonLabel}</> : <span>Setup main button</span>}
                    </div>
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
                (data.privacy && data.terms) ? <div className="cta-content-legal-links"><a target="_blank" href={data.privacy}>Privacy Policy</a> <a target="_blank" href={data.terms}>Terms & Conditions</a></div> : <div className="cta-legal-toggler">Setup legal footnote</div>
                :
                (data.company && data.email) ? <div className="cta-content-legal-links"><a target="_blank" href="#">Terms & Privacy Policy Information</a></div> : <div className="cta-legal-toggler"><span>Setup legal footnote</span></div>
              }
            </div>
          </div>
          <div className={`cta-trigger-button-container ${behavior.position}`}>
            {
              !this.ifOnlyImage() ?
                (
                  <div className={`cta-content-button trigger ${data.triggerButtonType} ${data.triggerButtonAlign}`} onClick={() => { this.navigateToTab("isTriggerButtonTab") }} style={{
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
                    {(data.triggerButtonLabel || data.triggerButtonIcon) ? data.triggerButtonIcon ? <><i className={data.triggerButtonIcon}></i>{data.triggerButtonLabel}</> : <>{data.triggerButtonLabel}</> : <span>Setup trigger button</span>}
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