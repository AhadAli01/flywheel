import React from 'react';

const OrderRows = ({orderInfo, orderImageNum, orderImage}) => {
    return(
        <tbody>
              <tr>
                {orderImageNum === 1 ? 
                (<td><img src={orderImage} width={230} height={150}/>{orderInfo}</td>) : 
                (<td>{orderInfo}</td>)}
              </tr>
        </tbody>
    );
};

export default OrderRows;