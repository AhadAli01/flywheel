import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const data = localStorage.getItem('userData');
const user = JSON.parse(data);

function AllComments(myComments) {
    return (
        <div>
            <h1 style={{ fontSize: 20 }}>
                {user.name}
            </h1>
            <p>
                {/* {myComments}  */}
            </p>
        </div>
    )
}

export default AllComments;
