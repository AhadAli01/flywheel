import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const SellVehicle = ({ match, history }) => {
  const productId = match.params.id;

  // Vehicles - General
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [bodyStyle, setBodyStyle] = useState('');
  const [kms, setKms] = useState(0);
  const [engineType, setEngineType] = useState('');
  const [transType, setTransType] = useState('');
  const [powertrain, setPowertrain] = useState('');
  const [year, setYear] = useState(0);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);

  // Sedan
  const [noOfDoors, setNoOfDoors] = useState(0);
  const [length, setLength] = useState(0);

  // SUV
  const [trunkSize, setTrunkSize] = useState(0);

  // Van
  const [noOfSeats, setNoOfSeats] = useState(0);

  // Truck
  const [towCapacity, setTowCapacity] = useState(0);
  const [bedWeightCapacity, setBedWeightCapacity] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userData'));
    const user = userInfo._id;
    const vehicle = {
      // _id - autogenerated
      user,
      make,
      model,
      bodyStyle,
      kms,
      engineType,
      transType,
      powertrain,
      year,
      image,
      isSold: false,
      rating: 0,
      numReviews: 0,
      price,
      reviews: [],
    };
    console.log(vehicle);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`/api/vehicles`, vehicle, config);
      console.log(data);
      await addTypeOfVehicle(e, data._id);
      await addAuction(e, user, data._id, data.price);
      alert('Vehicle added successfully!');
      history.push('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const addAuction = async (e, seller, vehicle, bidPrice) => {
    const auction = {
      seller,
      vehicle,
      bidPrice,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { auctionData } = await axios.post(
        `/api/auctions`,
        auction,
        config
      );
      console.log(auctionData);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const addTypeOfVehicle = async (e, vehicle) => {
    if (bodyStyle.toLowerCase() === 'sedan') {
      const sedan = {
        vehicle,
        noOfDoors,
        length,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const { data } = await axios.post(`/api/vehicles/sedan`, sedan, config);
        console.log(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    } else if (bodyStyle.toLowerCase() === 'suv') {
      const suv = {
        vehicle,
        trunkSize,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const { data } = await axios.post(`/api/vehicles/suv`, suv, config);
        console.log(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    } else if (bodyStyle.toLowerCase() === 'van') {
      const van = {
        vehicle,
        noOfSeats,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const { data } = await axios.post(`/api/vehicles/van`, van, config);
        console.log(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    } else if (bodyStyle.toLowerCase() === 'truck') {
      const truck = {
        vehicle,
        towCapacity,
        bedWeightCapacity,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const { data } = await axios.post(`/api/vehicles/truck`, truck, config);
        console.log(data);
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Sell A Vehicle</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='make'>
            <Form.Label>Make</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter make'
              value={make}
              onChange={(e) => setMake(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='model'>
            <Form.Label>Model</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter model'
              value={model}
              onChange={(e) => setModel(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='kms'>
            <Form.Label>KMS (Mileage)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter kms (mileage)'
              value={kms}
              onChange={(e) => setKms(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='engineType'>
            <Form.Label>Engine Type</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter engine type'
              value={engineType}
              onChange={(e) => setEngineType(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='transType'>
            <Form.Label>Trans Type</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter trans type'
              value={transType}
              onChange={(e) => setTransType(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='powertrain'>
            <Form.Label>Powertrain</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter power train'
              value={powertrain}
              onChange={(e) => setPowertrain(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='year'>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter year'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Initial Bid Price ($CAD)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='bodyStyle'>
            <Form.Label>Body Style</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter body style (ex. sedan, SUV, truck, van)'
              value={bodyStyle}
              onChange={(e) => setBodyStyle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {bodyStyle.toLowerCase() === 'sedan' ? (
            <>
              <Form.Group controlId='noOfDoors'>
                <Form.Label>Number of Doors</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter number of doors'
                  value={noOfDoors}
                  onChange={(e) => setNoOfDoors(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='length'>
                <Form.Label>Length</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter length'
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          ) : bodyStyle.toLowerCase() === 'suv' ? (
            <>
              <Form.Group controlId='trunkSize'>
                <Form.Label>Trunk Size</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter trunk size'
                  value={trunkSize}
                  onChange={(e) => setTrunkSize(e.target.value)}
                ></Form.Control>{' '}
              </Form.Group>
            </>
          ) : bodyStyle.toLowerCase() === 'van' ? (
            <>
              <Form.Group controlId='noOfSeats'>
                <Form.Label>Number of Seats</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter number of seats'
                  value={noOfSeats}
                  onChange={(e) => setNoOfSeats(e.target.value)}
                ></Form.Control>{' '}
              </Form.Group>
            </>
          ) : bodyStyle.toLowerCase() === 'truck' ? (
            <>
              <Form.Group controlId='towCapacity'>
                <Form.Label>Tow Capacity</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter tow capacity'
                  value={towCapacity}
                  onChange={(e) => setTowCapacity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='bedWeightCapacity'>
                <Form.Label>Bed Weight Capacity</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter bed weight capacity'
                  value={bedWeightCapacity}
                  onChange={(e) => setBedWeightCapacity(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          ) : (
            <h5 className='pt-3 text-danger'> * Please list body style * </h5>
          )}

          <Button type='submit' variant='primary' className='my-5'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default SellVehicle;
