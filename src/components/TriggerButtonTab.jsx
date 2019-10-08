import React, { Component } from "react";
import Select from 'react-select';
import Pickr from '@simonwep/pickr';
import { SWATCHES, PICKR_CONFIG, BUTTONS_TYPES } from "../defines";
import ShadowList from "./ShadowList";
import IconsSelect from "./IconsSelect";
import { customSingleValue, customOptionValue } from "./UiComponents";
import ReactTooltip from 'react-tooltip';

class TriggerButtonTab extends Component {
  constructor(props) {
    super(props);

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
      default: data.triggerButtonFontColor,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerC.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerC.setColor(String(color.toHEXA()));
        data.triggerButtonFontColor = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerC.on('clear', () => {
      data.triggerButtonFontColor = '';
      onUpdate(data)
    })

    this.pickerBG = Pickr.create({
      el: this.bgColorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.triggerButtonBackground,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerBG.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerBG.setColor(String(color.toHEXA()));
        data.triggerButtonBackground = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerBG.on('clear', () => {
      data.triggerButtonBackground = '';
      onUpdate(data)
    })

    this.pickerSTR = Pickr.create({
      el: this.strColorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.triggerButtonStroke,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerSTR.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerSTR.setColor(String(color.toHEXA()));
        data.triggerButtonStroke = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerSTR.on('clear', () => {
      data.triggerButtonStroke = '';
      onUpdate(data)
    })
  }

  onChangeBG = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;
    data.triggerButtonBackground = e.target.value;
    onUpdate(data);
    e.target.value.length > 0 ? this.pickerBG.setColor(e.target.value) : this.pickerBG.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onChangeStroke = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;
    data.triggerButtonStroke = e.target.value;
    onUpdate(data);
    e.target.value.length > 0 ? this.pickerSTR.setColor(e.target.value) : this.pickerSTR.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onFontChange = selectedOption => {
    const { onFontchange, onUpdate, data } = this.props;
    data.triggerButtonFont = selectedOption.label;
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

  onShadowUpdate = (value) => {
    const { data, onUpdate } = this.props;
    data.triggerButtonShadow = value;
    onUpdate(data);
  }

  getTypeValue = () => {
    const { data } = this.props;
    let pos = {};
    BUTTONS_TYPES.forEach((position) => {
      if (data.triggerButtonType == position.value) pos = position
    })

    return pos;
  }

  onTypeChange = (e) => {
    const { data, onUpdate } = this.props;
    data.triggerButtonType = e.value;
    onUpdate(data);
  }

  onIconChoose = (value) => {
    const { data, onUpdate } = this.props;
    data.triggerButtonIcon = value;

    onUpdate(data);
  }

  render() {

    const { fontsList, data, onUpdate } = this.props;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Trigger button</h2>
        </div>
        <div className="cta-tab active">
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
                  <IconsSelect value={data.triggerButtonIcon} onUpdate={this.onIconChoose} />
                </div>
              </div>
              <div>
                <label>Label</label>
                <input type="text" value={data.triggerButtonLabel} onChange={(e) => { data.triggerButtonLabel = e.target.value; onUpdate(data) }} placeholder="Text inside the button" />
              </div>
            </div>
          </div>
          <div className="cta-group">
            <h2>Button background</h2>
            <div className="cta-inline">
              <div>
                <label>Background</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.bgColorPickr}></div>
                  <input type="text" value={data.triggerButtonBackground} onChange={this.onChangeBG} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Stroke color</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.strColorPickr}></div>
                  <input type="text" value={data.triggerButtonStroke} onChange={this.onChangeStroke} placeholder="None" />
                </div>
              </div>
            </div>
            <div className="cta-inline">
              <div>
                <label>Corner roudness</label>
                <div className="cta-size-input"><input id="corner" type="number" value={data.triggerButtonCorner} onChange={(e) => { data.triggerButtonCorner = e.target.value; onUpdate(data) }} placeholder="eq: 4" /></div>
              </div>
              <div>
                <label>Shadow</label>
                <ShadowList onUpdate={this.onShadowUpdate} value={data.triggerButtonShadow} />
              </div>
            </div>
          </div>
          <div className="cta-group bb-0">
            <h2>Label style</h2>
            <label>Font family</label>
            <Select
              value={{ value: data.triggerButtonFont, label: data.triggerButtonFont }}
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
                  <input type="text" value={data.triggerButtonFontColor} onChange={this.onChangeColor} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Font size</label>
                <div className="cta-size-input">
                  <input
                    value={data.triggerButtonFontSize}
                    onChange={(e) => { data.triggerButtonFontSize = e.target.value; onUpdate(data) }}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="cta-inline btn-icons">
              <div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.triggerButtonAlign == 'left' ? 'active' : ''}`} onClick={() => { data.triggerButtonAlign = "left"; onUpdate(data) }}>
                  <i className="icon-text-left"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align center" className={`cta-btn-icon ${data.triggerButtonAlign == 'center' ? 'active' : ''}`} onClick={() => { data.triggerButtonAlign = "center"; onUpdate(data) }}>
                  <i className="icon-text-center"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.triggerButtonAlign == 'right' ? 'active' : ''}`} onClick={() => { data.triggerButtonAlign = "right"; onUpdate(data) }}>
                  <i className="icon-text-right"></i>
                </div>
              </div>
              <div>
                <div data-tip="Font weight bold" className={`cta-btn-icon ${data.triggerButtonWeight ? 'active' : ''}`} onClick={() => {data.triggerButtonWeight == "bold" ? data.triggerButtonWeight = "" : data.triggerButtonWeight = "bold"; onUpdate(data) }}>
                  <i className="icon-bold"></i>
                </div>
                <div data-tip="Font style italic" className={`cta-btn-icon ${data.triggerButtonItalic ? 'active' : ''}`} onClick={() => {data.triggerButtonItalic == "italic" ? data.triggerButtonItalic = "" : data.triggerButtonItalic = "italic"; onUpdate(data) }}>
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

export default TriggerButtonTab;