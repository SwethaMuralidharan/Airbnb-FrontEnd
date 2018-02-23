import React, { Component } from 'react';
import IncrementDecrement from './IncrementDecrement.js';
import Auth from '../modules/Auth';
import { Route, withRouter } from 'react-router-dom';

class PostRentalForm extends Component{
  constructor(){
    super();
    this.state={
      guestcount:0,
      bedcount:0,
      bathcount:0,
      address:'',
      price_per_night:0,
      amenities:'',
      rooms:0,
      image_urls:""
    }
    this.Updateguestcount=this.Updateguestcount.bind(this);
    this.Updatebedcount=this.Updatebedcount.bind(this);
    this.Updatebathcount=this.Updatebathcount.bind(this);
    this.Updateroomcount=this.Updateroomcount.bind(this);
    this.PostRental=this.PostRental.bind(this);
  }
  Updateguestcount(count){
      this.setState({
        guestcount:count
      })
  }
  Updatebedcount(count){
      this.setState({
        bedcount:count
      })
  }
  Updatebathcount(count){
      this.setState({
        bathcount:count
      })
  }
  Updateroomcount(count){
      this.setState({
        rooms:count
      })
  }
  componentWillMount(){
      console.log(this.props);
  }
  PostRental(e){
    e.preventDefault();
    var payload = ({
      user_id:this.props.match.params.user_id,
      address: this.state.address,
      rooms: this.state.rooms,
      bed: this.state.bedcount,
      bathrooms: this.state.bathcount,
      max_guest: this.state.guestcount,
      price_per_night: this.state.price_per_night,
      amenities:this.state.amenities,
      image_urls:[this.state.image_urls]
    });
    console.log(payload)
    console.log(Auth.getToken())

    var myHeaders= new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + Auth.getToken());

    fetch(`http://localhost:8080/api/users/${this.props.match.params.user_id}/rentals`,{
    method: 'POST',
    headers: myHeaders,
// {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + Auth.getToken()
    // },
    body: JSON.stringify(payload)
    }).then((res) => {
      console.log(res.json);
      return res.json()
    }).then((json) => {
      this.props.history.push(`/user/${this.props.match.params.user_id}`);
    })
  }
  render(){
    return (

            <div className="divpad">
              <h4>Post your rental as a listing in Airbnb!</h4>
              <div className="divpad">
                <p>How many guests can your place accomodate?</p>
                <IncrementDecrement updatecount={this.Updateguestcount}/>
              </div>
              <div className="divpad">
                <p>How many rooms can the guests use?</p>
                <IncrementDecrement updatecount={this.Updateroomcount}/>
              </div>
              <div className="divpad">
                <p>How many beds can the guests use?</p>
                <IncrementDecrement updatecount={this.Updatebedcount}/>
              </div>
              <div className="divpad">
                <p>How many bathrooms can the guests use?</p>
                <IncrementDecrement updatecount={this.Updatebathcount}/>
              </div>
              <div className="divpad">
                <p>Where is this listing located?</p>
                <input type="text" value={this.state.address} onChange={e => this.setState({ address: e.target.value})}></input>
              </div>
              <div className="divpad">
                <p>What is the price per night?</p>
                <input type="text" value={this.state.price_per_night} onChange={e => this.setState({ price_per_night: e.target.value})}></input>
              </div>
              <div className="divpad">
                <p>What are the amenities provided?</p>
                <input type="text" value={this.state.amenities}  onChange={e => this.setState({ amenities: e.target.value})}></input>
              </div>
              <div className="divpad">
                <p>Upload image url's of your place separated by a comma</p>
                <textarea value={this.state.image_urls} rows="3" cols="50" onChange={e => this.setState({ image_urls: e.target.value})}/>
              </div>
              <div className="divpad">
                <button className="btn btn-primary btn-round" onClick={this.PostRental}>POST</button>
              </div>
            </div>
          )
  }
}
export default withRouter(PostRentalForm);