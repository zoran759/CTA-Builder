import React, { Component } from "react";

let isMounted = false;

class DropDown extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    isMounted = true;
    this.events();
  }

  componentWillUnmount(){
    isMounted: false;
    document.removeEventListener("click", ()=>{});
  }

  events = () =>{
    const { onClose } = this.props;

    document.addEventListener("click", (e) => {
      if (isMounted) if (e.target.closest('.cta-dropdown') == null && e.target.closest('.cta-dropdown-toggler') == null) {
        onClose();
      }
    });
  }

  render() {
    const { isOpen } = this.props;

    return (
      <div className={`cta-dropdown ${isOpen ? 'active' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

export default DropDown;