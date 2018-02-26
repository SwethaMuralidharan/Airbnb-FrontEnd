import React, { Component } from 'react';
import Auth from '../modules/Auth';
import {Link} from 'react-router-dom';
import '../App.css';

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
      <div className="col-md-6 offset-md-3 divpad setbg">
          <div className="headerstyle">
            <h4>User Name : {this.state.UserInfo.name}</h4>
          </div>
            <h5 className="left-pad">Gender : {this.state.UserInfo.gender}</h5>
            <h5 className="left-pad">Dob : {String(this.state.UserInfo.dob).substring(0,10)}</h5>
            <h5 className="left-pad">Address : {this.state.UserInfo.address}</h5>
            <h5 className="left-pad">Email : {this.state.UserInfo.email}</h5>
          <div>
            <div className="headerstyle">
              <h4>Places you Own</h4>
            </div>
            <div className="center-div">
                <div className="divpad">
                  <Link to={`/users/${this.state.UserInfo._id}/rentals`} className="btn btn-primary"> Add New Rental </Link>
                </div>
                <div className="divpad">
                  {this.state.UserInfo.rentals && this.state.UserInfo.rentals.map(each_rental=>{
                      return <div key={each_rental._id}><Link to={`/users/${this.state.UserInfo._id}/rentals/${each_rental._id}`}>{each_rental.address}</Link></div>
                  })}
                </div>
            </div>
         </div>
        <div className="headerstyle">
          <h4>Booking Summary</h4>
        </div>
        <div className="center-div divpad">
          <Link to={`/users/${Auth.getUserId()}/bookings`} className="btn btn-primary">View My Bookings</Link>
        </div>
      </div>
    )
  }
}
export default Profile;
