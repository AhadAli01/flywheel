import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Vehicle from '../components/Vehicle';

const HomeScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [watchlistV, setWatchlistV] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await axios.get('/api/vehicles');

      setVehicles(data);
    };

    const fetchWatchlist = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userData'));

      const { data } = await axios.get(`/api/users/${userInfo._id}/watchlist`);
      setWatchlistV(data);
    };

    fetchVehicles();
    fetchWatchlist();
    // const data = JSON.parse(localStorage.getItem('userData'));
    // console.log(data);
    // console.log(data._id);
    // console.log(data.name);
  }, []);

  return (
    <>
      <h1>Vehicles</h1>
      <Row>
        <Col xl={9} className='pr-5'>
          <Row>
            {vehicles.map((vehicle) => (
              <Col key={vehicle._id} sm={12} lg={6} xl={4}>
                <Vehicle vehicle={vehicle} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xl={3} style={{ border: '2px solid black' }}>
          <h3 className='d-flex justify-content-center pt-3'>Watchlist</h3>
          <Row>
            {watchlistV.map((wV) => (
              <Col key={wV._id} xl={12}>
                <Vehicle vehicle={wV} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
