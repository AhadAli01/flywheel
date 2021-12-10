import axios from 'axios';
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

const data = localStorage.getItem("userData");
const user = JSON.parse(data);

function Comments(props){
    const [allComments, setallComments] = useState({});
    const [Comment, setComment] = useState("");
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    const variable = {
        content: Comment,
        user: user._id,
        vehicle: props.vehicle
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/vehicles/saveComment', variable)
        .then(response=> {
            if (response.data.errMessage) {
                alert(response.data.errMessage);
              } else {
                if (response.data.successMessage) {
                alert("commented!")
                setComment("")
                props.refreshFunction(response.data.result)
                setallComments(allComments.concat(response.data.result))
                }
              }
        })
    }
    return (
        <div>
            <br />
            <p> Comments</p>
            <hr />
            {/* Comment Lists*/}
            {console.log(allComments)}

            {/* Root Comment Form*/}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <input
                    style={{width:'100%', boderRadius: '5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write a comment"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>

            </form>
        </div>
    )
}

export default Comments