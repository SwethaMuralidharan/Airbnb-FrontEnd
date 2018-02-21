import React, { Component } from 'react';
// import { Card, CardTitle, CardText } from 'material-ui/Card';


class Dashboard extends Component{
    render(){
      return(
        <div className="container">
          <div>
            <p>You should get access to this page only after authentication.</p>
          </div>
          {this.secretData}
          {/* {this.secretData && {this.secretData}} */}
        </div>
      )
    }
}

export default Dashboard;
