import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const data = localStorage.getItem('userData');
const user = JSON.parse(data);

function AllComments(myComments) {
    //console.log(myComments.allComment.content);

    return (
        <div style={{ boarderBottom: '2px solid black' }}>
            <h1 style={{ fontSize: 15, paddingTop: 50 }}>
                {`${myComments.allComment.name}`}
            </h1>
            <strong>
              {`${myComments.allComment.content}`}
            </strong>
        </div>
    )
}

export default AllComments;
