import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <div className='containerauth'>
      <Link className='btn btn-light my-3' to='/'>
        Go Back Home
      </Link>
      <h1>Welcome Back!</h1>
      <form action='/login' method='POST'>
        <input
          className='inputs'
          type='email'
          name='email'
          placeholder="What's your email?"
        />
        <input
          className='inputs'
          type='password'
          name='password'
          placeholder="What's your password?"
        />
        <button className="submitbutton" type='submit'>
          Submit
        </button>
      </form>
      <Link className='btn btn-light my-3' to='/signup'>
        Click Here To Sign Up!
      </Link>
    </div>
  );
};

export default LoginScreen;
