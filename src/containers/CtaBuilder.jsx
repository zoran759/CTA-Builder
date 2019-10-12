import React, { Component } from "react";
import Modal from "../components/Modal";
import LayoutChoose from "../components/LayoutChoose";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditTab from "../components/EditTab";
import Preview from "../components/Preview";
import Design from "../components/Design";
import CallToActionTab from "../components/CallToActionTab";
import ComplianceTab from "../components/ComplianceTab";
import BackgroundTab from "../components/BackgroundTab";
import LogoTab from "../components/LogoTab";
import FeaturedImageTab from "../components/FeaturedImageTab";
import MainButtonTab from "../components/MainButtonTab";
import TriggerButtonTab from "../components/TriggerButtonTab";
import SocialShare from "../components/SocialShare";
import ExportTab from "../components/ExportTab";
import LightPreview from "../components/LightPreview";
import { LAYOUT_NAMES } from "../defines";

class CtaBuilder extends Component {
  constructor(props) {
    super(props);

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
      tabs: {
        isCallToActionTab: false,
        isComplianceTab: false,
        isBackgroundTab: false,
        isLogoTab: false,
        isFeaturedImageTab: false,
        isMainButtonTab: false,
        isTriggerButtonTab: false,
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
        folder: window.location.href,
        reason: '',
        reasonAlign: 'left',
        reasonWeight: '',
        reasonItalic: '',
        company: '',
        estimated: 1,
        email: '',
        customPrivacy: false,
        terms: '',
        privacy: '',
        complianceFont: 'Raleway',
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
        image: '',
        imageWidth: '',
        imageAlign: 'center',
        imageStyle: 'boxed',
        position: 'cta-boxed',
        color: '#333333',
        colorA: '#75849C',
        stroke: '',
        background: '#FFFFFF',
        corner: 8,
        shadow: '0px 16px 64px rgba(0,0,0,0.08)',
        font: 'Raleway',
        size: 22,
        fontA: 'Raleway',
        sizeA: 16,
        width: 500,
        closePosition: "cta-close-tr",
        keyword: '',
        phone: '',

        mainButtonFont: 'Raleway',
        mainButtonFontColor: '#333333',
        mainButtonFontSize: 16,
        mainButtonAlign: "center",
        mainButtonWeight: '',
        mainButtonItalic: '',
        mainButtonShadow: '0px 16px 64px rgba(0,0,0,0.08)',
        mainButtonCorner: 8,
        mainButtonStroke: "#e0e3e9",
        mainButtonBackground: "#FFFFFF",
        mainButtonLabel: "",
        mainButtonType: "cta-label-textonly",
        mainButtonIcon: "",

        triggerButtonFont: 'Raleway',
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
        triggerButtonIcon: ""
      }
    };

    this.modal = React.createRef();
  }

  componentDidMount() {
    this.buildFontList();
    this.events();

    

    setTimeout(() => {
      document.querySelector("#loader").style.display = "none";
    }, 1000)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscape, false);
    window.removeEventListener("resize", ()=>{}, false);
  }

  events = () => {

    document.addEventListener("keydown", this.onEscape, false);
    window.addEventListener("resize", ()=>{
      const {isSidebar} = this.state;

      if(window.innerWidth < 991) {
        if(isSidebar) this.setState({ isSidebar: false })
      }else{
        if(!isSidebar) this.setState({ isSidebar: true })
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

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        this.parseFonts(xmlHttp.responseText);
    }
    xmlHttp.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAOR6q9DsvkdMf-FiTVeE0MWDAfWCiT91k", true);
    xmlHttp.send(null);
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

    this.setState({ layout: layout, layoutName: LAYOUT_NAMES[layout], isLayoutChoose: false, isMinimal: layout == 2 ? true : false });
  }

  onViewChange = (is) => {
    this.onCloseTabs();
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
    this.setState({ data });
  }

  onBehaviorUpdate = (behavior) => {
    this.setState({ behavior });
  }

  onUpdateTabs = (tabs) => {
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
    const { isExportTab } = this.state;
    this.setState({ isExportTab: !isExportTab });
  }

  onExportTabClose = () => {
    this.setState({ isExportTab: false });
  }

  onSocialShareClose = () => {
    this.setState({ isSocialShare: false });
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
      isExportTab
    } = this.state;

    return (
      <div className="cta-builder">
        <Header isDesign={isDesign} layoutName={layoutName} onExportToggle={this.onExportToggle} onSocialToggle={this.onSocialToggle} onLayoutToggler={this.onLayoutToggler} onViewChange={this.onViewChange} />
        <div className="cta-view">
          <Sidebar
            onClose={this.onCloseSidebar}
            onShow={this.onShowSidebar}
            behavior={behavior}
            onUpdate={this.onBehaviorUpdate}
            isMinimal={isMinimal}
            isActive={(layoutName == LAYOUT_NAMES[1] || layoutName == LAYOUT_NAMES[2])}
            isSidebar={isSidebar}
            isDesign={isDesign}
          />
          <Design behavior={behavior} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={isDesign} />
          <Preview isDesign={isDesign} behavior={behavior} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={!isDesign} />
          <EditTab onClose={this.onCloseTabs} isActive={tabs.isCallToActionTab} content={
            <CallToActionTab
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
              fontsList={fontsList}
              onFontchange={this.onFontchange}
              onUpdate={this.onUpdate} />
          } />
        </div>
        <Modal isOpen={isLayoutChoose} overlayClose={true} onClose={this.onLayoutChooseClose} type="cta-modal-cm" content={<LayoutChoose onLayoutChoose={this.onLayoutChoose} />} />
        <Modal isOpen={isSocialShare} overlayClose={true} onClose={this.onSocialShareClose} content={<SocialShare />} />
        <Modal isOpen={isExportTab} overlayClose={true} close={true} onClose={this.onExportTabClose} type="cta-modal-tab" content={<ExportTab modal={this.modal} isExportTab={isExportTab} data={data} behavior={behavior} layoutName={layoutName} preview={<LightPreview modal={this.modal} isDesign={isDesign} behavior={behavior} layoutName={layoutName} tabs={tabs} onUpdateTabs={this.onUpdateTabs} data={data} isActive={!isDesign} />} />} />
      </div>
    );
  }
}

export default CtaBuilder;