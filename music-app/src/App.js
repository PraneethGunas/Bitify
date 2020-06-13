import React from "react";
import Routes from "./Pages/Route";
import HelloWorld from "./artifacts/HelloWorld.json";
import Collector from "./artifacts/Collector.json";
import Migrations from "./artifacts/Migrations.json";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import { AppProvider } from "./Pages/AppContext";
import "../src/App.css";

const drizzleOptions = {
  contracts: [HelloWorld, Collector, Migrations],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};
const drizzle = new Drizzle(drizzleOptions);

export default function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return "Loading...";
          }
          return (
            <AppProvider drizzle={drizzle} drizzleState={drizzleState}>
              <Routes />
            </AppProvider>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}
