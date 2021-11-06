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
        {vehicles.map((vehicle) => (
          <Col key={vehicle._id} sm={12} md={6} lg={4} xl={3}>
            <Vehicle vehicle={vehicle} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
