import React, { Component } from "react";
import Select from 'react-select';
import Pickr from '@simonwep/pickr';
import { SWATCHES, PICKR_CONFIG } from "../defines";
import Counter from "./Counter";
import ReactTooltip from 'react-tooltip';
import { validateEmail, validURL } from '../utils/utils';

class ComplianceTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'settings',
      isValidEmail:true,
    };

    this.colorPickr = React.createRef();
    this.pickerC = null;
    this.isTypeColor = false;
  }

  componentDidMount() {

    this.initPicker();

  }

  initPicker = () => {
    const { data, onUpdate } = this.props;

    this.pickerC = Pickr.create({
      el: this.colorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.complianceColor,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerC.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerC.setColor(String(color.toHEXA()));
        data.complianceColor = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerC.on('clear', () => {
      data.complianceColor = '';
      onUpdate(data)
    })
  }

  onFontChange = selectedOption => {
    const { onFontchange, onUpdate, data } = this.props;
    data.complianceFont = selectedOption.label;
    onFontchange(selectedOption.label);
    onUpdate(data);
  };

  onChangeColor = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;

    data.complianceColor = e.target.value;
    onUpdate(data);

    e.target.value.length > 0 ? this.pickerC.setColor(e.target.value) : this.pickerC.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onTabChange = (tab) => {
    this.setState({ tab: tab });
  }

  onEstimateUpdate = (value) => {
    const { data, onUpdate } = this.props;
    data.estimated = value;
    onUpdate(data);
  }

  onTermsChange = (e) => {
    const { data, onUpdate } = this.props;
    e.target.value.indexOf("http") == -1 ? data.terms = "http://" + e.target.value : data.terms = e.target.value;
    onUpdate(data)
  }

  onPrivacyChange = (e) => {
    const { data, onUpdate } = this.props;
    e.target.value.indexOf("http") == -1 ? data.privacy = "http://" + e.target.value : data.privacy = e.target.value;
    onUpdate(data)
  }

  updateComplianceEmail = (e) => {
    const { data, onUpdate } = this.props;

    !validateEmail(e.target.value) ? this.setState({isValidEmail:false}) : this.setState({isValidEmail:true});

    data.email = e.target.value;
    onUpdate(data);
  }

  render() {

    const { tab, isValidEmail } = this.state;
    const { fontsList, data, onUpdate } = this.props;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Compliance</h2>
          <div className="cta-links in-tab">
            <div className={`cta-link ${tab == "settings" ? 'active' : ''}`} onClick={() => { this.onTabChange("settings") }}>Settings</div>
            <div className={`cta-link ${tab == "styling" ? 'active' : ''}`} onClick={() => { this.onTabChange("styling") }}>Styling</div>
          </div>
        </div>
        <div className={`cta-tab ${tab == "settings" ? 'active' : ''}`}>
          <div className="cta-group">
            <h2>How often do you plan to text your subscribers?</h2>
            <div className="mb-d d-flex align-center">
              <Counter value={data.estimated} onUpdate={this.onEstimateUpdate} />
              <span className="ml-1 text-basic">times per month</span>
            </div>
          </div>
          <div className="cta-group bb-0">
            <h2>Policies</h2>
            <p className="text-basic mb-d">
              To help you comply with industry regulations, we can generate and host your Terms & Conditions and Privacy Policy pages.
            </p>
            <label className="radiobutton">
              Auto-generated compliance
              <input name="custom-links" type="radio" checked={!data.customPrivacy} onChange={(e)=>{data.customPrivacy = false; onUpdate(data)}}/>
              <span className="checkmark"></span>
            </label>
            <div className={`cta-content-for-radio ${!data.customPrivacy ? 'active' : ''}`}>
              <label>Company name</label>
              <input type="text" value={data.company} onChange={(e) => { data.company = e.target.value; onUpdate(data) }} placeholder="eg: ACME Inc." />
              <label>Compliance email</label>
              <input type="email" className={`${isValidEmail ? '' : 'cta-error-border'}`} value={data.email} onChange={this.updateComplianceEmail} placeholder="john.doe@acme.com" />
            </div>
            <label className="radiobutton">
              Custom compliance links
              <input name="custom-links" type="radio" checked={data.customPrivacy} onChange={(e)=>{data.customPrivacy = true; onUpdate(data)}}/>
              <span className="checkmark"></span>
            </label>
            <div className={`cta-content-for-radio ${data.customPrivacy ? 'active' : ''}`}>
              <label>Terms &amp; Conditions link</label>
              <input type="text" value={data.terms} onChange={this.onTermsChange} placeholder="example.com" />
              <label>Privacy Policy link</label>
              <input type="text" value={data.privacy} onChange={this.onPrivacyChange} className="mb-0" placeholder="example.com" />
            </div>
          </div>
        </div>
        <div className={`cta-tab ${tab == "styling" ? 'active' : ''}`}>
          <div className="cta-group bb-0">
            <label>Font family</label>
            <Select
              value={{ value: data.complianceFont, label: data.complianceFont }}
              onChange={this.onFontChange}
              options={fontsList}
              className={"cta-select"}
              classNamePrefix={"cta-select"}
            />
            <div className="cta-inline">
              <div>
                <label>Color</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.colorPickr}></div>
                  <input type="text" value={data.complianceColor} onChange={this.onChangeColor} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Font size</label>
                <div className="cta-size-input">
                  <input
                    value={data.complianceSize}
                    onChange={(e) => { data.complianceSize = e.target.value; onUpdate(data) }}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="cta-inline btn-icons">
              <div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.complianceAlign == 'left' ? 'active' : ''}`} onClick={() => { data.complianceAlign = "left"; onUpdate(data) }}>
                  <i className="icon-text-left"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align center" className={`cta-btn-icon ${data.complianceAlign == 'center' ? 'active' : ''}`} onClick={() => { data.complianceAlign = "center"; onUpdate(data) }}>
                  <i className="icon-text-center"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.complianceAlign == 'right' ? 'active' : ''}`} onClick={() => { data.complianceAlign = "right"; onUpdate(data) }}>
                  <i className="icon-text-right"></i>
                </div>
              </div>
              <div>
                <div data-tip="Font weight bold" className={`cta-btn-icon ${data.complianceWeight ? 'active' : ''}`} onClick={() => { data.complianceWeight == "bold" ? data.complianceWeight = "" : data.complianceWeight = "bold"; onUpdate(data) }}>
                  <i className="icon-bold"></i>
                </div>
                <div data-tip="Font style italic" className={`cta-btn-icon ${data.complianceItalic ? 'active' : ''}`} onClick={() => { data.complianceItalic == "italic" ? data.complianceItalic = "" : data.complianceItalic = "italic"; onUpdate(data) }}>
                  <i className="icon-italic"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComplianceTab;