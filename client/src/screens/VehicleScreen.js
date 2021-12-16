import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Comments from "../components/Comments";
import AllComments from "../components/AllComments";
import Message from '../components/Message';
import axios from 'axios';

const VehicleScreen = ({ match }) => {
  //const [vehicle, setVehicle] = useState({});
  const [auction, setAuction] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [bidAmount, setBidAmount] = useState(0);

  const [allComments, setAllComments] = useState([]);



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

    const fetchComments = async () => {
      const { data } = await axios.get('/api/vehicles/comments');
      setAllComments(data);
    };

    fetchComments();
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
    if (userInfo) {
      console.log(userInfo);
      console.log(userInfo._id);
    } else {
      alert('Please login');
      return(<Redirect to = "/login"/>);
    }
    try {
      const { data } = await axios.post(
        `/api/users/${userInfo._id}/watchlist`,
        auction,
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

  const updatePriceHandler = async () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    try {
      await axios.post("/api/auctions/updateprice", {auctionID: auction._id, user: user._id, bidAmount: bidAmount}).then((response) => {
        if (response.data.successMessage) {
          alert(response.data.successMessage);
          window.location.reload();
        } else {
          if (response.data.errMessage) {
            alert(response.data.errMessage);
          }
        }
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  }; 

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
            <ListGroup.Item>Price: ${auction.bidPrice}</ListGroup.Item>
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
                    <strong>${auction.bidPrice}</strong>
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
                <input className="inputs" type="bidAmount" placeholder='Enter Your Bid Here!' onChange={(event) => {
                setBidAmount(event.target.value);
                }}/>
                {/* Check if sold and replace false */}
                <Button className='w-100' type='button' disabled={false} onClick={updatePriceHandler}>
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
            <Comments vehicle={vehicle._id}/>
            {allComments.map((myComments) => (
              <AllComments allComment={myComments} />
            ))}    
            </Col> 
          </Row>
    </>
  );
};

export default VehicleScreen;
