import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import AllComments from '../components/AllComments';
import Message from '../components/Message';
import axios from 'axios';

const data = localStorage.getItem('userData');
const user = JSON.parse(data);

const VehicleScreen = ({ match }) => {
  //const [vehicle, setVehicle] = useState({});
  const [auction, setAuction] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [Comment, setComment] = useState('');

  const [bodyStyle, setBodyStyle] = useState('');
  const [sedan, setSedan] = useState({});
  const [suv, setSuv] = useState({});
  const [van, setVan] = useState({});
  const [truck, setTruck] = useState({});

  const [bidAmount, setBidAmount] = useState(0);

  const [allComments, setAllComments] = useState([]);

  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    // const fetchVehicle = async () => {
    //   const { data } = await axios.get(`/api/vehicles/${match.params.id}`);

    //   setVehicle(data);
    // };

    const checkAuctions = async () => {
      await axios.post('/api/auctions/expired');
    };

    const fetchAuction = async () => {
      const { data } = await axios.get(`/api/auctions/${match.params.id}`);

      await setAuction(data);
      await setVehicle(data.vehicle);
      const bStyle = String(data.vehicle.bodyStyle);

      setBodyStyle(bStyle.toLowerCase());
      // console.log(bStyle.toLowerCase());
    };

    // const fetchComments = async () => {
    //   const { data } = await axios.get(`/api/vehicles/comments/${vehicle._id}`);
    //   await setAllComments(data);
    //   //console.log(allComments);
    // };

    checkAuctions();
    fetchAuction();
    //fetchComments();
    // fetchBodyStyle(vehicle._id);
  }, [match]);
  
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`/api/vehicles/comments/${vehicle._id}`);
      await setAllComments(data);
      console.log(allComments);
    };

    const fetchBodyStyle = async (vid) => {
      // console.log(bodyStyle);
      if (bodyStyle === 'sedan') {
        const { data } = await axios.get(`/api/vehicles/sedan/${vid}`);
        setSedan(data);
        // console.log(sedan);
      } else if (bodyStyle === 'suv') {
        const { data } = await axios.get(`/api/vehicles/suv/${vid}`);
        setSuv(data);
      } else if (bodyStyle === 'truck') {
        const { data } = await axios.get(`/api/vehicles/truck/${vid}`);
        setTruck(data);
      } else if (bodyStyle === 'van') {
        const { data } = await axios.get(`/api/vehicles/van/${vid}`);
        setVan(data);
      }
    };
    
    fetchComments();
    fetchBodyStyle(vehicle._id);
  });
  

  

  // fetchBodyStyle(vehicle._id);

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    let variable = {};
    if (user) {
      variable = {
        content: Comment,
        user: user._id,
        name: user.name,
        vehicle: vehicle._id,
      };
    } else {
      alert('Please login');
      return <Redirect to='/login' />;
    }
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        `/api/vehicles/saveComment/${vehicle._id}`,
        variable,
        config
      );
      alert('Comment successfully added!');
      setComment('');
      //await setAllComments(data);
      //window.location.reload();
      //props.refreshFunction(data)
    } catch (err) {
      alert(err.response.data.message);
    }
  };

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
      return <Redirect to='/login' />;
    }
    try {
      const { data } = await axios.post(
        `/api/users/${userInfo._id}/watchlist`,
        auction,
        config
      );
      alert('Successfully added to watchlist');
      console.log(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const updatePriceHandler = async () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      console.log(user);
      console.log(user._id);
    } else {
      alert('Please login');
      return <Redirect to='/login' />;
    }
    try {
      await axios
        .post('/api/auctions/updateprice', {
          auctionID: auction._id,
          user: user._id,
          bidAmount: bidAmount,
        })
        .then((response) => {
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

  vehicle.numComments = allComments.length;
  // console.log(allComments.length);
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
              <Rating value={4.5} text={`${vehicle.numComments} comments`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: $ {auction.bidPrice}</ListGroup.Item>
            <ListGroup.Item>
              Body Style: {vehicle.bodyStyle} <br />
              Mileage/KMS: {vehicle.kms} <br />
              Engine Type: {vehicle.engineType} <br />
              Trans Type: {vehicle.transType} <br />
              PowerTrain: {vehicle.powertrain}
            </ListGroup.Item>
            <ListGroup.Item>
              {bodyStyle === 'sedan' ? (
                <>
                  No. of Doors: {sedan.noOfDoors} <br />
                  Length: {sedan.length} <br />
                </>
              ) : bodyStyle === 'suv' ? (
                <>
                  Trunk Size: {suv.trunkSize} <br />
                </>
              ) : bodyStyle === 'van' ? (
                <>
                  No. of Seats: {van.noOfSeats} <br />
                </>
              ) : bodyStyle === 'truck' ? (
                <>
                  Tow Capacity: {truck.towCapacity} <br />
                  Bedweight Capacity: {truck.bedweightCapacity} <br />
                </>
              ) : (
                <hr />
              )}
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
                    <strong>$ {auction.bidPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{auction.isSold ? 'Sold' : 'In Auction'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <input
                  className='inputs'
                  type='bidAmount'
                  placeholder='Enter Your Bid Here!'
                  onChange={(event) => {
                    setBidAmount(event.target.value);
                  }}
                />
                <Button
                  className='w-100'
                  type='button'
                  disabled={auction.isSold ? true : false}
                  onClick={updatePriceHandler}
                >
                  Make a Bid
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='w-100'
                  type='button'
                  disabled={auction.isSold ? true : false}
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
          <div>
            <br />
            <p> Comments</p>
            <hr />
            {/* Comment Lists*/}

            {/* Root Comment Form*/}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
              <input
                style={{ width: '100%', boderRadius: '5px' }}
                onChange={handleChange}
                value={Comment}
                placeholder='Write a comment'
              />
              <br />
              <Button
                style={{ width: '20%', height: '52px' }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
          {allComments.map((myComments) => (
            <AllComments allComment={myComments} />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default VehicleScreen;
