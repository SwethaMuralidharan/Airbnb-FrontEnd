import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import RentalSearchPage from './RentalSearchPage.js';
import Splash from './Splash.js';


class MainSearchPage extends Component {
  constructor(){
    super();
    this.state={
      searchTerm:''
    }
  }
  render(){
    console.log(this.props);
    return(
      <div className="container divpad">
          <div className="row">
                <div className="col-md-6 offset-md-3">
                <h2>Book Unique Homes and Enjoy</h2>
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                                <input type="text" className="form-control input-lg" value={this.state.searchTerm} onChange={e => this.setState({ searchTerm: e.target.value})}></input>
                                <Link className="btn btn-primary" to={`/search/${this.state.searchTerm}`} >
                                    <span className="glyphicon glyphicon-search"></span> Search
                                </Link>
                        </div>
                    </div>
                </div>
          </div>
          <div className="row divpad">
            <Splash/>
          </div>
      </div>
    )
  }
}
export default MainSearchPage;
