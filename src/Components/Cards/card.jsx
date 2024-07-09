import React from "react";
import { FaBitcoin } from "react-icons/fa";
import graphImage from "../../Assets/th.jfif"; // Replace with your graph image import

const Card = ({ icon, rate, coinName }) => (
  <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
    <div className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <div className="mr-4">{icon}</div>
          <div className="text-center flex-1">
            <div className=" text-1xl">{rate}</div>
            <div className="font-bold text-gray-700">{coinName}</div>
          </div>
        </div>
        <img
          src={graphImage}
          alt="graph"
          className="w-full h-auto"
          style={{ height: "80px" }}
        />
      </div>
    </div>
  </div>
);

const CardItem = () => {
  // Sample data array containing objects for each card
  const cardData = [
    {
      icon: <FaBitcoin className="text-6xl text-yellow-500" />,
      rate: "1 BTC = $4.50",
      coinName: "Bitcoin",
    },
    {
      icon: <FaBitcoin className="text-6xl text-yellow-500" />,
      rate: "1 BTC = $4.55",
      coinName: "Ethereum",
    },
    {
      icon: <FaBitcoin className="text-6xl text-yellow-500" />,
      rate: "1 BTC = $4.60",
      coinName: "Litecoin",
    },
    {
      icon: <FaBitcoin className="text-6xl text-yellow-500" />,
      rate: "1 BTC = $4.65",
      coinName: "Ripple",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {/* Map through the cardData array to render Card components */}
      {cardData.map((card, index) => (
        <Card
          key={index}
          icon={card.icon}
          rate={card.rate}
          coinName={card.coinName}
        />
      ))}
    </div>
  );
};

export default CardItem;
