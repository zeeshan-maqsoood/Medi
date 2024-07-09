// Sidebar.js

import React from "react";
import { RiMenu2Fill, RiNotification3Fill } from "react-icons/ri";
import "../../App.css";
import { Menu } from "../../Constants/constants";
const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleDashboard,
  toggleMessages,
  toggleSettings,
  dashboardOpen,
  messagesOpen,
  settingsOpen,
}) => {
  const handleToggle = (name) => {
    switch (name) {
      case "Dashboard":
        toggleDashboard();
        break;
      case "Messages":
        toggleMessages();
        break;
      case "Settings":
        toggleSettings();
        break;
      default:
        break;
    }
  };

  const isOpen = (name) => {
    switch (name) {
      case "Dashboard":
        return dashboardOpen;
      case "Messages":
        return messagesOpen;
      case "Settings":
        return settingsOpen;
      default:
        return false;
    }
  };

  return (
    <div className={`sidebar-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <button
          className="text-white h-6 w-6 ml-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <RiMenu2Fill />
        </button>
        <span className="text-white font-bold uppercase px-4">Sidebar</span>
        <RiNotification3Fill className="text-white h-6 w-6 mr-4" />
      </div>
      <nav className="sidebar-nav">
        {Menu.map((menuItem, index) => (
          <div key={index}>
            <a
              href="#"
              className="sidebar-menu-item"
              onClick={() => handleToggle(menuItem.name)}
            >
              {menuItem.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ml-auto ${
                  isOpen(menuItem.name) ? "transform rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen(menuItem.name) ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </a>
            <div
              className={`sidebar-submenu ${
                isOpen(menuItem.name) ? "" : "hidden"
              }`}
            >
              {menuItem.submenus.map((submenu, subIndex) => (
                <a
                  key={subIndex}
                  href={submenu.link}
                  className="sidebar-submenu-item"
                >
                  {submenu.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
