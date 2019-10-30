import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';

class FeaturedImageTab extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  onImageChange = (e) => {
    const { data, onUpdate } = this.props;
    e.target.value.indexOf("http") == -1 ? data.image = "http://" + e.target.value : data.image = e.target.value;
    onUpdate(data)
  }

  render() {

    const { data, onUpdate } = this.props;

    return (
      <div className="cta-tab-content">
        <div className="cta-group-title">
          <h2>Featured image</h2>
        </div>
        <div className="cta-tab active">
          <div className="cta-group bb-0">
            <div className="cta-info"><i className="icon-info-outline"></i><span>Currently we don’t support image upload. Instead, insert the link to your image below.</span></div>
            <label>Link to image</label>
            <input
              value={data.image}
              onChange={this.onImageChange}
              type="text"
              placeholder="example.com"
            />
            <div className="btn-icons mb-d">
              <label>Align</label>
              <div className="w-100">
                <div data-tip="Align full width" className={`cta-btn-icon ${data.imageStyle == 'full-width' ? 'active' : ''}`} onClick={() => { data.imageStyle = "full-width"; onUpdate(data) }}>
                  <i className="icon-full-width"></i>
                </div>
                <ReactTooltip place="bottom" className="tolltip-basic" effect="solid" />
                <div data-tip="Align boxed" className={`cta-btn-icon ${data.imageStyle == 'boxed' ? 'active' : ''}`} onClick={() => { data.imageStyle = "boxed"; onUpdate(data) }}>
                  <i className="icon-boxed"></i>
                </div>
                <div data-tip="Align left" className={`cta-btn-icon ${data.imageAlign == 'left' ? 'active' : ''}`} onClick={() => { data.imageAlign = "left"; onUpdate(data) }}>
                  <i className="icon-align-left"></i>
                </div>
                <div data-tip="Align center horizontal" className={`cta-btn-icon ${data.imageAlign == 'center' ? 'active' : ''}`} onClick={() => { data.imageAlign = "center"; onUpdate(data) }}>
                  <i className="icon-align-center-horizontal"></i>
                </div>
                <div data-tip="Align right" className={`cta-btn-icon ${data.imageAlign == 'right' ? 'active' : ''}`} onClick={() => { data.imageAlign = "right"; onUpdate(data) }}>
                  <i className="icon-align-right"></i>
                </div>
              </div>
            </div>
            <label>Max. width</label>
            <div className="cta-size-input w-25"><input type="number" value={data.imageWidth} onChange={(e) => { data.imageWidth = e.target.value; onUpdate(data) }} placeholder="" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedImageTab;