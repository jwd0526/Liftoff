import React from "react";
import "./EndScreen.css";

interface EndProps {
  coins: number;
  height: number;
  visible: boolean;
  startOver: () => void;
}

const EndScreen: React.FC<EndProps> = ({
  coins,
  height,
  visible,
  startOver,
}) => {
  const performance = parseFloat(
    (Math.sqrt(height / 10 - 463.425) / 20 + 1).toFixed(2)
  );
  return (
    <>
      <div
        className="end-container"
        style={visible ? { visibility: "visible" } : { visibility: "hidden" }}>
        <div className="end-menu">
          <div className="end-text-div">
            <h2 className="end-header">Results</h2>
            <div className="end-text">
              <p className="end-label">Max Height:</p>
              <p className="end-value">{(height / 10).toFixed(1)}</p>
            </div>
            <div className="end-text">
              <p className="end-label">Coins Collected:</p>
              <p className="end-value">{coins}</p>
            </div>
            <div className="end-text">
              <p className="end-label">Performance Bonus:</p>
              <p className="end-value">{performance}x</p>
            </div>
            <div className="end-text">
              <p className="end-label">Total Coins:</p>
              <p className="end-value">{(performance * coins).toFixed(2)}</p>
            </div>
          </div>
          <div className="restart-button" onClick={startOver} />
        </div>
      </div>
    </>
  );
};
export default EndScreen;
