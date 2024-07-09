import React from 'react';
import '../../App.css';

const NewsTicker = ({ newsItems }) => {
  return (
    <div className="news-ticker-container">
      <div className="news-update-container text-white font-bold p-4 flex items-center justify-center border-t-8 border-b-2">
        News Update
      </div>
      <div className="ticker-container flex-1 flex items-center bg-white overflow-hidden">
        <div className="ticker-wrap flex flex-nowrap">
          <div className="ticker-move flex">
            {newsItems.map((item, index) => (
              <div key={index} className="ticker-item px-4 py-2 whitespace-nowrap overflow-hidden">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
