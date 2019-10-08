import React, { Component } from "react";
import { ICON_PACK } from "../defines";

let isIcnsMounted = false;

class IconsSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      inputFocus: false,
      inputValue: '',
    }
  }

  componentDidMount() {
    isIcnsMounted = true;
    this.events();
  }

  componentWillUnmount(){
    isIcnsMounted = false;
    document.removeEventListener("click", ()=>{});
  }

  events = () =>{
    document.addEventListener("click", (e) => {
      if (isIcnsMounted) if (e.target.closest('.cta-icons-select') == null) this.setState({ active: false });
    });
  }

  onSearch = (e) => {
    this.setState({inputValue: e.target.value.toLowerCase()});
  }

  onToggle = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  onIconChoose = (i) => {
    const { onUpdate } = this.props;
    this.setState({active:false});
    onUpdate(ICON_PACK[i]);
  }

  onInputFocus = () => {
    this.setState({inputFocus: true});
  }

  onInputBlur = () => {
    this.setState({inputFocus: false});
  }

  getFilteredIcons = () => {
    const { value } = this.props;
    const { inputValue } = this.state;
    let cls = '';

    return ICON_PACK.map((icon, i) => {
      if(icon.indexOf(inputValue) != -1) {
        icon == value ? cls = "active" : cls = '';
        return (<i key={"icn-" + i} className={`${cls} ${icon}`} onClick={() => { this.onIconChoose(i) }}></i>)
      }
    })
  }

  onClear = () => {
    this.setState({inputValue: ''});
  }

  render() {

    const { value } = this.props;
    const { active, inputFocus, inputValue } = this.state;


    return (
      <div className={`cta-icons-select ${active ? "active" : ''}`}>
        <div className="cta-icons-toggler" onClick={this.onToggle}>
          <i className={value}></i>
        </div>
        <div className="cta-icons-dropdown">
          <div className={`cta-icons-search ${inputFocus ? "active" : ''}`}>
            <i  className={`cta-icons-clear icon-close ${inputValue.length > 0 ? "active" : ''}`} onClick={this.onClear}></i> 
            <i className="cta-icons-search icon-search"></i> 
            <input placeholder="Search icons..." value={inputValue} type="text" onChange={this.onSearch} onFocus={this.onInputFocus} onBlur={this.onInputBlur}/>
          </div>
          <div className="cta-icons-list">
            {this.getFilteredIcons()}
          </div>
        </div>
      </div>
    );
  }
}

export default IconsSelect;