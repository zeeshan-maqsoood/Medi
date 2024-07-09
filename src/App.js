import React, { useState } from "react";
import { AppProvider } from "./contextApi/useContext";

import Dashboard from "./Pages/dashboard";
const App = () => {
  return (
    <>
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </>
  );
};

export default App;
