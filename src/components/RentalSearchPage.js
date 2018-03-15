import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import 'react-day-picker/lib/style.css';
import HorizontalSlider from './HorizontalSlider.js';
import 'react-rangeslider/lib/index.css';
import IncrementDecrement from './IncrementDecrement.js';
import DatePicker from './DatePicker.js';
import MapLocation from './MapLocation.js';

class RentalSearchPage extends Component{
  constructor(){
    super();
    this.state={
      RentalInfo:[],
      from:undefined,
      to:undefined,
      price:undefined,
      guestcount:0,
      searchTerm:''
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
  getSearchResults(e){
    if(Auth.getToken()===null){
        alert("Please login to proceed");
    }
    var today = new Date();
    if(today>this.state.from || today>this.state.to){
        alert("Please choose dates in future.");
    }
    else if(this.state.guestcount!==0 && this.state.price!==undefined){
      e.preventDefault();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rentals/${this.props.match.params.searchTerm}?max_guests=${this.state.guestcount}&price_per_night=${this.state.price}&from_date=${this.state.from}&to_date=${this.state.to}`,{
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
            ()=>{(this.state.RentalInfo.length===0)?(document.getElementById("searchresult").classList.add("showEditdiv")):document.getElementById("searchresult").classList.remove("showEditdiv")}
          );
        });
    }
    else{
      alert("Please choose both price range and number of guests.");
    }
  }
  componentDidMount(){
    this.setState({
      searchTerm:this.props.match.params.searchTerm
    })
  }
  render(){
    return (<div className="container divpad">
              <div className="headerstyle">Search results for {this.props.match.params.searchTerm}</div>
              <form onSubmit={this.getSearchResults}>
                <div className="container divpad searchheader">
                    <div className="row">
                      <div className="col-md-8">
                       <DatePicker changeFromDate={this.handleFromChange} changeToDate={this.handleToChange}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <HorizontalSlider changeInPrice={this.handleChangeInPrice}/>
                      </div>
                      <div className="col-md-4">
                        <label>Choose Number Of guests</label>
                        <IncrementDecrement updatecount={this.Updateguestcount}/>
                      </div>
                      <div className="col-md-2 divpad">
                        <button className="btn btn-primary">Search</button>
                      </div>
                    </div>
                </div>
              </form>

              <div id="searchresult" className="hideEditdiv">
                  <h4 className="center-div alertmsg">Sorry! No results found!</h4>
              </div>
              <div className="row">
                <div className="col-md-6 divpad ">
                    {(this.state.RentalInfo).map(each_rental=>{
                            return <div className="divpad" key={each_rental._id}><Link to={`/users/${each_rental.user_id}/rentals/${each_rental._id}`}><img src={each_rental.image_urls} height="150" alt="rental_image"  width="200"/>  {each_rental.address} - ${each_rental.price_per_night}</Link></div>
                    })}
                </div>
                <div className="col-md-6 divpad">
                   {(this.props.match.params.searchTerm==="SanFrancisco")?
                  (<MapLocation lat={37.77} lng={-122.419} />):
                  ((this.props.match.params.searchTerm==="Oregon")?(<MapLocation lat={45.522794} lng={ -122.679565} />)
                  :(<MapLocation lat={40.785} lng={-73.968} />))
                }
                </div>
              </div>
          </div>)
  }
}
export default RentalSearchPage;
