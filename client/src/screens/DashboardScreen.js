import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Table } from 'react-bootstrap';
import OrderRows from '../components/OrderRows';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';



const data = localStorage.getItem("userData");
const user = JSON.parse(data);

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

  useEffect(() => {
    const createOrders = async () => {
      await axios.post('api/auctions/createorder');
    };
    createOrders();
  }, []);

  const history = useHistory();
  
  if(auth === 0){
    return(<Redirect to = "/login"/>);
  }
  else {


  const update = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let variable = {};
    variable = {
      user: user._id,
      address: newAddress,
      phone: newPhone,
    };
    try {
      const { data } = await axios.post(
        `/api/users/profile`,
        variable,
        config,
      )
      alert("Profile updated")
      sessionStorage.setItem('profileData', JSON.stringify(data));
      window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
    }


      // .then((response) => {
      //   if (response.data.errMessage) {
      //     alert(response.data.errMessage);
      //   } else {
      //     sessionStorage.setItem('profileData', JSON.stringify(response.data));
      //     window.location.reload();
      //   }
      // });
  };

  return (
    <div className="App">
    <Row>
      <Col md={5} style={{paddingBottom: "30px"}}>
        <h3>User Profile</h3>
        <Form onSubmit={update}>
          <input
            className='parbirInputs'
            type='name'
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            placeholder={user.name}
          />
          <input
            className='parbirInputs'
            type='email'
            name='email'
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
            placeholder={user.email}
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
      <Col md={12} style={{paddingBottom: "30px"}}>
            <h2>Orders</h2>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Vehicle Name/Image</th>
                <th>Seller Name</th>
                <th>Total Price</th>
                <th>Payment Method</th>
                <th>Paid Date</th>
                <th>Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
              <Col xl={12}>
                <OrderRows></OrderRows>
              </Col>
                </td>
                <td>
              <Col xl={12}>
                <OrderRows></OrderRows>
              </Col>
                </td>
                <td>
              <Col xl={12}>
                <OrderRows></OrderRows>
              </Col>
                </td>
                <td>
              <Col xl={12}>
                <OrderRows></OrderRows>
              </Col>
                </td>
                <td>
              <Col xl={12}>
                <OrderRows></OrderRows>
              </Col>
                </td>
                <td>
              <Col xl={12}>
                <OrderRows></OrderRows>
              </Col>
                </td>
              </tr>
            </tbody>
            </Table>
      </Col>
    </Row>
    </div>
  );
}
};

export default Dashboard;
