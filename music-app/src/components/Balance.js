import React from "react";
import eth from "../../src/assests/eth.png";
import Web3 from "web3";

const Balance = ({ balance }) => {
  return (
    <div className="balance">
      <div className="amount">
        <p>
          {Number(Web3.utils.fromWei(balance, "ether")).toFixed(2).toString()}
        </p>
      </div>
      <div className="img">
        <img src={eth}></img>
      </div>
    </div>
  );
};

export default Balance;
