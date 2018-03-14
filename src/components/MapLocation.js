import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import marker from '../marker.svg';
import '../App.css';

class MapLocation extends Component {
  constructor() {
   super();
   this.state = {
     center: [],
     zoom: 8,
   }
  }
  componentDidMount() {
      this.setState({ center: [45.512794, -122.679565 ] })
  }
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: ["AIzaSyCznXuWM0IZkFv8LW8Zld2Wnvc8qSFpR1w"] }}
        center={ this.state.center }
        zoom={ this.state.zoom }
      >
      <div className="marker" lat={ this.state.center[0] } lng={ this.state.center[1] }></div>
      <div className="marker" lat={ 44.552794 } lng={ -123.709565 }></div>
      </GoogleMapReact>
    );
  }
}
export default MapLocation;
