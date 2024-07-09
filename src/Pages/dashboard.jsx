import React, { useState, useContext, useEffect } from "react";
import { RiMenu2Fill, RiNotification3Fill } from "react-icons/ri";
import BitCoinCard from "../Components/BitCoin";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import CardItem from "../Components/Cards/card";
import Table from "../Components/Table/table";
import NewsTicker from "../Components/Ticker/NewsTicker";
import { AppContext, AppProvider } from "../contextApi/useContext";
import { getProducts } from "../Api/product";
const Dashboard = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { data, setData, selectedValue, setSelectedValue } =
    useContext(AppContext);
  const prices = [
    "Bitcoin: $30,000",
    "Bitcoin: $30,100",
    "Bitcoin: $30,200",
    "Bitcoin: $30,300",
    "Bitcoin: $30,300",
    "Bitcoin: $30,300",
    "Bitcoin: $30,300",
    "Bitcoin: $30,300",
    "Bitcoin: $30,300",
    // Add more prices as needed
  ];
  const getProduct = async () => {
    const product = await getProducts();
    setData(product.products);
  };
  useEffect(() => {
    getProduct();
  }, [currentPage]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDashboard = () => {
    setDashboardOpen(!dashboardOpen);
  };

  const toggleMessages = () => {
    setMessagesOpen(!messagesOpen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  const closeModel = (e) => {
    if (e.target.id === "crud-modal") {
      setIsOpenModal(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  };

  const toggleModel = () => {
    setIsOpenModal(!isOpenModal);
  };
  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  const newsItems = [
    "      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos nihil maxime aliquam voluptates, iste molestiae quidem minus perferendis aliquid, inventore sint facere excepturi eum illum. Cum explicabo quas itaque? Reiciendis?",
  ];

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleDashboard={toggleDashboard}
          toggleSidebar={toggleSidebar}
          toggleMessages={toggleMessages}
          toggleSettings={toggleSettings}
          dashboardOpen={dashboardOpen}
          messagesOpen={messagesOpen}
          settingsOpen={settingsOpen}
        />

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Header
            toggleSidebar={toggleSidebar}
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBar}
          />

          {/* News Ticker */}
          <div
            className="mx-5"
            style={{ marginTop: "40px", marginBottom: "50px" }}
          >
            {" "}
            <NewsTicker newsItems={newsItems} />
          </div>
          {/* <NewsTicker newsItems={newsItems} /> */}
          <BitCoinCard prices={prices} />
          <CardItem />
          <div className="p-4">
            <Table data={data} />
          </div>

          {/* Main content area */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
