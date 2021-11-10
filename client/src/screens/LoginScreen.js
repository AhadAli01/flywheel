import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    axios.post('/api/users/login', { email: loginEmail, password: loginPassword }).then((response) => {
        //const { data } = response;

        if(response.data.errMessage) {
            alert(response.data.errMessage);
        } else {
            alert("Welcome " + response.data.name);
        }
        //console.log(response.data[0]);
      });
  };

  // const submitHandler = (event) => {
  //     event.preventDefault();

  //     try {
  //         const config = {
  //             headers: {
  //                 "Content-Type": "application/json"
  //             },
  //         };

  //         const userLogin = async () => {
  //             const { userdata } = await axios.post("/api/users/login", config);
  //         }
  //     } catch (error) {

  //     }
  // }

  return (
    <div className='containerauth'>
      <Link className='btn btn-light my-3' to='/'>
        Go Back Home
      </Link>
      <h1>Welcome Back!</h1>
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
