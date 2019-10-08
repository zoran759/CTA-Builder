import React, { Component } from "react";
import Select from 'react-select';
import Pickr from '@simonwep/pickr';
import { SWATCHES, PICKR_CONFIG, BUTTONS_TYPES } from "../defines";
import ShadowList from "./ShadowList";
import IconsSelect from "./IconsSelect";
import { customSingleValue, customOptionValue } from "./UiComponents";
import ReactTooltip from 'react-tooltip';

class MainButtonTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'setup'
    };

    this.colorPickr = React.createRef();
    this.pickerC = null;
    this.isTypeColor = false;

    this.bgColorPickr = React.createRef();
    this.strColorPickr = React.createRef();

    this.pickerBG = null;
    this.pickerSTR = null;
  }

  componentDidMount() {

    this.initPicker();

  }

  initPicker = () => {
    const { data, onUpdate } = this.props;

    this.pickerC = Pickr.create({
      el: this.colorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.mainButtonFontColor,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerC.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerC.setColor(String(color.toHEXA()));
        data.mainButtonFontColor = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerC.on('clear', () => {
      data.mainButtonFontColor = '';
      onUpdate(data)
    })

    this.pickerBG = Pickr.create({
      el: this.bgColorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.mainButtonBackground,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerBG.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerBG.setColor(String(color.toHEXA()));
        data.mainButtonBackground = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerBG.on('clear', () => {
      data.mainButtonBackground = '';
      onUpdate(data)
    })

    this.pickerSTR = Pickr.create({
      el: this.strColorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.mainButtonStroke,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerSTR.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerSTR.setColor(String(color.toHEXA()));
        data.mainButtonStroke = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerSTR.on('clear', () => {
      data.mainButtonStroke = '';
      onUpdate(data)
    })
  }

  onChangeBG = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;
    data.mainButtonBackground = e.target.value;
    onUpdate(data);
    e.target.value.length > 0 ? this.pickerBG.setColor(e.target.value) : this.pickerBG.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onChangeStroke = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;
    data.mainButtonStroke = e.target.value;
    onUpdate(data);
    e.target.value.length > 0 ? this.pickerSTR.setColor(e.target.value) : this.pickerSTR.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onFontChange = selectedOption => {
    const { onFontchange, onUpdate, data } = this.props;
    data.mainButtonFont = selectedOption.label;
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

  onShadowUpdate = (value) => {
    const { data, onUpdate } = this.props;
    data.mainButtonShadow = value;
    onUpdate(data);
  }

  getTypeValue = () => {
    const { data } = this.props;
    let pos = {};
    BUTTONS_TYPES.forEach((position) => {
      if (data.mainButtonType == position.value) pos = position
    })

    return pos;
  }

  onTypeChange = (e) => {
    const { data, onUpdate } = this.props;
    data.mainButtonType = e.value;
    onUpdate(data);
  }

  onIconChoose = (value) => {
    console.log(value);
    const { data, onUpdate } = this.props;
    data.mainButtonIcon = value;

    onUpdate(data);
  }

  render() {

    const { tab } = this.state;
    const { fontsList, data, onUpdate } = this.props;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Main button</h2>
          <div className="cta-links in-tab">
            <div className={`cta-link ${tab == "setup" ? 'active' : ''}`} onClick={() => { this.onTabChange("setup") }}>Setup</div>
            <div className={`cta-link ${tab == "styling" ? 'active' : ''}`} onClick={() => { this.onTabChange("styling") }}>Styling</div>
          </div>
        </div>
        <div className={`cta-tab ${tab == "setup" ? 'active' : ''}`}>
          <div className="cta-group bb-0">
            <label>Number to send text</label>
            <input type="text" value={data.phone} onChange={(e) => { data.phone = e.target.value; onUpdate(data) }} placeholder="eg: 555888" />
            <label>Prefilled text</label>
            <textarea
              rows="3"
              defaultValue={data.keyword}
              onChange={(e) => { data.keyword = e.target.value; onUpdate(data) }}
              placeholder="Keyword or default message...">
            </textarea>
          </div>
        </div>
        <div className={`cta-tab ${tab == "styling" ? 'active' : ''}`}>
          <div className="cta-group">
            <label>Type</label>
            <Select
              value={this.getTypeValue()}
              onChange={this.onTypeChange}
              options={BUTTONS_TYPES}
              className={"cta-select"}
              classNamePrefix={"cta-select"}
              components={{ SingleValue: customSingleValue, Option: customOptionValue }}
            />
            <div className="cta-inline for-icon-input">
              <div>
                <div className="cta-icon-input">
                  <label>Icon</label>
                  <IconsSelect value={data.mainButtonIcon} onUpdate={this.onIconChoose} />
                </div>
              </div>
              <div>
                <label>Label</label>
                <input type="text" value={data.mainButtonLabel} onChange={(e) => { data.mainButtonLabel = e.target.value; onUpdate(data) }} placeholder="Text inside the button" />
              </div>
            </div>
          </div>
          <div className="cta-group">
            <div className="cta-inline">
              <div>
                <label>Background</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.bgColorPickr}></div>
                  <input type="text" value={data.mainButtonBackground} onChange={this.onChangeBG} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Stroke color</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.strColorPickr}></div>
                  <input type="text" value={data.mainButtonStroke} onChange={this.onChangeStroke} placeholder="None" />
                </div>
              </div>
            </div>
            <div className="cta-inline">
              <div>
                <label>Corner roudness</label>
                <div className="cta-size-input"><input id="corner" type="number" value={data.mainButtonCorner} onChange={(e) => { data.mainButtonCorner = e.target.value; onUpdate(data) }} placeholder="eq: 4" /></div>
              </div>
              <div>
                <label>Shadow</label>
                <ShadowList onUpdate={this.onShadowUpdate} value={data.mainButtonShadow} />
              </div>
            </div>
          </div>
          <div className="cta-group bb-0">
            <label>Font family</label>
            <Select
              value={{ value: data.mainButtonFont, label: data.mainButtonFont }}
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
                  <input type="text" value={data.mainButtonFontColor} onChange={this.onChangeColor} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Font size</label>
                <div className="cta-size-input">
                  <input
                    value={data.mainButtonFontSize}
                    onChange={(e) => { data.mainButtonFontSize = e.target.value; onUpdate(data) }}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="cta-inline btn-icons">
              <div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.mainButtonAlign == 'left' ? 'active' : ''}`} onClick={() => { data.mainButtonAlign = "left"; onUpdate(data) }}>
                  <i className="icon-text-left"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align center" className={`cta-btn-icon ${data.mainButtonAlign == 'center' ? 'active' : ''}`} onClick={() => { data.mainButtonAlign = "center"; onUpdate(data) }}>
                  <i className="icon-text-center"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.mainButtonAlign == 'right' ? 'active' : ''}`} onClick={() => { data.mainButtonAlign = "right"; onUpdate(data) }}>
                  <i className="icon-text-right"></i>
                </div>
              </div>
              <div>
                <div data-tip="Font weight bold" className={`cta-btn-icon ${data.mainButtonWeight ? 'active' : ''}`} onClick={() => { data.mainButtonWeight == "bold" ? data.mainButtonWeight = "" : data.mainButtonWeight = "bold"; onUpdate(data) }}>
                  <i className="icon-bold"></i>
                </div>
                <div data-tip="Font style italic" className={`cta-btn-icon ${data.mainButtonItalic ? 'active' : ''}`} onClick={() => { data.mainButtonItalic == "italic" ? data.mainButtonItalic = "" : data.mainButtonItalic = "italic"; onUpdate(data) }}>
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

export default MainButtonTab;