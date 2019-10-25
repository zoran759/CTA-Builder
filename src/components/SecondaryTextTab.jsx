import React, { Component } from "react";
import Select from 'react-select';
import Pickr from '@simonwep/pickr';
import { SWATCHES, PICKR_CONFIG } from "../defines";
import ReactTooltip from 'react-tooltip'

class SecondaryTextTab extends Component {
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
      default: data.secondaryColor,
      swatches: SWATCHES,
      components: PICKR_CONFIG.COMPONENTS,
      strings: PICKR_CONFIG.SAVE
    });

    this.pickerC.on('change', (color) => {
      if (!this.isTypeColor) {
        this.pickerC.setColor(String(color.toHEXA()));
        data.secondaryColor = "#" + color.toHEXA().join('');
        onUpdate(data)
      }
    })

    this.pickerC.on('clear', () => {
      data.secondaryColor = '';
      onUpdate(data)
    })
  }

  onFontChange = selectedOption => {
    const { onFontchange, onUpdate, data } = this.props;
    data.secondaryFont = selectedOption.label;
    onFontchange(selectedOption.label);
    onUpdate(data);
  };

  onChangeColor = (e) => {
    const { data, onUpdate } = this.props;

    this.isTypeColor = true;

    data.secondaryColor = e.target.value;
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
          <h2>Secondary Text</h2>
        </div>
        <div className="cta-tab active">
          <div className="cta-group bb-0">
            <textarea
              rows="5"
              defaultValue={data.secondaryReason}
              onChange={(e) => { data.secondaryReason = e.target.value; onUpdate(data) }}
              placeholder="Are there any other details your subscribers should know about? E.g. We’ll also send you a special pizza deal every Tuesday.">
            </textarea>
            <label>Font family</label>
            <Select
              value={{ value: data.secondaryFont, label: data.secondaryFont }}
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
                  <input type="text" value={data.secondaryColor} onChange={this.onChangeColor} placeholder="None" />
                </div>
              </div>
              <div>
                <label>Font size</label>
                <div className="cta-size-input">
                  <input
                    value={data.secondarySize}
                    onChange={(e) => { data.secondarySize = e.target.value; onUpdate(data) }}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="cta-inline btn-icons">
              <div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.secondaryReasonAlign == 'left' ? 'active' : ''}`} onClick={() => { data.secondaryReasonAlign = "left"; onUpdate(data) }}>
                  <i className="icon-text-left"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align center" className={`cta-btn-icon ${data.secondaryReasonAlign == 'center' ? 'active' : ''}`} onClick={() => { data.secondaryReasonAlign = "center"; onUpdate(data) }}>
                  <i className="icon-text-center"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.secondaryReasonAlign == 'right' ? 'active' : ''}`} onClick={() => { data.secondaryReasonAlign = "right"; onUpdate(data) }}>
                  <i className="icon-text-right"></i>
                </div>
              </div>
              <div>
                <div data-tip="Font weight bold" className={`cta-btn-icon ${data.secondaryReasonWeight == "bold" ? 'active' : ''}`} onClick={() => { data.secondaryReasonWeight == "bold" ? data.secondaryReasonWeight = '' : data.secondaryReasonWeight = "bold"; onUpdate(data) }}>
                  <i className="icon-bold"></i>
                </div>
                <div data-tip="Font style italic" className={`cta-btn-icon ${data.secondaryReasonItalic == "italic" ? 'active' : ''}`} onClick={() => {data.secondaryReasonItalic == "italic" ? data.secondaryReasonItalic = '' : data.secondaryReasonItalic = "italic"; onUpdate(data) }}>
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

export default SecondaryTextTab;