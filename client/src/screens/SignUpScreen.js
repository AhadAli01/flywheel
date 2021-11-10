import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignUpScreen = () => {
  return (
    <div className='containerauth'>
      <Link className='btn btn-light my-3' to='/'>
        Go Back Home
      </Link>
      <h1>Register Now!</h1>
      <form action='/signup' method='POST'>
      <input
          className='inputs'
          type='name'
          name='username'
          placeholder="What's your name?"
        />
        <input
          className='inputs'
          type='email'
          name='email'
          placeholder="Enter Your Email"
        />
        <input
          className='inputs'
          type='password'
          name='password'
          placeholder="Enter Your Password"
        />
        <button className="submitbutton" type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;
