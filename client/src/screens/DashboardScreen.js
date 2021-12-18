import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Table } from 'react-bootstrap';
import OrderRows from '../components/OrderRows';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ auth }) => {
  const data = localStorage.getItem('userData');
  const user = JSON.parse(data);
  const [profile, setProfile] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (auth == 0) {
      history.push('/login');
      return;
    }

    const createOrders = async () => {
      await axios.post('api/auctions/createorder');
    };

    const getOrders = async () => {
      const { data } = await axios.get(`/api/auctions/${user._id}/getorders`);
      setOrders(data);
      // console.log(orders);
    };

    const getProfile = async () => {
      const { data } = await axios.get(`/api/users/profile/${user._id}`);
      setNewPhone(data.phone);
      setNewAddress(data.address);
    };

    const fetchAdmin = async () => {
      const { data } = await axios.get(`/api/users/admin/${user._id}`);
      await setAdmin(data);
      //console.log(allComments);
    };

    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/users`);
      await setUsers(data);
    };

    const fetchOrders = async () => {
      const { data } = await axios.get(`/api/auctions/orders`);
      await setOrders(data);
    };

    
    createOrders();
    getProfile();
    fetchUsers();
    
    if (user.isAdmin === true) {
      // adminPost();
      fetchAdmin();
      fetchOrders();
    } else {
      getOrders();
    }
  }, []);

  const history = useHistory();

  if (auth === 0) {
    return <Redirect to='/login' />;
  } else {
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
          config
        );
        alert('Profile updated');
        sessionStorage.setItem('profileData', JSON.stringify(data));

        const getProfile = async () => {
          const { data } = await axios.get(`/api/users/profile/${user._id}`);
          setNewPhone(data.phone);
          setNewAddress(data.address);
        };

        getProfile();

        window.location.reload();
      } catch (err) {
        alert(err.response.data.message);
      }
    };

    return (
      <div className='App'>
        <Row>
          <Col md={3} lg={4} xl={4} style={{ paddingBottom: '30px' }}></Col>
          <Col>
            {user.isAdmin ? (
              <>
              <h2 style={{ paddingLeft: '75px' }} >Admin</h2>
              {/* <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>Name:{admin.name}</th>
                <th>Phone: {admin.phone}</th>
                <th>Address: {admin.address}</th>
                <th>Position: {admin.position}</th>
                <th>Office Location: {admin.officeLoc}</th>
                </tr>
              </thead>
              </Table> */}
              <Form style={{ paddingBottom: '30px' }}>
                  <input
                    className='parbirInputs'
                    type='name'
                    value={admin.name}
                    readOnly
                  />
                  <input
                    className='parbirInputs'
                    type='phone'
                    name='phone'
                    value={admin.phone}
                    placeholder='No Phone'
                    readOnly
                  />
                  <input
                    className='parbirInputs'
                    type='address'
                    value={admin.address}
                    placeholder='Enter Address'
                  />
                  <input
                    className='parbirInputs'
                    type='officeLoc'
                    name='officeLoc'
                    value={admin.officeLoc}
                    readOnly
                  />
                  <input
                    className='parbirInputs'
                    type='position'
                    name='position'
                    value={admin.position}
                    readOnly
                  />
                </Form>
              </>
            ) : (
              <>
                <h3>User Profile</h3>
                <Form onSubmit={update}>
                  <input
                    className='parbirInputs'
                    type='name'
                    onChange={(event) => {
                      setNewName(event.target.value);
                    }}
                    value={user.name}
                    readOnly
                  />
                  <input
                    className='parbirInputs'
                    type='email'
                    name='email'
                    onChange={(event) => {
                      setNewEmail(event.target.value);
                    }}
                    value={user.email}
                    readOnly
                  />
                  <input
                    className='parbirInputs'
                    type='phone'
                    name='phone'
                    value={newPhone}
                    onChange={(event) => {
                      setNewPhone(event.target.value);
                    }}
                    placeholder='Enter phone number'
                  />
                  <input
                    className='parbirInputs'
                    type='address'
                    value={newAddress}
                    onChange={(event) => {
                      setNewAddress(event.target.value);
                    }}
                    placeholder='Enter Address'
                  />
                  <button
                    className='parbirButton'
                    type='submit'
                    onClick={update}
                  >
                    Update
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ paddingBottom: '30px' }}>
            <h2>Orders</h2>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Vehicle Name/Image</th>
                  <th>Seller Name</th>
                  <th>Buyer Name</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Paid Date</th>
                  <th>Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  // console.log(order);
                  <tr>
                    <td>
                      <Col xl={12}>
                        <OrderRows
                          orderInfo={
                            order.purchasedVehicle.make +
                            ' ' +
                            order.purchasedVehicle.model
                          }
                          orderImageNum={1}
                          orderImage={order.purchasedVehicle.image}
                        />
                      </Col>
                    </td>
                    <td>
                      <Col xl={12}>
                        <OrderRows orderInfo={order.seller.name} />
                      </Col>
                    </td>
                    <td>
                      <Col xl={12}>
                        <OrderRows orderInfo={order.buyer.name} />
                      </Col>
                    </td>
                    <td>
                      <Col xl={12}>
                        <OrderRows orderInfo={order.price + order.fee} />
                      </Col>
                    </td>
                    <td>
                      <Col xl={12}>
                        <OrderRows orderInfo={order.paymentMethod} />
                      </Col>
                    </td>
                    <td>
                      <Col xl={12}>
                        <OrderRows orderInfo={order.paidDate} />
                      </Col>
                    </td>
                    <td>
                      <Col xl={12}>
                        <OrderRows orderInfo={order.deliveryDate} />
                      </Col>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
        <Col md={12} style={{ paddingBottom: '30px' }}>
          {user.isAdmin ? (
            <>
              <h3>Users</h3>
              <div> 
              <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr>
                    <td>
                    <Col>
                      <p>{user.name}</p>
                      </Col>
                      </td>
                      <td>
                      <Col>
                      <p>{user.email}</p>
                    </Col>
                    </td>
                    </tr>
                ))}
              </tbody>
              </Table>
              </div>
            </>
          ) : (
            <></>
          )}
          </Col>
        </Row>
      </div>
    );
  }
};

export default Dashboard;
