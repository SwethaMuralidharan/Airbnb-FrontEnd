import React, { Component } from 'react';


class Splash extends Component {
  render(){
      return (
          <div id="carouselExampleIndicators" className="carousel slide col-md-12" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="https://a0.muscache.com/im/pictures/3e0d73ef-2da5-4a02-b97f-c6232e29336c.jpg?aki_policy=large" alt="First slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://a0.muscache.com/im/pictures/92df2e8d-a1fc-4fe8-97df-7d975a842c6d.jpg?aki_policy=large" alt="Second slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://a0.muscache.com/im/pictures/349608fe-1bf8-4f99-8e5c-ae500cb4a2c5.jpg?aki_policy=large" alt="Third slide"/>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        )
  }
}
export default Splash;
