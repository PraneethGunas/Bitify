import React, { useState } from "react";
import { AppContext } from "./AppContext";
import Collector from "../artifacts/Collector.json";
import Web3 from "web3";
var contract = require("@truffle/contract");
const Transactions = () => {
  const { drizzle, drizzleState, user } = React.useContext(AppContext);
  const collector = contract(Collector);
  const getBalance = async (collector) => {
    collector.setProvider(drizzle.web3.currentProvider.url);
    collector.setNetwork(5777);
    const instance = await collector.deployed();
    const res = await instance.balance(instance.address);
    const balance = Web3.utils.fromWei(res.toString());
    console.log(balance);
    return balance;
  };
  getBalance(collector).then((bal) => setBalance(bal));
  const [balance, setBalance] = useState("");
  return (
    <div>
      <h2>Transactions</h2>
      <h4>Reward Pool:{balance}</h4>
    </div>
  );
};
export default Transactions;
