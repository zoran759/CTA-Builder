import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';

class LogoTab extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  onLogoChange = (e) => {
    const { data, onUpdate } = this.props;
    e.target.value.indexOf("http") == -1 ? data.logo = "http://" + e.target.value : data.logo = e.target.value;
    onUpdate(data)
  }

  onHyperlinkChange = (e) => {
    const { data, onUpdate } = this.props;
    e.target.value.indexOf("http") == -1 ? data.hyperlink = "http://" + e.target.value : data.hyperlink = e.target.value;
    onUpdate(data)
  }

  render() {

    const { data, onUpdate } = this.props;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Logo</h2>
        </div>
        <div className="cta-tab active">
          <div className="cta-group bb-0">
            <div className="cta-info"><i className="icon-info-outline"></i><span>Currently we don’t support image upload. Instead, insert the link to your image below.</span></div>
            <label>Link to logo image file</label>
            <input
              value={data.logo}
              onChange={this.onLogoChange}
              type="text"
              placeholder="example.com"
            />
            <label>Link on clicking the logo</label>
            <input
              value={data.hyperlink}
              onChange={this.onHyperlinkChange}
              type="text"
              placeholder="example.com"
            />
            <div className="btn-icons mb-d">
              <label>Align</label>
              <div className="w-100">
                <div data-tip="Align full width" className={`cta-btn-icon ${data.logoStyle == 'full-width' ? 'active' : ''}`} onClick={() => { data.logoStyle = "full-width"; onUpdate(data) }}>
                  <i className="icon-full-width"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align boxed" className={`cta-btn-icon ${data.logoStyle == 'boxed' ? 'active' : ''}`} onClick={() => { data.logoStyle = "boxed"; onUpdate(data) }}>
                  <i className="icon-boxed"></i>
                </div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.logoAlign == 'left' ? 'active' : ''}`} onClick={() => { data.logoAlign = "left"; onUpdate(data) }}>
                  <i className="icon-align-left"></i>
                </div>
                <div data-tip="Align center horizontal" className={`cta-btn-icon ${data.logoAlign == 'center' ? 'active' : ''}`} onClick={() => { data.logoAlign = "center"; onUpdate(data) }}>
                  <i className="icon-align-center-horizontal"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.logoAlign == 'right' ? 'active' : ''}`} onClick={() => { data.logoAlign = "right"; onUpdate(data) }}>
                  <i className="icon-align-right"></i>
                </div>
              </div>
            </div>
            <label>Max. width</label>
            <div className="cta-size-input w-25"><input type="number" value={data.logoMaxWidth} onChange={(e) => { data.logoMaxWidth = e.target.value; onUpdate(data) }} placeholder="" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogoTab;