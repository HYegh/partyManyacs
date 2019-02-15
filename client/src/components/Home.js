import React from 'react'
import { Redirect } from 'react-router-dom';
import './Home.css'
import flogo from './facebook-logo.png'
import glogo from './google.png'

const Home = () => (
	!window.localStorage.getItem("jwt") ? 
      <div className="header">
        <div className='fb'>
          <img src={flogo} alt='fb' />
          <a href="/auth/facebook">
            Login with Facebook
        </a>
        </div>
        <div className='go'>
          <img src={glogo} alt='go' />
          <a href="/auth/google">
            Login with Google
        </a>
        </div>
      </div>: 
    <Redirect to='./dashboard/myProfile' />
);

export default Home;
