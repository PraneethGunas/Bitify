import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { AppContext } from "./AppContext";

const Home = () => {
  // const { AccountData, ContractData, ContractForm } = newContextComponents;
  const { drizzle, drizzleState, user } = React.useContext(AppContext);
  const account = user.id;
  const balance = drizzleState.accountBalances[account];
  return (
    <div>
      <h3>Account ID: {account}</h3>
      <h4>Balance: {balance}</h4>
    </div>
  );
};
export default Home;
