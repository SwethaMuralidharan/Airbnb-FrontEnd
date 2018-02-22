import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import './Profile.js';

class Rental extends Component{
  constructor() {
    super();
    this.state={
      RentalInfo:{}
    }
  }
  componentWillMount(){
    console.log(this.props);
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
  console.log(this.props);
// get rental id from url
// make get request
// set fetched rental to state
// render state
      return (
              <ul>
                  <li>Address : {this.state.RentalInfo && this.state.RentalInfo.address}</li>
                  <li>Number of Rooms : {this.state.RentalInfo && this.state.RentalInfo.rooms}</li>
                  <li>Number of Bathrooms : {this.state.RentalInfo && this.state.RentalInfo.bathrooms}</li>
                  <li>Amenities : {this.state.RentalInfo && this.state.RentalInfo.amenities}</li>
                  <li>Price per night : ${this.state.RentalInfo && this.state.RentalInfo.price_per_night}</li>
                  <li>{this.state.RentalInfo && this.state.RentalInfo.image_urls && this.state.RentalInfo.image_urls.map(each_img=>{
                        return <div className="divpad">
                                  <img src={each_img} height="200" width="400"/>
                               </div>})}
                  </li>
              </ul>
            )
  }
}
export default Rental;
