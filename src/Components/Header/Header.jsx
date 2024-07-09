// Header.js

import React, { useEffect,useState,useContext } from "react";
import { AppContext } from "../../contextApi/useContext";
import { RiMenu2Fill, RiNotification3Fill } from "react-icons/ri";
import "../../App.css";
import { messaging } from "../../Config";
import { getToken } from "firebase/messaging";
const Header = ({ toggleSidebar, showSearchBar, setShowSearchBar }) => {
  const {setFcmToken,fcmToken}=useContext(AppContext)
  const vapidKey =
    "BNOTYe9nrHaG0IuyROd2PHxnaQ_yU6CS9Q20PbfpIe-hBsb_m7sR5h-eL16-d_J4HQJSp5GkcsLQL82bLsNR7Ws";
  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey });
        // console.log(token, "fcm Token");
        setFcmToken(token)
      } else {
        alert("unable to get permission to notify");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div
      className="flex items-center justify-between h-16 bg-white border-b border-gray-200"
      style={{ padding: "24px" }}
    >
      {/* Toggle button for small screens */}
      <button
        className="text-gray-500 h-6 w-6 ml-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <RiMenu2Fill />
      </button>
      {/* Logo or Search input */}
      {showSearchBar ? (
        <div className="relative flex items-center px-4">
          <input
            className="w-full px-4 py-2 pl-10 focus:outline-none bg-gray-200 rounded-full"
            type="text"
            placeholder="Search"
          />
          <svg
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35"
            />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </div>
      ) : (
        <img src="../../Assets/logo.png" alt="Logo" className="h-8 ml-4" />
      )}
      <div className="flex items-center pr-4">
        <RiNotification3Fill className="text-gray-500 h-6 w-6" />
      </div>
    </div>
  );
};

export default Header;
