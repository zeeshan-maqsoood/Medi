import React, { useState, createContext, useContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState();
  const [selectedValue,setSelectedValue]=useState()
  const [fcmToken,setFcmToken]=useState()

  return (
    <AppContext.Provider value={{ data, setData,selectedValue,setSelectedValue,fcmToken,setFcmToken }}>
      {children}
    </AppContext.Provider>
  );
};
export {AppProvider}
