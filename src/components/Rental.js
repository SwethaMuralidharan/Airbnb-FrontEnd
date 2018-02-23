import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import './Profile.js';
import PostRentalForm from './PostRentalForm.js';
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
  console.log(this.state.RentalInfo.image_urls);
      return (
        <div className="container">
        <div className="row">
        <div id="carouselExampleControls" className="carousel slide col-md-6 offset-md-3" data-ride="carousel" >
          <div className="carousel-inner">
             {this.state.RentalInfo && this.state.RentalInfo.image_urls && this.state.RentalInfo.image_urls.map((each_img,index)=>{
              return <div className={(index==0 ? 'carousel-item active' : 'carousel-item')}>
                        <img src={each_img} className="setimgwidth"/>
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
          <div className="row">
          <div className="divpad">
              <ul>
                  <li>Address : {this.state.RentalInfo && this.state.RentalInfo.address}</li>
                  <li>Number of Rooms : {this.state.RentalInfo && this.state.RentalInfo.rooms}</li>
                  <li>Number of Bathrooms : {this.state.RentalInfo && this.state.RentalInfo.bathrooms}</li>
                  <li>Maximum guests : {this.state.RentalInfo && this.state.RentalInfo.max_guest}</li>
                  <li>Amenities : {this.state.RentalInfo && this.state.RentalInfo.amenities}</li>
                  <li>Price per night : ${this.state.RentalInfo && this.state.RentalInfo.price_per_night}</li>
              </ul>
          </div>
          </div>
          </div>

            )
  }
}
export default Rental;
