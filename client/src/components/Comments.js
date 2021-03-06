import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';

const data = localStorage.getItem('userData');
const user = JSON.parse(data);

function Comments(props) {
  //const [allComments, setallComments] = useState({});
  const [Comment, setComment] = useState('');

  const history = useHistory();

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
        vehicle: props.vehicle,
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
        `/api/vehicles/saveComment/${props.vehicle}`,
        variable,
        config
      );
      alert('Comment successfully added!');
      setComment('');
      window.location.reload();
      //props.refreshFunction(data)
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
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
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
