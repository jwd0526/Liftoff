import React, { useEffect, useRef, useState } from "react";
import "./Coin.css";

interface CoinProps {
  leftVal: number;
  velocity: number;
}

const Coin: React.FC<CoinProps> = ({ leftVal, velocity }) => {
  const coinRef = useRef<HTMLDivElement>(null);
  const [topVal, setTopVal] = useState<number>(-5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopVal((prevTopVal) => prevTopVal + velocity);
      if (topVal > 2000 && coinRef.current) {
        coinRef.current.remove();
      }
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, [topVal, velocity]);

  return (
    <div className="coin-container" ref={coinRef}>
      <div
        className="coin-box"
        style={{ marginLeft: `${leftVal}vw`, top: `${topVal}px` }}
      />
    </div>
  );
};

export default Coin;
