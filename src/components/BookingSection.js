import React, { Component } from 'react';
import '../App.css';
import './Profile.js';
import DatePicker from './DatePicker.js';
import IncrementDecrement from './IncrementDecrement.js';

class BookingSection extends Component{
  constructor(){
    super();
    this.state={
      RentalInfo:{},
      from:undefined,
      to:undefined,
      guestcount:0,
      totalcost:0
    }
    this.Updateguestcount=this.Updateguestcount.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.computeTotalCost=this.computeTotalCost.bind(this);
    this.SaveBooking=this.SaveBooking.bind(this);
  }
  handleFromChange(from) {
    this.setState({from:from},() => this.computeTotalCost())
  }
  handleToChange(to) {
    this.setState({ to:to },() => this.computeTotalCost())
  }
  Updateguestcount(count){
    this.setState({guestcount:count})
  }
  computeTotalCost(){
    console.log("called");
    console.log(this.state.from);
    console.log(this.state.to);
    if(this.state.from!==undefined && this.state.to!==undefined){
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      var utc1 = Date.UTC(this.state.from.getFullYear(), this.state.from.getMonth(), this.state.from.getDate());
      var utc2 = Date.UTC(this.state.to.getFullYear(), this.state.to.getMonth(), this.state.to.getDate());
      var number_of_days=Math.floor((utc2 - utc1) / _MS_PER_DAY);
      var total=number_of_days*this.props.price;
      console.log(number_of_days);
      console.log(total);
      console.log(this.props.price);
      this.setState({totalcost:total})
    }
  }
  SaveBooking(e){
    e.preventDefault();
    console.log(this.state.from,this.state.to,this.state.guestcount,this.state.totalcost);
    this.props.editBooking(
                           // this.props.booking_id,
                           this.state.from,
                           this.state.to,
                           this.state.guestcount,
                           this.state.totalcost
                          );
  }
  render(){
    return (
            <div className="divpad col-md-8 outlineborder">
                <form onSubmit={this.SaveBooking}>
                    <DatePicker changeFromDate={this.handleFromChange} changeToDate={this.handleToChange}/>
                    <label>Guests:</label>
                    <IncrementDecrement updatecount={this.Updateguestcount}/>
                    <label>Total Cost : </label><label>{this.state.totalcost}</label>
                    <div><button className="btn btn-primary">Save Booking</button></div>
                </form>
            </div>
           )
  }
}
export default BookingSection;