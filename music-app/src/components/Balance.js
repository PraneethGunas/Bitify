import React from "react";
import eth from "../../src/assests/eth.png";

const Balance = () => {
  return (
    <div className="balance">
      <div className="amount">
        <p>989.99</p>
      </div>
      <div className="img">
        <img src={eth}></img>
      </div>
    </div>
  );
};

export default Balance;
