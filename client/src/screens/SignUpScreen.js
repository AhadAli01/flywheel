import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const SignUpScreen = () => {

  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const history = useHistory();

  const signup = (event) => {
    event.preventDefault();
    axios.post("/api/users/signup", {name: signUpName, email: signUpEmail, password: signUpPassword, confirmPassword: signUpConfirmPassword}).then((response) => {
      if (response.data.errMessage) {
        alert(response.data.errMessage);
      } else {
        if (response.data.successMessage) {
          history.push("/login");
          window.location.reload();
        }
      }
    });
  };

  return (
    <div className='containerauth'>
      <Link className='btn btn-light my-3' to='/'>
        Go Back Home
      </Link>
      <h1>Register Now!</h1>
      <form onSubmit={signup}>
      <input
          className='inputs'
          type='name'
          placeholder="What's your name?"
          onChange={(event) => {
            setSignUpName(event.target.value);
          }}
        />
        <input
          className='inputs'
          type='email'
          placeholder="Enter Your Email"
          onChange={(event) => {
            setSignUpEmail(event.target.value);
          }}
        />
        <input
          className='inputs'
          type='password'
          placeholder="Enter Your Password"
          onChange={(event) => {
            setSignUpPassword(event.target.value);
          }}
        />
        <input
          className='inputs'
          type='password'
          placeholder="Confirm Your Password"
          onChange={(event) => {
            setSignUpConfirmPassword(event.target.value);
          }}
        />
        <button className="submitbutton" type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;
