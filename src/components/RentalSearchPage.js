import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import 'react-day-picker/lib/style.css';
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
    if(Auth.getToken()===null){
        alert("Please login to proceed");
    }
    else if(this.state.guestcount!==0 && this.state.price!==undefined){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rentals/${this.props.match.params.searchTerm}?max_guests=${this.state.guestcount}&price_per_night=${this.state.price}`,{
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
          this.setState(
            {RentalInfo:json},
            ()=>{(this.state.RentalInfo.length===0)?(document.getElementById("searchresult").classList.add("showEditdiv")):null}
          );
        });
    }
    else{
      alert("Please choose both price range and number of guests.");
    }
  }
  render(){
    return (<div className="divpad">
              <div className="headerstyle">Search results for {this.props.match.params.searchTerm}</div>
              <div className="container divpad searchheader">
                <div className="row">
                  <div className="col-md-6">
                    <HorizontalSlider changeInPrice={this.handleChangeInPrice}/>
                  </div>
                  <div className="col-md-4">
                    <label>Choose Number Of guests</label>
                    <IncrementDecrement updatecount={this.Updateguestcount}/>
                  </div>
                  <div className="col-md-2 divpad">
                    <button className="btn btn-primary" onClick={this.getSearchResults}>Search</button>
                  </div>
                </div>
              </div>
              <div id="searchresult" className="hideEditdiv">
                  <h4 className="center-div alertmsg">Sorry! No results found!</h4>
              </div>
              {(this.state.RentalInfo).map(each_rental=>{
                      return <div className="divpad col-md-4 offset-md-4" key={each_rental._id}><Link to={`/users/${each_rental.user_id}/rentals/${each_rental._id}`}><img src={each_rental.image_urls} height="150" alt="rental_image"  width="200"/>  {each_rental.address} - ${each_rental.price_per_night}</Link></div>
              })}
          </div>)
  }
}
export default RentalSearchPage;
