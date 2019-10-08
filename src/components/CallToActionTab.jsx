import React, { Component } from "react";
import Select from 'react-select';
import Pickr from '@simonwep/pickr';
import { SWATCHES, PICKR_CONFIG } from "../defines";
import ReactTooltip from 'react-tooltip'

class CallToActionTab extends Component {
  constructor(props) {
    super(props);

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
      default: data.color,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerC.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerC.setColor(String(color.toHEXA()));
        data.color = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerC.on('clear', () => {
      data.color = '';
      onUpdate(data)
    })
  }

  onFontChange = selectedOption => {
    const { onFontchange, onUpdate, data } = this.props;
    data.font = selectedOption.label;
    onFontchange(selectedOption.label);
    onUpdate(data);
  };

  onChangeColor = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;

    data.color = e.target.value;
    onUpdate(data);

    e.target.value.length > 0 ? this.pickerC.setColor(e.target.value) : this.pickerC.setColor(null)

    setTimeout(() => {
      this.isTypeColor = false;
    }, 500)
  }



  render() {

    const { fontsList, data, onUpdate } = this.props;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Call-to-action text</h2>
        </div>
        <div className="cta-tab active">
          <div className="cta-group bb-0">
            <textarea
              rows="3"
              defaultValue={data.reason}
              onChange={(e) => { data.reason = e.target.value; onUpdate(data) }}
              placeholder="eg: receive our special pizza deals every Tuesday">
            </textarea>
            <label>Font family</label>
            <Select
              value={{ value: data.font, label: data.font }}
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
                  <input type="text" value={data.color} onChange={this.onChangeColor} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Font size</label>
                <div className="cta-size-input">
                  <input
                    value={data.size}
                    onChange={(e) => { data.size = e.target.value; onUpdate(data) }}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="cta-inline btn-icons">
              <div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.reasonAlign == 'left' ? 'active' : ''}`} onClick={() => { data.reasonAlign = "left"; onUpdate(data) }}>
                  <i className="icon-text-left"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align center" className={`cta-btn-icon ${data.reasonAlign == 'center' ? 'active' : ''}`} onClick={() => { data.reasonAlign = "center"; onUpdate(data) }}>
                  <i className="icon-text-center"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.reasonAlign == 'right' ? 'active' : ''}`} onClick={() => { data.reasonAlign = "right"; onUpdate(data) }}>
                  <i className="icon-text-right"></i>
                </div>
              </div>
              <div>
                <div data-tip="Font weight bold" className={`cta-btn-icon ${data.reasonWeight == "bold" ? 'active' : ''}`} onClick={() => { data.reasonWeight == "bold" ? data.reasonWeight = '' : data.reasonWeight = "bold"; onUpdate(data) }}>
                  <i className="icon-bold"></i>
                </div>
                <div data-tip="Font style italic" className={`cta-btn-icon ${data.reasonItalic == "italic" ? 'active' : ''}`} onClick={() => {data.reasonItalic == "italic" ? data.reasonItalic = '' : data.reasonItalic = "italic"; onUpdate(data) }}>
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

export default CallToActionTab;