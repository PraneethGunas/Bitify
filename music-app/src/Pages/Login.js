import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

const db = firestore;
const Login = () => {
  const [walletID, setWalletID] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const signInWithwalletIDAndusernameHandler = async (
    event,
    walletID,
    username
  ) => {
    try {
      event.preventDefault();
      const docRef = await db.collection("users").doc(walletID);
      const user = await docRef.get();
      if (user.exists) {
        console.log("User Exists");
      } else {
        console.log("No user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "walletid") {
      setWalletID(value);
    } else if (name === "username") {
      setUsername(value);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="walletid" className="block">
            Wallet ID
          </label>
          <input
            type="text"
            name="walletid"
            value={walletID}
            placeholder="Wallet ID"
            id="walletid"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="username" className="block">
            Name
          </label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Your usename"
            id="username"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            onClick={(event) => {
              signInWithwalletIDAndusernameHandler(event, walletID, username);
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
