import React, { Component } from 'react';
import Auth from '../modules/Auth';
import '../App.css';
import './Profile.js';
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
      totalcost:0,
      Ownername:''
    }
    this.Updateguestcount=this.Updateguestcount.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.computeTotalCost=this.computeTotalCost.bind(this);
    this.bookrental=this.bookrental.bind(this);
    this.deleteRental=this.deleteRental.bind(this);
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
    if(this.state.from!==undefined && this.state.to!==undefined){
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      var utc1 = Date.UTC(this.state.from.getFullYear(), this.state.from.getMonth(), this.state.from.getDate());
      var utc2 = Date.UTC(this.state.to.getFullYear(), this.state.to.getMonth(), this.state.to.getDate());
      var number_of_days=Math.floor((utc2 - utc1) / _MS_PER_DAY);
      var total=number_of_days*this.state.RentalInfo.price_per_night
      this.setState({totalcost:total})
    }
  }
  deleteRental(rental_id){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${this.props.match.params.user_id}/rentals/${this.props.match.params.rental_id}`,{
      method: 'delete',
      headers: {
        Accept: 'application/json',
        Origin: '',
        authorization: 'Bearer ' + Auth.getToken(),
      }
    }).then((response) => {
      this.props.history.push(`/users/${Auth.getUserId()}`);
    });
  }
  bookrental(e){
    var today = new Date();
    if(this.state.from===undefined || this.state.to===undefined || this.state.guestcount===0){
      alert("Please choose dates and guests count for booking");
    }
    else if(today>this.state.from || today>this.state.to){
      alert("Please choose dates in future.");
    }
    else{
        e.preventDefault();

        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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

        var myHeaders= new Headers();
        myHeaders.append('Accept','application/json');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + Auth.getToken());

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${Auth.getUserId()}/rentals/${this.props.match.params.rental_id}/booking`,{
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(payload)
        }).then((res) => {
          return res.json()
        }).then((json) => {
          if((json==="Error: Already booked on the selected dates")||
             (json==="Error: Guest Count exceeded the limit")||
             (json==="Error: Already booked on the selected dates and guest count exceeded the limit")){
                alert(json);
          }
          else{
            this.props.history.push(`/users/${Auth.getUserId()}/bookings`);
          }
        })
    }
  }
  componentDidMount(){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${this.props.match.params.user_id}/rentals/${this.props.match.params.rental_id}`,{
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
        this.setState({RentalInfo: json,Ownername: json.user_id.name});
      });
  }
  render(){
  console.log(this.state.RentalInfo);
      return (
            <div className="container">
            <div className="row">
                <div id="carouselExampleControls" className="carousel slide col-md-6 offset-md-3" data-ride="carousel" >
                      <div className="carousel-inner divpad">
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
                  <div className="divpad col-md-4 outlineborder headerstyle">
                      <h4 className="center-div">Rental Info</h4>
                          <p>Owner : {this.state.Ownername && this.state.Ownername}</p>
                          <p>Address : {this.state.RentalInfo && this.state.RentalInfo.address}</p>
                          <p>Number of Rooms : {this.state.RentalInfo && this.state.RentalInfo.rooms}</p>
                          <p>Number of Bathrooms : {this.state.RentalInfo && this.state.RentalInfo.bathrooms}</p>
                          <p>Maximum guests : {this.state.RentalInfo && this.state.RentalInfo.max_guest}</p>
                          <p>Amenities : {this.state.RentalInfo && this.state.RentalInfo.amenities}</p>
                          <p>Price per night : ${this.state.RentalInfo && this.state.RentalInfo.price_per_night}</p>
                          {(this.props.match.params.user_id===Auth.getUserId())?
                            (<div className="center-div">
                                <button className="btn btn-primary" onClick={()=>{if(window.confirm('Are you sure you want to delete this listing?')) {this.deleteRental(this.props.match.params.rental_id)};}}>Delete</button>
                            </div>)
                          :null}
                  </div>

                  <div className="divpad col-md-8 outlineborder headerstyle">
                      <h4 className="center-div">Booking Section</h4>
                      <form onSubmit={this.bookrental}>
                          <DatePicker changeFromDate={this.handleFromChange} changeToDate={this.handleToChange}/>
                          <label> Choose Number of Guests:</label>
                          <IncrementDecrement updatecount={this.Updateguestcount}/>
                          <label className="top-pad">Total Cost : {this.state.totalcost}</label>
                          <div className="divpad"><button className="btn btn-primary" >Save Booking</button></div>
                      </form>
                  </div>
            </div>
          </div>
      )
  }
}
export default Rental;
