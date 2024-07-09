import { FaBitcoin } from "react-icons/fa";
import Draggable from "react-draggable";
const BitcoinCard = ({ prices }) => {
  return (
    <div
      className="flex items-center mt-0 bg-white overflow-hidden"
      style={{
        padding: "30px",
        width: "96%",
        marginBottom: "20px",
        marginLeft: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Draggable axis="x">
        <div className="ticker-wrap flex">
          {prices.map((item, index) => (
            <div
              key={index}
              className="ticker-item px-4 py-2 flex-shrink-0 flex items-center justify-center   rounded-md mx-2"
            >
              <FaBitcoin className="text-yellow-500 text-2xl mr-2 cursor-move" />
              <span className="text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </Draggable>
    </div>
  );
};

export default BitcoinCard;
