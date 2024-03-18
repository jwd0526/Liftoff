import React from "react";
import "./LevelMenu.css";

interface EndProps {
  coins: number;
  height: number;
}

const EndScreen: React.FC<EndProps> = ({ coins, height }) => {
  return (
    <>
      <div className="end-container">
        <div className="end-menu">
          <div className="restart-button"></div>
        </div>
      </div>
    </>
  );
};
export default EndScreen;
