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
    this.setState({ clicks: this.state.clicks + 1 },
    () => this.props.updatecount(this.state.clicks));
  }
  DecrementItem(e){
    this.setState({ clicks: this.state.clicks - 1 },
    ()=>this.props.updatecount(this.state.clicks));
    ;
  }
  render(){
    return (
              <div>
                <span className="btn btn-primary btn-round" onClick={this.DecrementItem}> - </span>
                <input type="text" value={this.state.clicks} className="centerItem"/>
                <span className="btn btn-primary btn-round" onClick={this.IncrementItem}> + </span>
              </div>
          )
  }
}
export default IncrementDecrement;
