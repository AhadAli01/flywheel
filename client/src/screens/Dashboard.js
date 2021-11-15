import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState(0);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setProfile(response.data);
    });
  }, []);

  const history = useHistory();

  const update = (event) => {
    event.preventDefault();
    axios
      .post('/api/users/dashboard', {
        name: newName,
        address: newAddress,
        phone: newPhone,
        email: newEmail,
      })
      .then((response) => {
        setProfile([
          ...profile,
          {
            name: newName,
            address: newAddress,
            phone: newPhone,
            email: newEmail,
          },
        ]);
        if (response.data.errMessage) {
          alert(response.data.errMessage);
        } else {
          sessionStorage.setItem('userData', JSON.stringify(response.data));
          history.push('/dashboard');
          window.location.reload();
        }
      });
  };

  return (
    <div className="App">
    <div className="usersDisplay">
      {profile.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>email: {user.email}</h1>
            <h1>address: {user.address}</h1>
          </div>
        );
      })}
    </div>

    <Row>
      <Col md={3}>
        <h3>User Profile</h3>
        <Form onSubmit={update}>
          <input
            className='parbirInputs'
            type='name'
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            placeholder='Enter Name'
          />
          <input
            className='parbirInputs'
            type='email'
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
            placeholder='Enter Email'
          />
          <input
            className='parbirInputs'
            type='phone'
            onChange={(event) => {
              setNewPhone(event.target.value);
            }}
            placeholder='Enter phone number'
          />
          <input
            className='parbirInputs'
            type='address'
            onChange={(event) => {
              setNewAddress(event.target.value);
            }}
            placeholder='Enter Address'
          />
          <button className='parbirButton' type='submit' onClick ={update}>
            Update
          </button>
        </Form>
      </Col>
    </Row>
    </div>
  );
};

export default Dashboard;
