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
      // editClicked:false,
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
        // editClicked:true,
        edited_booking_id:booking_id
    })
    document.getElementById(booking_id).classList.add("showEditdiv");
    console.log(document.getElementById(booking_id));
  }
  updateBooking(fromvalue,tovalue,guestcountvalue,totalcostvalue){
    this.setState({
      from:fromvalue,
      to:tovalue,
      guestcount:guestcountvalue,
      totalcost:totalcostvalue,
      // editClicked:false
    },()=>
    fetch(`http://localhost:8080/api/users/${Auth.getUserId()}/bookings/${this.state.edited_booking_id}`, {
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
             this.setState({BookingInfo: json});
             document.getElementById(this.state.edited_booking_id).classList.remove("showEditdiv");
          }))
  }
  deleteBooking(booking_id){
    fetch(`http://localhost:8080/api/users/${Auth.getUserId()}/bookings/${booking_id}`,
    {
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
    // this.props.history.push(`/users/${Auth.getUserId()}/bookings`);
  }
  componentDidMount(){
    fetch(`http://localhost:8080/api/users/${Auth.getUserId()}/bookings`,{
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
        // console.log(json);
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
                <h4 className="center-div">Booking Summary</h4>
                {this.state.BookingInfo.bookings && this.state.BookingInfo.bookings.map(each_booking=>{
                    return (
                              <div key={each_booking._id} className="container headerstyle eachmapdiv">
                                  <div className="row">
                                        <div className="col-sm-3 outlineborder">
                                          Rental Location: {each_booking.rental_id && each_booking.rental_id.address}
                                        </div>
                                        <div className="col-sm-3 outlineborder">
                                          Booking Date : {each_booking.booking_date.substring(0,10)}
                                        </div>
                                  </div>
                                  <div className="row">
                                        <div className="col-sm-3 outlineborder">
                                          Date of arrival : {each_booking.start_date.substring(0,10)}
                                        </div>
                                        <div className="col-sm-3 outlineborder">
                                          Date of leaving : {each_booking.end_date.substring(0,10)}
                                        </div>
                                        <div className="col-sm-3 outlineborder">
                                          Total Guests : {each_booking.total_guests}
                                        </div>
                                        <div className="col-sm-2 outlineborder">
                                          Total Cost : {each_booking.total_cost}
                                        </div>
                                  </div>
                                  <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-3 divpad">
                                          <button className="btn btn-info btn-round" onClick={()=>this.showEditSection(each_booking._id)}>Edit</button>
                                        </div>
                                        <div className="col-sm-3 divpad">
                                          <button className="btn btn-info btn-round" onClick={()=>this.deleteBooking(each_booking._id)}>Delete</button>
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
