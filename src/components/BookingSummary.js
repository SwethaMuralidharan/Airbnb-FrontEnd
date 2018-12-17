import React, { Component } from 'react';
import Auth from '../modules/Auth';
import '../App.css';
import './Profile.js';
import BookingSection from './BookingSection.js';

class BookingSummary extends Component{
  constructor(){
    super();

    this.state={
      BookingInfo:[],
      BookedRentalInfo:[],
      from:undefined,
      to:undefined,
      guestcount:0,
      totalcost:0,
      edited_booking_id:null
    }
    this.deleteBooking=this.deleteBooking.bind(this);
    this.updateBooking=this.updateBooking.bind(this);
    this.showEditSection=this.showEditSection.bind(this);
  }
  showEditSection(booking_id){
    this.setState({
        edited_booking_id:booking_id
    })
    document.getElementById(booking_id).classList.add("showEditdiv");
  }
  updateBooking(fromvalue,tovalue,guestcountvalue,totalcostvalue){
    this.setState({
      from:fromvalue,
      to:tovalue,
      guestcount:guestcountvalue,
      totalcost:totalcostvalue
    },()=>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${Auth.getUserId()}/bookings/${this.state.edited_booking_id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
           authorization: 'Bearer ' + Auth.getToken(),
        },
        body: JSON.stringify({
          user_id:Auth.getUserId(),
          start_date:this.state.from,
          end_date:this.state.to,
          total_cost:this.state.totalcost,
          total_guests:this.state.guestcount
          })
        }).then((res) => {
           return res.json()
          }).then((json) => {
            console.log(json);
            if((json==="Error: Already booked on the selected dates")||
               (json==="Error: Guest Count exceeded the limit")||
               (json==="Error: Already booked on the selected dates and guest count exceeded the limit")){
                  alert(json);
            }
            else{
              this.setState({BookingInfo: json});
              document.getElementById(this.state.edited_booking_id).classList.remove("showEditdiv");
            }
          }))
  }
  deleteBooking(booking_id){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${Auth.getUserId()}/bookings/${booking_id}`,{
      method: 'delete',
      headers: {
        Accept: 'application/json',
        Origin: '',
        authorization: 'Bearer ' + Auth.getToken(),
      }
    }).then((response) => {
      this.setState({
        BookingInfo: {bookings: this.state.BookingInfo.bookings.filter(booking => booking._id !== booking_id)}
      });
    });
  }
  componentDidMount(){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${Auth.getUserId()}/bookings`,{
            headers: {
              Accept: 'application/json',
              Origin: '',
              authorization: 'Bearer ' + Auth.getToken(),
              },
            method: 'GET'
          }
        )
      .then(res => res.json())
      .then(json => {
        this.setState({BookingInfo: json});
      });
  }
  render(){
    console.log(this.state.BookingInfo);
    if(this.state.BookingInfo.bookings && this.state.BookingInfo.bookings.length===0){
      return (<div className="divpad"><h4 className="center-div alertmsg">No Bookings made yet!!</h4></div>);
    }
    else{
      return (<div className="divpad">
                <h2 className="center-div">Booking Summary</h2>
                {this.state.BookingInfo.bookings && this.state.BookingInfo.bookings.map(each_booking=>{
                    return (
                              <div key={each_booking._id} className="container eachmapdiv">
                                  <div className="row justify-content-md-center">
                                        <div className="col-md-4">
                                          <h4><i>Rental Property : {each_booking.rental_id && each_booking.rental_id.address}</i></h4>
                                        </div>
                                        <div className="col-md-4">
                                          <h4><i>Owner Name : {each_booking.rental_id && each_booking.rental_id.user_id.name}</i></h4>
                                        </div>
                                        <div className="col-md-4">
                                          <h4><i>Booking Date : {each_booking.booking_date.substring(0,10)}</i></h4>
                                        </div>
                                        <div className="col-md-2"></div>
                                  </div>
                                  <hr className="rulerstyle"/>
                                  <div className="row">
                                        <div className="col-md-2">
                                          <h5>CheckIn</h5>
                                        </div>
                                        <div className="col-md-3">
                                          <h5>{each_booking.start_date.substring(0,10)}</h5>
                                        </div>

                                        <div className="col-md-2">
                                          <h5>Checkout</h5>
                                        </div>
                                        <div className="col-md-3">
                                            <h5>{each_booking.end_date.substring(0,10)}</h5>
                                        </div>
                                  </div>

                                  <div className="row">
                                        <div className="col-md-2">
                                          <h5>Guests</h5>
                                        </div>
                                        <div className="col-md-3">
                                           <h5>{each_booking.total_guests}</h5>
                                        </div>

                                        <div className="col-md-2">
                                          <h5>Total</h5>
                                        </div>
                                        <div className="col-md-3">
                                          <h5>${each_booking.total_cost}</h5>
                                        </div>
                                  </div>
                                  <hr className="rulerstyle"/>
                                  <div className="row">
                                        <div className="col-md-6"></div>
                                        <div className="col-md-3">
                                          <button className="btn btn-info btn-round" onClick={()=>this.showEditSection(each_booking._id)}>Edit</button>
                                        </div>
                                        <div className="col-md-3">
                                          <button className="btn btn-info btn-round" onClick={()=>{if(window.confirm('Are you sure you want to delete this booking?')) {this.deleteBooking(each_booking._id)};}}>Cancel</button>
                                        </div>

                                  </div>

                                  <div className="row hideEditdiv" id={each_booking._id}>
                                        <div className="col-sm-12">
                                            <BookingSection booking_id={each_booking._id} price={each_booking.rental_id && each_booking.rental_id.price_per_night} editBooking={this.updateBooking}/>
                                        </div>
                                  </div>
                              </div>
                          )
                })}
              </div>
             )
      }
  }
}
export default BookingSummary;
