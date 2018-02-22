import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import Rental from './Rental';
class Profile extends Component{
  constructor() {
    super();
    this.state = {
      UserInfo: {}
    }
  }
  componentDidMount() {
      fetch(`http://localhost:8080/api/users/${this.props.match.params.user_id}`,{
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
          this.setState({UserInfo: json});
        });

  }
  render(){
    console.log(this.props);
    return (
      <div className="col-md-6">
        <div className="headerstyle"><h4>User Name : {this.state.UserInfo.name}</h4></div>
        <ul>
          <li>Gender : {this.state.UserInfo.gender}</li>
          <li>Dob : {this.state.UserInfo.dob}</li>
          <li>Address : {this.state.UserInfo.address}</li>
          <li>Email : {this.state.UserInfo.email}</li>
        </ul>
        <div>
          <div className="headerstyle"><h4>Places you Own</h4></div>
          <div className="center-div">
            <div className="divpad">
              <button className="btn btn-primary">Add New Rental</button>
            </div>
            <div className="divpad">
            {this.state.UserInfo.rentals && this.state.UserInfo.rentals.map(each_rental=>{
                return <Link to={`/users/${this.state.UserInfo._id}/rentals/${each_rental._id}`}>{each_rental.address}</Link>
            })}
            </div>
          </div>
        </div>
        <div className="headerstyle"><h4>Booking Summary</h4></div>
        <div className="center-div divpad">
          <button className="btn btn-primary">View My Bookings</button>
        </div>
      </div>
    )
  }
}
export default Profile
