import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const history = useHistory();

  const login = (event) => {
    event.preventDefault();
    axios
      .post('/api/users/login', { email: loginEmail, password: loginPassword })
      .then((response) => {
        if (response.data.errMessage) {
          alert(response.data.errMessage);
        } else {
          localStorage.setItem('userData', JSON.stringify(response.data));
          history.push('/');
          window.location.reload();
        }
      });
  };

  return (
    <div className='containerauth'>
      <Link className='btn btn-light my-3' to='/'>
        Go Back Home
      </Link>
      <h1>Welcome Back!</h1>
      <div className='authImage'>
        <img
          src='https://goservicexpert.com/uploads/services/71386.png'
          width='100'
          height='100'
        ></img>
      </div>
      <form onSubmit={login}>
        <input
          className='inputs'
          type='email'
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
          placeholder="What's your email?"
        />
        <input
          className='inputs'
          type='password'
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          placeholder="What's your password?"
        />
        <button className='submitbutton' type='submit'>
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
