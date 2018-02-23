import React, { Component } from 'react';

class IncrementDecrement extends Component{
  constructor(){
    super();
    this.state={
      clicks:0
    }
    this.IncrementItem=this.IncrementItem.bind(this);
    this.DecrementItem=this.DecrementItem.bind(this);
  }
  IncrementItem(e){
    this.setState({ clicks: this.state.clicks + 1 });
    this.props.updatecount(this.state.clicks);
  }
  DecrementItem(e){
    this.setState({ clicks: this.state.clicks - 1 });
    this.props.updatecount(this.state.clicks);
  }
  render(){
    return (
          <div>
            <button className="btn btn-primary btn-round" onClick={this.DecrementItem}> - </button>
            <input type="text" value={this.state.clicks} className="centerItem"/>
            <button className="btn btn-primary btn-round" onClick={this.IncrementItem}> + </button>
          </div>
          )
  }
}
export default IncrementDecrement;
