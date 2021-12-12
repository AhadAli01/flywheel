import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Comments from "../components/Comments";
import Message from '../components/Message';
import axios from 'axios';

const VehicleScreen = ({ match }) => {
  //const [vehicle, setVehicle] = useState({});
  const [auction, setAuction] = useState({});
  const [vehicle, setVehicle] = useState({});


  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    // const fetchVehicle = async () => {
    //   const { data } = await axios.get(`/api/vehicles/${match.params.id}`);

    //   setVehicle(data);
    // };

    const fetchAuction = async () => {
      const { data } = await axios.get(`/api/auctions/${match.params.id}`);

      setAuction(data);
      setVehicle(data.vehicle);
    };

    fetchAuction();
  }, [match]);

  const addWatchlistHandler = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(auction);
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    console.log(userInfo);
    console.log(userInfo._id);
    try {
      const { data } = await axios.post(
        `/api/users/${userInfo._id}/watchlist`,
        vehicle,
        config
      );
      console.log(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }

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
            {/* value in line below not used */}
              <Rating value={4.5} text={`${vehicle.numComments} comments`} />  
            </ListGroup.Item>
            <ListGroup.Item>Price: ${vehicle.price}</ListGroup.Item>
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
                    <strong>${vehicle.price}</strong>
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
              <ListGroup.Item>
                <Button
                  className='w-100'
                  type='button'
                  disabled={false}
                  onClick={addWatchlistHandler}
                >
                  Add to Watchlist
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
            <Col md={6}>
              {/* <h2>Comments</h2>
               {vehicle.comments.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'></ListGroup>
              {vehicle.comments.map((comment) => (
                <ListGroup.Item key={comment._id}>
                <strong>{comment.name}</strong>
                <p>{comment.createdAt.substring(0, 10)}</p>
                <p>{comment.comment}</p>
                </ListGroup.Item>
              ))} 
              <ListGroup.Item>
                <h2>Write a Comment</h2>
              </ListGroup.Item> */}
              <Comments CommentLists={CommentLists} vehicle={vehicle._id} refreshFunction={updateComment} />
            </Col>
          </Row>
    </>
  );
};

export default VehicleScreen;
