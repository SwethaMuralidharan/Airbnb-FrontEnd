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
      this.setState({ center: [this.props.lat, this.props.lng] })
  }
  render() {
    console.log(this.props.lat);
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: ["AIzaSyCznXuWM0IZkFv8LW8Zld2Wnvc8qSFpR1w"] }}
        center={ this.state.center }
        zoom={ this.state.zoom }
      >
      <div className="marker" lat={ this.props.lat} lng={ this.props.lng }></div>
      <div className="marker" lat={ this.props.lat-0.2 } lng={ this.props.lng-0.2 }></div>
      </GoogleMapReact>
    );
  }
}
export default MapLocation;
