import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Vehicle = ({ vehicle }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/vehicle/${vehicle._id}`}>
        <Card.Img
          src={vehicle.image}
          variant='top'
          className='equalImg'
        ></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/vehicle/${vehicle._id}`}>
          <Card.Title as='div'>
            <strong>
              {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            </strong>
          </Card.Title>
        </Link>

        {/* For below have to get rating from  Review (stars) and num reviews (the 4.5 and 15)*/}
        <Card.Text as='div'>
          <Rating value={4.5} text={`${15} reviews`} />
        </Card.Text>

        <Card.Text as='div'>
          <div className='my-3'>{`Mileage: ${vehicle.kms}`}</div>
        </Card.Text>

        {/* For below have to get price from Auction (bid amount)*/}
        <Card.Text as='h3' className='price'>
          ${10000}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Vehicle;