import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const SellVehicle = ({ match, history }) => {
  const productId = match.params.id;

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

  // useEffect(() => {}, []);

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
    } catch (err) {
      alert(err.response.data.message);
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

          <Form.Group controlId='bodyStyle'>
            <Form.Label>Body Style</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter body style (ex. sedan, SUV, truck, van)'
              value={bodyStyle}
              onChange={(e) => setBodyStyle(e.target.value)}
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

          <Button type='submit' variant='primary' className='my-5'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default SellVehicle;
