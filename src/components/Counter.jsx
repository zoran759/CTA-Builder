import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  render() {

    const {onUpdate, value} = this.props;

    return (
      <div className="cta-number w-40">
        <div className="cta-number-decrease" onClick={()=>{onUpdate(this.input.current.value > 0 ? Number(this.input.current.value) - 1 : Number(this.input.current.value))}}>-</div>
        <input ref={this.input} id="estimated" type="number" value={value} onChange={(e)=>{onUpdate(e.target.value)}} />
        <div className="cta-number-increase" onClick={()=>{onUpdate(Number(this.input.current.value) + 1)}}>+</div>
      </div>
    );
  }
}

export default Counter;