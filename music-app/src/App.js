import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";
=======
import Routes from "./Pages/Route";
>>>>>>> ed782e11265141508c061576d79184d29eee61ef
import HelloWorld from "./artifacts/HelloWorld.json";
import Migrations from "./artifacts/Migrations.json";
import { Drizzle } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import { AppProvider } from "./Pages/AppContext";

const drizzleOptions = {
  contracts: [HelloWorld, Migrations],
};
const drizzle = new Drizzle(drizzleOptions);
export default function App() {
  return (
    <AppProvider>
      <DrizzleContext.Provider drizzle={drizzle}>
        <Routes />
      </DrizzleContext.Provider>
    </AppProvider>
  );
}
