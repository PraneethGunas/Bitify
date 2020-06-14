import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Transactions from "./Transactions";
import { useHistory } from "react-router-dom";
export default function Routes() {
  const history = useHistory();
  // React.useEffect(() => {
  //   let user = localStorage.getItem("user");
  //   user = JSON.parse(user);
  //   if (user && user.name) {
  //     alert("asdas");
  //     history.push("/home");
  //   }
  // }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
      </Switch>
    </Router>
  );
}
