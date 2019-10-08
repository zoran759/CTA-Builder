import React, { Component} from "react";

class Modal extends Component{
  constructor(props){
    super(props);

    this.state = {
      mtype: "ct-modal-basic",
    };
  }

  render(){
    const {mtype} = this.state;
    const { content, isOpen, onClose, type, overlayClose } = this.props;

    return(
      <div className={`cta-modal ${type ? type : mtype} ${isOpen ? 'active' : ''}`} >
        <div className="cta-modal-overlay" onClick={overlayClose ? onClose : ''}></div>
        <div className="cta-modal-content">{content}</div>
      </div>
    );
  }
}

export default Modal;