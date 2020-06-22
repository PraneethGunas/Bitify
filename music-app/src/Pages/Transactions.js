import React, { useState } from "react";
import { AppContext } from "./AppContext";
import Collector from "../artifacts/Collector.json";
import Web3 from "web3";
import JSONTree from "react-json-tree";
var contract = require("@truffle/contract");
const Transactions = () => {
  const { drizzle, drizzleState, user } = React.useContext(AppContext);
  const collector = contract(Collector);
  const getBalance = async (collector) => {
    // console.log(drizzle, drizzleState);
    collector.setProvider(drizzle.web3.currentProvider.url);
    collector.setNetwork(5777);
    const instance = await collector.deployed();
    web3.eth
      .getBalance("0x0a077Ba13529B6b06Da2B6D0154d2b6A7592530c")
      .then((bal) => {
        setBalance(web3.utils.fromWei(bal));
      });
  };
  const web3 = new Web3("ws://127.0.0.1:7545");
  React.useEffect(() => {
    getBalance(collector);
  }, []);
  const details = () => {
    web3.eth.getBlockNumber().then((res) => {
      setBlock(res);
      web3.eth.getBlock(res).then((res) => setData(res));
    });
  };
  React.useEffect(() => {
    details();
  }, []);
  const [balance, setBalance] = useState("");
  const [blockNumber, setBlock] = useState("");
  const [blockData, setData] = useState({});
  return (
    <div>
      <h2>Transactions</h2>
      <h4>Reward Pool:{balance}</h4>
      <h2>BlockNumber: {blockNumber}</h2>
      <JSONTree
        data={blockData}
        theme={{
          scheme: "monokai",
          base00: "#000000",
          base01: "#383830",
          base02: "#49483e",
          base03: "#75715e",
          base04: "#a59f85",
          base05: "#f8f8f2",
          base06: "#f5f4f1",
          base07: "#f9f8f5",
          base08: "#f92672",
          base09: "#fd971f",
          base0A: "#f4bf75",
          base0B: "#fff",
          base0C: "#a1efe4",
          base0D: "#F48144",
          base0E: "#ae81ff",
          base0F: "#cc6633",
        }}
      />
    </div>
  );
};
export default Transactions;
