import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import MainSearchPage from './MainSearchPage.js';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DatePicker from './DatePicker.js';
import $ from 'jquery';
import slider from 'jquery-ui';
import HorizontalSlider from './HorizontalSlider.js';
import 'react-rangeslider/lib/index.css';
import IncrementDecrement from './IncrementDecrement.js';



class RentalSearchPage extends Component{
  constructor(){
    super();
    this.state={
      RentalInfo:[],
      from:undefined,
      to:undefined,
      price:undefined,
      guestcount:0,
    }
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleChangeInPrice=this.handleChangeInPrice.bind(this);
    this.Updateguestcount=this.Updateguestcount.bind(this);
    this.getSearchResults=this.getSearchResults.bind(this);
  }
  handleFromChange(from) {
    this.setState({from:from})
  }
  handleToChange(to) {
    this.setState({ to:to })
  }
  handleChangeInPrice(price){
    this.setState({price:price})
  }
  Updateguestcount(count){
    this.setState({guestcount:count})
  }
  getSearchResults(){
    console.log(Auth.getToken());
    fetch(`http://localhost:8080/api/rentals/${this.props.match.params.searchTerm}?max_guests=${this.state.guestcount}&price_per_night=${this.state.price}`,{
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
        this.setState({RentalInfo:json});
      });
  }
  render(){
    console.log(this.state.RentalInfo);
    console.log("from date:",this.state.from);
    console.log("to date:",this.state.to);
    console.log("price",this.state.price);
    console.log("guestcount",this.state.guestcount);
    var routeURL="/users/"
    return <div>

              <div className="headerstyle">Search results for {this.props.match.params.searchTerm}</div>
              <div className="container">
                <div className="row divpad">
                  <div className="col-md-8 outlineborder">
                    <DatePicker changeFromDate={this.handleFromChange} changeToDate={this.handleToChange}/>
                  </div>
                </div>
                <div className="row divpad">
                  <div className="col-md-8 outlineborder">
                    <HorizontalSlider changeInPrice={this.handleChangeInPrice}/>
                  </div>
                </div>
                <div className="row divpad">
                  <div className="col-md-8 outlineborder">
                    <label>Choose Number Of guests</label>
                    <IncrementDecrement updatecount={this.Updateguestcount}/>
                  </div>
                </div>
                <div className="row divpad">
                  <div className="col-md-8">
                    <button className="btn btn-primary" onClick={this.getSearchResults}>Search</button>
                  </div>
                </div>
              </div>
              {(this.state.RentalInfo).map(each_rental=>{
                      return <div className="center-div" key={each_rental}><Link to={`/users/${each_rental.user_id}/rentals/${each_rental._id}`}><img src={each_rental.image_urls} height="100" width="150"/>  {each_rental.address} - ${each_rental.price_per_night}</Link></div>
              })}
          </div>
  }
}
export default RentalSearchPage;