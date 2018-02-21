import React, { Component } from 'react';


class MainSearchPage extends Component {
  render(){
    return(
      <div className="container divpad">
          <div className="row">
                <div className="col-md-6">
                <h2>Book Unique Homes and Enjoy</h2>
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input type="text" className="form-control input-lg" />
                            <button type="button" className="btn btn-primary">
                                <span className="glyphicon glyphicon-search"></span> Search
                            </button>
                        </div>
                    </div>
                </div>
          </div>
      </div>
    )
  }
}
export default MainSearchPage;
