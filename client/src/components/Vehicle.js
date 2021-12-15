import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Vehicle = ({ auctionId, vehicle, auctionPrice, auctionStatus}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/auction/${auctionId}`}>
        <Card.Img
          src={vehicle.image}
          variant='top'
          className='equalImg'
        ></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/auction/${auctionId}`}>
          <Card.Title as='div'>
            <strong>
              {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            </strong>
          </Card.Title>
        </Link>

        {/* For below have to get rating from  Review (stars) and num reviews (the 4.5 and 15)*/}
        <Card.Text as='div'>
          {/* value in line below not used */}
          <Rating value={4.5} text={`${vehicle.numComments} comments`} />
        </Card.Text>

        <Card.Text as='div'>
          <div className='my-3'>{`Mileage: ${vehicle.kms}`}</div>
        </Card.Text>

        {/* For below have to get price from Auction (bid amount)*/}
        <Card.Text as='h3' className='price'>
          ${auctionPrice}
        </Card.Text>

        {auctionStatus ? 
        (<Card.Text as='h5'>
        {'Expired'}
        </Card.Text>) : 
        (<Card.Text as='h5'>
        {'Active'}
        </Card.Text>) 
        }

      </Card.Body>
    </Card>
  );
};

export default Vehicle;
