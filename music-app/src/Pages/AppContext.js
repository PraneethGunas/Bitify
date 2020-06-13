import React, { useState } from "react";

const AppContext = React.createContext({});

const AppProvider = (props) => {
  const { drizzle, drizzleState } = props;
  const [user, setUser] = useState({});
  return (
    <AppContext.Provider value={{ user, setUser, drizzle, drizzleState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
