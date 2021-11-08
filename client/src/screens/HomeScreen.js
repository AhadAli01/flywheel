import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Vehicle from '../components/Vehicle';

const HomeScreen = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await axios.get('/api/vehicles');

      setVehicles(data);
    };

    fetchVehicles();
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
        <Col xl={3}>
          <h3 className='d-flex justify-content-center'>Watchlist</h3>
          <Row>
            {vehicles.map((vehicle) => (
              <Col key={vehicle._id} xl={12}>
                <Vehicle vehicle={vehicle} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
