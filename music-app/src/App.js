import React from "react";
import Routes from "./Pages/Route";
import HelloWorld from "./artifacts/HelloWorld.json";
import Migrations from "./artifacts/Migrations.json";
import { Drizzle } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import { AppProvider } from "./Pages/AppContext";
import "../src/App.css";

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
