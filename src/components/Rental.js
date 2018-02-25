import React, { Component } from 'react';
import Auth from '../modules/Auth';
// import {Link} from 'react-router-dom';
import '../App.css';
import './Profile.js';
// import PostRentalForm from './PostRentalForm.js';
import DatePicker from './DatePicker.js';
import IncrementDecrement from './IncrementDecrement.js';

class Rental extends Component{
  constructor() {
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
    this.bookrental=this.bookrental.bind(this);
  }
  componentWillMount(){
    console.log(this.props);
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
      var total=number_of_days*this.state.RentalInfo.price_per_night
      this.setState({totalcost:total})
    }
  }
  bookrental(e){
    e.preventDefault();
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var start_Date=this.state.from.getFullYear() + '-' + (this.state.from.getMonth()+1) + '-' + this.state.from.getDate();
    var end_Date=this.state.to.getFullYear() + '-' + (this.state.to.getMonth()+1) + '-' + this.state.to.getDate();
    var payload = ({
      user_id:Auth.getUserId(),//logged in user who made the booking
      rental_id:this.props.match.params.rental_id,
      booking_date:date,
      start_date:start_Date,
      end_date:end_Date,
      total_cost:this.state.totalcost,
      total_guests:this.state.guestcount
    });
    console.log(payload)
    console.log(Auth.getToken())

    var myHeaders= new Headers();
    myHeaders.append('Accept','application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + Auth.getToken());

    fetch(`http://localhost:8080/api/users/${Auth.getUserId()}/rentals/${this.props.match.params.rental_id}/booking`,{
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload)
    }).then((res) => {
      return res.json()
    }).then((json) => {
      this.props.history.push(`/users/${Auth.getUserId()}/bookings`);
    })
  }
  componentDidMount(){
    fetch(`http://localhost:8080/api/users/${this.props.match.params.user_id}/rentals/${this.props.match.params.rental_id}`,{
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
        console.log(json);
        this.setState({RentalInfo: json});
      });
  }
  render(){
  console.log(this.state.RentalInfo.image_urls);
      return (
        <div className="container">
        <div className="row">
        <div id="carouselExampleControls" className="carousel slide col-md-6 offset-md-3" data-ride="carousel" >
          <div className="carousel-inner">
             {this.state.RentalInfo && this.state.RentalInfo.image_urls && this.state.RentalInfo.image_urls.map((each_img,index)=>{
              return <div key={index} className={(index===0 ? 'carousel-item active' : 'carousel-item')}>
                        <img src={each_img} alt="rental_image" className="setimgwidth"/>
             </div>
              })}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
          </div>
          </div>
          <div className="row divpad">
              <div className="divpad col-md-4 outlineborder">
                  <ul>
                      <li>Address : {this.state.RentalInfo && this.state.RentalInfo.address}</li>
                      <li>Number of Rooms : {this.state.RentalInfo && this.state.RentalInfo.rooms}</li>
                      <li>Number of Bathrooms : {this.state.RentalInfo && this.state.RentalInfo.bathrooms}</li>
                      <li>Maximum guests : {this.state.RentalInfo && this.state.RentalInfo.max_guest}</li>
                      <li>Amenities : {this.state.RentalInfo && this.state.RentalInfo.amenities}</li>
                      <li>Price per night : ${this.state.RentalInfo && this.state.RentalInfo.price_per_night}</li>
                  </ul>
              </div>
              <div className="divpad col-md-8 outlineborder">
                  <form onSubmit={this.bookrental}>
                      <DatePicker changeFromDate={this.handleFromChange} changeToDate={this.handleToChange}/>
                      <label>Guests:</label>
                      <IncrementDecrement updatecount={this.Updateguestcount}/>
                      <label>Total Cost : </label><label>{this.state.totalcost}</label>
                      <div><button className="btn btn-primary">Book</button></div>
                  </form>
              </div>
          </div>
          </div>

            )
  }
}
export default Rental;
