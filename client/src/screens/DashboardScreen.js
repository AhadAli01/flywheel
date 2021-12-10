import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Table } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';



const data = localStorage.getItem("userData");
const object = JSON.parse(data);

const Dashboard = ({auth}) => {
  const [profile, setProfile] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // useEffect(() => {
  //   axios.get('/api/users').then((response) => {
  //     setProfile(response.data);
  //   });
  // }, []);

  const history = useHistory();
  
  if(auth === 0){
    return(<Redirect to = "/login"/>);
  }
  else{


  const update = (event) => {
    event.preventDefault();
    axios
      .post('/api/users/dashboard', {
        user: object._id,
        address: newAddress,
        phone: newPhone,
      })
      .then((response) => {
        if (response.data.errMessage) {
          alert(response.data.errMessage);
        } else {
          sessionStorage.setItem('profileData', JSON.stringify(response.data));
          window.location.reload();
        }
      });
  };

  return (
    <div className="App">
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
            placeholder={object.name}
          />
          <input
            className='parbirInputs'
            type='email'
            name='email'
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
            placeholder={object.email}
          />
          <input
            className='parbirInputs'
            type='phone'
            name='phone'
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
          <button className='parbirButton' type='submit' onClick={update}>
            Update
          </button>
        </Form>
      </Col>
      <Col md={9}>
            <h2>Orders</h2>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Bid Amount</th>
                <th>Issued Time</th>
                <th>Expired Time</th>
              </tr>
            </thead>
            </Table>
      </Col>
    </Row>
    </div>
  );
}
};

export default Dashboard;
