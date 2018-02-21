import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes.js';
import './App.css';
import Header from './components/Header';

class App extends Component {
  render(){
    return (
      <div>
        <Header />
        { MyRoutes }
      </div>
    )
  }
}

export default App;
