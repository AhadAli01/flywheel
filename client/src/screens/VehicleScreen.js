import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const VehicleScreen = ({ match }) => {
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    const fetchVehicle = async () => {
      const { data } = await axios.get(`/api/vehicles/${match.params.id}`);

      setVehicle(data);
    };

    fetchVehicle();
  }, [match]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={vehicle.image}
            alt={vehicle.make}
            className='equalImgVehicle'
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={4.5} text={`${15} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${10000}</ListGroup.Item>
            <ListGroup.Item>
              Description:{' '}
              {`TBD: Can add a description attribute or just list all remaining attributes`}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Auction Price:</Col>
                  <Col>
                    <strong>${10000}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {/* (TBD) Will have to add isSold attribute to check if sold or not */}
                    {true ? 'In Auction' : 'Sold'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* Check if sold and replace false */}
                <Button className='w-100' type='button' disabled={false}>
                  Make a Bid
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VehicleScreen;
