import React, { Component } from "react";
import Select from 'react-select';
import Pickr from '@simonwep/pickr';
import { SWATCHES, PICKR_CONFIG, BUTTONS_TYPES, BEHAVIOR_POSITIONS } from "../defines";
import ShadowList from "./ShadowList";
import IconsSelect from "./IconsSelect";
import { customSingleValue, customOptionValue } from "./UiComponents";
import ReactTooltip from 'react-tooltip';

class ContactUsButtonTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'settings'
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
      default: data.textUsButtonFontColor,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerC.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerC.setColor(String(color.toHEXA()));
        data.textUsButtonFontColor = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerC.on('clear', () => {
      data.textUsButtonFontColor = '';
      onUpdate(data)
    })

    this.pickerBG = Pickr.create({
      el: this.bgColorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.textUsButtonBackground,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerBG.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerBG.setColor(String(color.toHEXA()));
        data.textUsButtonBackground = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerBG.on('clear', () => {
      data.textUsButtonBackground = '';
      onUpdate(data)
    })

    this.pickerSTR = Pickr.create({
      el: this.strColorPickr.current,
      theme: PICKR_CONFIG.THEME,
      default: data.textUsButtonStroke,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerSTR.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerSTR.setColor(String(color.toHEXA()));
        data.textUsButtonStroke = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerSTR.on('clear', () => {
      data.textUsButtonStroke = '';
      onUpdate(data)
    })
  }

  onChangeBG = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;
    data.textUsButtonBackground = e.target.value;
    onUpdate(data);
    e.target.value.length > 0 ? this.pickerBG.setColor(e.target.value) : this.pickerBG.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onChangeStroke = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;
    data.textUsButtonStroke = e.target.value;
    onUpdate(data);
    e.target.value.length > 0 ? this.pickerSTR.setColor(e.target.value) : this.pickerSTR.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }

  onFontChange = selectedOption => {
    const { onFontchange, onUpdate, data } = this.props;
    data.textUsButtonFont = selectedOption.label;
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
    data.textUsButtonShadow = value;
    onUpdate(data);
  }

  getTypeValue = () => {
    const { data } = this.props;
    let pos = {};
    BUTTONS_TYPES.forEach((position) => {
      if (data.textUsButtonType == position.value) pos = position
    })

    return pos;
  }

  onTabChange = (tab) => {
    this.setState({ tab: tab });
  }

  onTypeChange = (e) => {
    const { data, onUpdate } = this.props;
    data.textUsButtonType = e.value;
    onUpdate(data);
  }

  onIconChoose = (value) => {
    const { data, onUpdate } = this.props;
    data.textUsButtonIcon = value;

    onUpdate(data);
  }

  getPositionValue = () => {
    const { behavior } = this.props;
    let pos = {};
    BEHAVIOR_POSITIONS.forEach((position) => {
      if (behavior.position == position.value) pos = position
    })

    return pos;
  }

  render() {

    const { fontsList, data, onUpdate, behavior, onUpdateB } = this.props;
    const { tab } = this.state;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Click-to-text button</h2>
          <div className="cta-links in-tab">
            <div className={`cta-link ${tab == "settings" ? 'active' : ''}`} onClick={() => { this.onTabChange("settings") }}>Settings</div>
            <div className={`cta-link ${tab == "styling" ? 'active' : ''}`} onClick={() => { this.onTabChange("styling") }}>Styling</div>
          </div>
        </div>
        <div className={`cta-tab ${tab == "settings" ? 'active' : ''}`}>
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
                  <IconsSelect value={data.textUsButtonIcon} onUpdate={this.onIconChoose} />
                </div>
              </div>
              <div>
                <label>Label</label>
                <input type="text" value={data.textUsButtonLabel} onChange={(e) => { data.textUsButtonLabel = e.target.value; onUpdate(data) }} placeholder="Text inside the button" />
              </div>
            </div>
          </div>
          <div className="cta-group bb-0">
            <div>
              <label>Number to send text</label>
              <input type="text" value={data.textUsButtonNumber} onChange={(e) => { data.textUsButtonNumber = e.target.value; onUpdate(data) }} placeholder="eg: 555888" />
              <label>Prefilled text</label>
              <textarea
                rows="5"
                defaultValue={data.textUsButtonText}
                onChange={(e) => { data.textUsButtonText = e.target.value; onUpdate(data) }}
                placeholder="Keyword or default message...">
              </textarea>
              <label>Position</label>
              <Select
                value={this.getPositionValue()}
                onChange={(value) => { behavior.position = value.value; onUpdateB(behavior) }}
                options={BEHAVIOR_POSITIONS}
                className={"cta-select inline-transparent ml-input"}
                classNamePrefix={"cta-select"}
              />
              <label>Margins</label>
              <div className={`cta-inline-label ${behavior.position == BEHAVIOR_POSITIONS[1].value ? "mb-d" : ''}`}>
                <span>bottom</span>
                <div className="cta-size-input"><input type="number" value={behavior.bottom} onChange={(e) => { behavior.bottom = e.target.value; onUpdateB(behavior) }} placeholder="" /></div>
              </div>
              <div className={`cta-inline-label ${behavior.position != BEHAVIOR_POSITIONS[2].value ? "d-none" : 'mb-d'}`}>
                <span>left</span>
                <div className="cta-size-input"><input type="number" value={behavior.left} onChange={(e) => { behavior.left = e.target.value; onUpdateB(behavior) }} placeholder="" /></div>
              </div>
              <div className={`cta-inline-label mb-d ${behavior.position != BEHAVIOR_POSITIONS[0].value ? "d-none" : ''}`}>
                <span>right</span>
                <div className="cta-size-input"><input type="number" value={behavior.right} onChange={(e) => { behavior.right = e.target.value; onUpdateB(behavior) }} placeholder="" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`cta-tab ${tab == "styling" ? 'active' : ''}`}>
          <div className="cta-group">
            <h2>Button background</h2>
            <div className="cta-inline">
              <div>
                <label>Background</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.bgColorPickr}></div>
                  <input type="text" value={data.textUsButtonBackground} onChange={this.onChangeBG} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Stroke color</label>
                <div className="cta-color-input">
                  <div className="color-picker" ref={this.strColorPickr}></div>
                  <input type="text" value={data.textUsButtonStroke} onChange={this.onChangeStroke} placeholder="None" />
                </div>
              </div>
            </div>
            <div className="cta-inline">
              <div>
                <label>Corner roudness</label>
                <div className="cta-size-input"><input id="corner" type="number" value={data.textUsButtonCorner} onChange={(e) => { data.textUsButtonCorner = e.target.value; onUpdate(data) }} placeholder="eq: 4" /></div>
              </div>
              <div>
                <label>Shadow</label>
                <ShadowList onUpdate={this.onShadowUpdate} value={data.textUsButtonShadow} />
              </div>
            </div>
          </div>
          <div className="cta-group bb-0">
            <h2>Label style</h2>
            <label>Font family</label>
            <Select
              value={{ value: data.textUsButtonFont, label: data.textUsButtonFont }}
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
                  <input type="text" value={data.textUsButtonFontColor} onChange={this.onChangeColor} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Font size</label>
                <div className="cta-size-input">
                  <input
                    value={data.textUsButtonFontSize}
                    onChange={(e) => { data.textUsButtonFontSize = e.target.value; onUpdate(data) }}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="cta-inline btn-icons">
              <div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.textUsButtonAlign == 'left' ? 'active' : ''}`} onClick={() => { data.textUsButtonAlign = "left"; onUpdate(data) }}>
                  <i className="icon-text-left"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align center" className={`cta-btn-icon ${data.textUsButtonAlign == 'center' ? 'active' : ''}`} onClick={() => { data.textUsButtonAlign = "center"; onUpdate(data) }}>
                  <i className="icon-text-center"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.textUsButtonAlign == 'right' ? 'active' : ''}`} onClick={() => { data.textUsButtonAlign = "right"; onUpdate(data) }}>
                  <i className="icon-text-right"></i>
                </div>
              </div>
              <div>
                <div data-tip="Font weight bold" className={`cta-btn-icon ${data.textUsButtonWeight ? 'active' : ''}`} onClick={() => { data.textUsButtonWeight == "bold" ? data.textUsButtonWeight = "" : data.textUsButtonWeight = "bold"; onUpdate(data) }}>
                  <i className="icon-bold"></i>
                </div>
                <div data-tip="Font style italic" className={`cta-btn-icon ${data.textUsButtonItalic ? 'active' : ''}`} onClick={() => { data.textUsButtonItalic == "italic" ? data.textUsButtonItalic = "" : data.textUsButtonItalic = "italic"; onUpdate(data) }}>
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

export default ContactUsButtonTab;