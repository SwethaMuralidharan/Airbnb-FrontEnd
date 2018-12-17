import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';
import MapLocation from './MapLocation.js';


class Profile extends Component{
  constructor() {
    super();
    this.state = {
      UserInfo: {}
    }
  }
  componentDidMount() {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${this.props.match.params.user_id}`,{
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
      <div className="container">
      <div className="row rowpad">
          <div className="col-md-3"></div>
          <div className="col-md-6 postform-bg">
              <h1 className="center-div uname">Hey! I'm {this.state.UserInfo.name} !</h1>
              <div className="userInfo">
                  <h5 className="left-pad">Gender : {this.state.UserInfo.gender}</h5>
                  <h5 className="left-pad">Dob : {String(this.state.UserInfo.dob).substring(0,10)}</h5>
                  <h5 className="left-pad">Address :    {this.state.UserInfo.address}</h5>
                  <h5 className="left-pad">Email : {this.state.UserInfo.email}</h5>
              </div><hr className="rulerstyle"/>
              <div>
                  <h2 className="center-div uname">Owned Places</h2>
                  <div className="userInfo">
                        {this.state.UserInfo.rentals && (this.state.UserInfo.rentals.length===0)?
                                (<h5 className="left-pad"><i>No rental places owned.</i></h5>):
                                (this.state.UserInfo.rentals && this.state.UserInfo.rentals.map(each_rental=>{
                                  return <div key={each_rental._id}><Link to={`/users/${this.state.UserInfo._id}/rentals/${each_rental._id}`}><h5 className="left-pad">{each_rental.address}</h5></Link></div>
                                }))
                        }
                  </div><hr className="rulerstyle"/>
                  <div className="row divpad">
                    <div className="col-md-6">
                      <Link to={`/users/${this.state.UserInfo._id}/rentals`} className="btn btn-primary"> Add New Rental </Link>
                    </div>
                    <div className="col-md-6">
                      <Link to={`/users/${Auth.getUserId()}/bookings`} className="btn btn-primary">View My Bookings</Link>
                    </div>
                  </div>
             </div>
        </div>
      </div>
      </div>
    )
  }
}
export default Profile;
