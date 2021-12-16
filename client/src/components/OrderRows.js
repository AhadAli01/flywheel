import React from 'react';

const OrderRows = ({ orderInfo, orderImageNum, orderImage }) => {
  return (
    <div>
      {orderImageNum === 1 ? (
        <td>
          <img src={orderImage} width={230} height={150} />
          {orderInfo}
        </td>
      ) : (
        <td>{orderInfo}</td>
      )}
    </div>
  );
};

export default OrderRows;
