import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HelloWorld from "./artifacts/HelloWorld.json";
import Migrations from "./artifacts/Migrations.json";
import { Drizzle } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
const drizzleOptions = {
  contracts: [HelloWorld, Migrations],
};

const drizzle = new Drizzle(drizzleOptions);

export default function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </Router>
    </DrizzleContext.Provider>
  );
}
