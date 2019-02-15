import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import PageLayout from './components/PageLayout';

class App extends Component {

  
 
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exac path="/dashboard" component={PageLayout} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;