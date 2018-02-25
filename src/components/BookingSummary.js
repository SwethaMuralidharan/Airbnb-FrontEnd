import React, { Component } from 'react';
import Auth from '../modules/Auth';
// import {Link} from 'react-router-dom';
import '../App.css';
import './Profile.js';
// import PostRentalForm from './PostRentalForm.js';
// import DatePicker from './DatePicker.js';
// import IncrementDecrement from './IncrementDecrement.js';

class BookingSummary extends Component{
  constructor(){
    super();
    this.state={
      BookingInfo:[],
      BookedRentalInfo:[]
    }
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
    return (<div className="divpad">
              <h4 className="center-div">Booking Summary Page</h4>
              {this.state.BookingInfo.bookings && this.state.BookingInfo.bookings.map(each_booking=>{
                  return (
                            <div key={each_booking._id} className="container">
                                <div className="row">
                                    <div className="col-sm-3 outlineborder">
                                      Rental Location: {each_booking.rental_id && each_booking.rental_id.address}
                                    </div>
                                    <div className="col-sm-3 outlineborder">
                                      Booking Date : {each_booking.booking_date}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 outlineborder">
                                      Date of arrival : {each_booking.start_date}
                                    </div>
                                    <div className="col-sm-3 outlineborder">
                                      Date of leaving : {each_booking.end_date}
                                    </div>
                                    <div className="col-sm-3 outlineborder">
                                      Total Guests : {each_booking.total_guests}
                                    </div>
                                    <div className="col-sm-3 outlineborder">
                                      Total Cost : {each_booking.total_cost}
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-3"></div>
                                  <div className="col-sm-3"></div>
                                  <div className="col-sm-3 divpad">
                                    <button className="btn btn-info btn-round">Edit</button>
                                  </div>
                                  <div className="col-sm-3 divpad">
                                    <button className="btn btn-info btn-round">Delete</button>
                                  </div>
                                </div>
                            </div>
                        )
              })}
            </div>
           )
  }
}
export default BookingSummary;
