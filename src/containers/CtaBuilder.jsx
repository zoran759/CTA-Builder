import React, { Component } from "react";
import Modal from "../components/Modal";
import LayoutChoose from "../components/LayoutChoose";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditTab from "../components/EditTab";
import Preview from "../components/Preview";
import Design from "../components/Design";
import CallToActionTab from "../components/CallToActionTab";
import SecondaryTextTab from "../components/SecondaryTextTab";
import ComplianceTab from "../components/ComplianceTab";
import BackgroundTab from "../components/BackgroundTab";
import LogoTab from "../components/LogoTab";
import FeaturedImageTab from "../components/FeaturedImageTab";
import MainButtonTab from "../components/MainButtonTab";
import TriggerButtonTab from "../components/TriggerButtonTab";
import ContactUsButtonTab from "../components/ContactUsButtonTab";
import SocialShare from "../components/SocialShare";
import ExportTab from "../components/ExportTab";
import LightPreview from "../components/LightPreview";
import { validateEmail, validURL } from '../utils/utils';
import shortLinks from "../services/shortLinks";
import { LAYOUT_NAMES, APP_CONFIG, getInitialData } from "../defines";

class CtaBuilder extends Component {
  constructor(props) {
    super(props);

    this.shortTP = new shortLinks();
    this.shortT = new shortLinks();
    this.shortP = new shortLinks();

    this.eventUpdate = new Event('updateApp');

    this.state = {
      isLayoutChoose: false,
      isMinimal: false,
      isSidebar: true,
      isSocialShare: false,
      isDesign: true,
      layout: null,
      layoutName: LAYOUT_NAMES[0],
      fontsList: [],
      isExportTab: false,
      toolTips: {
        isCallToActionTooltip: true,
        isMainButtonTooltip: true,
        isPreviewTooltip: true,
        isTriggerButtonTooltip: true,
        isExportTooltip: true,
        isTriggerOnlyTooltip: true,
      },
      tabs: {
        isSecondaryTextTab: false,
        isCallToActionTab: false,
        isComplianceTab: false,
        isBackgroundTab: false,
        isLogoTab: false,
        isFeaturedImageTab: false,
        isMainButtonTab: false,
        isTriggerButtonTab: false,
        isContactUsButtonTab: false,
      },
      behavior: {
        displayOnDesktop: true,
        displayOnMobile: true,
        position: "cta-position-br",
        bottom: 32,
        left: 32,
        right: 32,
        autoOpen: false,
        delay: 1000,
      },
      data: {
        isPowered: true,
        folder: window.location.href,
        size: 22,
        color: '#333333',
        font: 'PT Sans',
        reason: '',
        reasonAlign: 'left',
        reasonWeight: '',
        reasonItalic: '',
        secondarySize: 22,
        secondaryFont: 'PT Sans',
        secondaryColor: '#333333',
        secondaryReason: '',
        secondaryReasonAlign: 'left',
        secondaryReasonWeight: '',
        secondaryReasonItalic: '',
        company: '',
        estimated: 1,
        email: '',
        customPrivacy: false,
        terms: '',
        privacy: '',
        complianceFont: 'PT Sans',
        complianceSize: 14,
        complianceColor: '#75849c',
        complianceAlign: 'left',
        complianceWeight: '',
        complianceItalic: '',
        logo: '',
        logoStyle: 'boxed',
        logoAlign: 'left',
        logoMaxWidth: 100,
        hyperlink: '',
        image: 'http://',
        imageWidth: 500,
        imageAlign: 'center',
        imageStyle: 'boxed',
        position: 'cta-boxed',
        colorA: '#75849C',
        stroke: '',
        background: '#FFFFFF',
        corner: 8,
        shadow: '0px 16px 64px rgba(0,0,0,0.08)',
        fontA: 'PT Sans',
        sizeA: 16,
        width: 500,
        closePosition: "cta-close-tr",
        keyword: '',
        phone: '',
        shortTerms: '',
        shortTermsPrivacy: '',
        shortPrivacy: '',

        mainButtonFont: 'PT Sans',
        mainButtonFontColor: '#333333',
        mainButtonFontSize: 16,
        mainButtonAlign: "center",
        mainButtonWeight: '',
        mainButtonItalic: '',
        mainButtonShadow: '0px 0px 0px rgba(0,0,0,0.0)',
        mainButtonCorner: 8,
        mainButtonStroke: "#e0e3e9",
        mainButtonBackground: "transparent",
        mainButtonLabel: "",
        mainButtonType: "cta-label-textonly",
        mainButtonIcon: "",

        triggerButtonFont: 'PT Sans',
        triggerButtonFontColor: '#333333',
        triggerButtonFontSize: 16,
        triggerButtonAlign: "right",
        triggerButtonWeight: '',
        triggerButtonItalic: '',
        triggerButtonShadow: '0px 16px 64px rgba(0,0,0,0.08)',
        triggerButtonCorner: 8,
        triggerButtonStroke: "#e0e3e9",
        triggerButtonBackground: "transparent",
        triggerButtonLabel: "",
        triggerButtonType: "cta-label-textonly",
        triggerButtonIcon: "",

        textUsButtonNumber: '',
        textUsButtonText: '',
        textUsButtonFont: 'PT Sans',
        textUsButtonFontColor: '#333333',
        textUsButtonFontSize: 16,
        textUsButtonAlign: "right",
        textUsButtonWeight: '',
        textUsButtonItalic: '',
        textUsButtonShadow: '0px 16px 64px rgba(0,0,0,0.08)',
        textUsButtonCorner: 8,
        textUsButtonStroke: "#e0e3e9",
        textUsButtonBackground: "transparent",
        textUsButtonLabel: "",
        textUsButtonType: "cta-label-textonly",
        textUsButtonIcon: ""
      }
    };

    this.modal = React.createRef();
  }

  componentDidMount() {
    this.buildFontList();
    this.events();
    this.setTooltips();
    this.onFontchange(this.state.data.font);
    this.navigate();

    setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
    }, 1000)
  }

  navigate = () => {
    let linkFromUrl = window.location.href.split("#");

    switch (linkFromUrl[linkFromUrl.length - 1]) {
      case "image-only":
        this.setState({ layoutName: LAYOUT_NAMES[0] });
        break;
      case "button-flyout":
        this.setState({ layoutName: LAYOUT_NAMES[1] });
        break;
      case "click-to-text":
        this.setState({ layoutName: LAYOUT_NAMES[2] });
        break;
      default:
        setTimeout(() => {
          this.setState({ isLayoutChoose: true });
        }, 2000)
    }
  }

  setTooltip = (tooltip) => {

    const { toolTips } = this.state;

    if (APP_CONFIG.isTooltipsCanHide) {
      localStorage.setItem('cta-builder-' + tooltip, "viewed")

      toolTips[tooltip] = false;
    }

  }

  setTooltips = () => {

    let isCallToActionTooltip = localStorage.getItem('cta-builder-isCallToActionTooltip') == "viewed" ? false : true;
    let isMainButtonTooltip = localStorage.getItem('cta-builder-isMainButtonTooltip') == "viewed" ? false : true;
    let isPreviewTooltip = localStorage.getItem('cta-builder-isPreviewTooltip') == "viewed" ? false : true;
    let isTriggerButtonTooltip = localStorage.getItem('cta-builder-isTriggerButtonTooltip') == "viewed" ? false : true;
    let isExportTooltip = localStorage.getItem('cta-builder-isExportTooltip') == "viewed" ? false : true;
    let isTriggerOnlyTooltip = localStorage.getItem('cta-builder-isTriggerOnlyTooltip') == "viewed" ? false : true;

    this.setState({
      toolTips: {
        isCallToActionTooltip: isCallToActionTooltip,
        isMainButtonTooltip: isMainButtonTooltip,
        isPreviewTooltip: isPreviewTooltip,
        isTriggerButtonTooltip: isTriggerButtonTooltip,
        isExportTooltip: isExportTooltip,
        isTriggerOnlyTooltip: isTriggerOnlyTooltip,
      }
    });

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscape, false);
    window.removeEventListener("resize", () => { }, false);
  }

  events = () => {

    document.addEventListener("keydown", this.onEscape, false);
    window.addEventListener("resize", () => {
      const { isSidebar } = this.state;

      if (window.innerWidth < 991) {
        if (isSidebar) this.setState({ isSidebar: false })
      } else {
        if (!isSidebar) this.setState({ isSidebar: true })
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest('.cta-edittab') == null && e.target.closest('.cta-content-container') == null && e.target.closest('.pcr-app') == null && e.target.closest('.cta-select__menu') == null) {
        this.onCloseTabs();
      }
    });
  }

  onEscape = (e) => {
    if (e.keyCode === 27) {
      this.onCloseTabs();
    }
  }

  onCloseTabs = (instead, calback) => {
    const { tabs } = this.state;
    for (let i in tabs) {
      if (instead) {
        if (instead != i) tabs[i] = false;
      } else {
        tabs[i] = false;
      }
    }
    this.setState({ tabs }, calback);
  }

  buildFontList = () => {

    if (APP_CONFIG.isFullFontsList) {
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          this.parseFonts(xmlHttp.responseText);
      }
      xmlHttp.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAOR6q9DsvkdMf-FiTVeE0MWDAfWCiT91k", true);
      xmlHttp.send(null);
    } else {
      this.setState({ fontsList: APP_CONFIG.fonts });
    }
  }

  addStyle = (url) => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
  }

  onFontchange = (fontName) => {
    this.addStyle("https://fonts.googleapis.com/css?family=" + fontName + ":400,500,700&display=swap");
  }

  parseFonts = (dataFonts) => {
    dataFonts = JSON.parse(dataFonts);
    this.setState({
      ...this, fontsList: dataFonts.items.map((font) => {
        return { value: font.family, label: font.family }
      })
    });
  };

  onLayoutChoose = (layout) => {
    const {data} = this.state;

    switch (LAYOUT_NAMES[layout]) {
      case LAYOUT_NAMES[0]:
          window.history.pushState({},"", data.folder+"#image-only");
        break;
      case LAYOUT_NAMES[1]:
          window.history.pushState({},"", data.folder+"#button-flyout");
        break;
      case LAYOUT_NAMES[2]:
          window.history.pushState({},"", data.folder+"#click-to-text");
        break;
      default:

    }

    this.setState({ layout: layout, layoutName: LAYOUT_NAMES[layout], isLayoutChoose: false, isMinimal: layout == 2 ? true : false }, () => {
      document.dispatchEvent(this.eventUpdate);
    });
  }

  onViewChange = (is) => {
    this.onCloseTabs();
    if (!is) this.setTooltip("isPreviewTooltip");
    this.setState({ isDesign: is });
  }

  onLayoutToggler = () => {
    const { isLayoutChoose } = this.state;
    this.setState({ isLayoutChoose: !isLayoutChoose });
  }

  onLayoutChooseClose = () => {
    this.setState({ isLayoutChoose: false });
  }

  onUpdate = (data) => {
    this.setState({ data }, () => {
      document.dispatchEvent(this.eventUpdate);
    })
  }

  onBehaviorUpdate = (behavior) => {
    this.setState({ behavior });
  }

  onUpdateTabs = (tabs) => {
    if (tabs.isCallToActionTab) this.setTooltip("isCallToActionTooltip");
    if (tabs.isSecondaryTextTab) this.setTooltip("isSecondaryTextTooltip");
    if (tabs.isMainButtonTab) this.setTooltip("isMainButtonTooltip");
    this.setState({ tabs });
  }

  onCloseSidebar = () => {
    this.setState({ isSidebar: false });
  }

  onShowSidebar = () => {
    this.setState({ isSidebar: true });
  }

  onSocialToggle = () => {
    const { isSocialShare } = this.state;
    this.setState({ isSocialShare: !isSocialShare });
  }

  onExportToggle = () => {
    const { isExportTab, data } = this.state;
    if (!isExportTab) this.setTooltip("isExportTooltip");
    this.setState({ isExportTab: !isExportTab }, () => {

      if (!isExportTab) {

        if (data.customPrivacy) {

          if (validURL(data.privacy)) this.shortP.set(data.privacy, (link) => {
            data.shortPrivacy = link;
          });

          if (validURL(data.terms)) this.shortP.set(data.terms, (link) => {
            data.shortTerms = link;
          });

        } else {

          let pdata = this.b64EncodeUnicode(JSON.stringify({ email: data.email, company: data.company }));
          let url = data.folder + "privacy/?d=" + pdata;

          if (validateEmail(data.email) && (data.company.length > 0)) this.shortTP.set(url, (link) => {
            data.shortTermsPrivacy = link;
          });
        }
      }
    });
  }

  b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  onExportTabClose = () => {
    this.setState({ isExportTab: false });
  }

  onSocialShareClose = () => {
    this.setState({ isSocialShare: false });
  }

  clearInputs = () => {
    let textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea)=>{
      textarea.value = '';
    });
    this.setState({ data: getInitialData() });
  }

  render() {
    const {
      isLayoutChoose,
      isDesign,
      layoutName,
      tabs,
      fontsList,
      data,
      isMinimal,
      behavior,
      isSidebar,
      isSocialShare,
      isExportTab,
      toolTips
    } = this.state;

    return (
      <div className="cta-builder">
        <Header
          isDesign={isDesign}
          data={data}
          layoutName={layoutName}
          onExportToggle={this.onExportToggle}
          onSocialToggle={this.onSocialToggle}
          onLayoutToggler={this.onLayoutToggler}
          onViewChange={this.onViewChange}
          toolTips={toolTips}
        />
        <div className="cta-view">
          {/* <Sidebar
            onClose={this.onCloseSidebar}
            onShow={this.onShowSidebar}
            behavior={behavior}
            onUpdate={this.onBehaviorUpdate}
            isMinimal={isMinimal}
            isActive={(layoutName == LAYOUT_NAMES[1] || layoutName == LAYOUT_NAMES[2])}
            isSidebar={isSidebar}
            isDesign={isDesign}
          /> */}
          <Design setTooltip={this.setTooltip} clearInputs={this.clearInputs} isDesign={isDesign} behavior={behavior} toolTips={toolTips} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={isDesign} />
          <Preview onDontShow={() => { }} onRemindLater={() => { }} setTooltip={this.setTooltip} isDesign={isDesign} behavior={behavior} toolTips={toolTips} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={!isDesign} />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isCallToActionTab} content={
            <CallToActionTab
              data={data}
              fontsList={fontsList}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isSecondaryTextTab} content={
            <SecondaryTextTab
              data={data}
              fontsList={fontsList}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isComplianceTab} content={
            <ComplianceTab
              data={data}
              fontsList={fontsList}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isBackgroundTab} content={
            <BackgroundTab
              data={data}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isLogoTab} content={
            <LogoTab
              data={data}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isFeaturedImageTab} content={
            <FeaturedImageTab
              data={data}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isMainButtonTab} content={
            <MainButtonTab
              data={data}
              fontsList={fontsList}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isTriggerButtonTab} content={
            <TriggerButtonTab
              data={data}
              behavior={behavior}
              fontsList={fontsList}
              onUpdateB={this.onBehaviorUpdate}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isContactUsButtonTab} content={
            <ContactUsButtonTab
              data={data}
              behavior={behavior}
              fontsList={fontsList}
              onUpdateB={this.onBehaviorUpdate}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
        </div>
        <Modal isOpen={isLayoutChoose} overlayClose={false} onClose={this.onLayoutChooseClose} type="cta-modal-cm" content={<LayoutChoose onLayoutChoose={this.onLayoutChoose} />} />
        <Modal isOpen={isSocialShare} overlayClose={true} onClose={this.onSocialShareClose} content={<SocialShare />} />
        <Modal isOpen={isExportTab} overlayClose={true} close={true} onClose={this.onExportTabClose} type="cta-modal-tab" content={<ExportTab modal={this.modal} isExportTab={isExportTab} data={data} behavior={behavior} layoutName={layoutName} preview={<LightPreview modal={this.modal} isDesign={isDesign} behavior={behavior} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={!isDesign} />} />} />
      </div>
    );
  }
}

export default CtaBuilder;