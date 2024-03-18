import React, { useEffect, useRef, useState } from "react";
import "./Coin.css";

interface CoinProps {
  leftVal: number;
  velocity: number;
}

const Coin: React.FC<CoinProps> = ({ leftVal, velocity }) => {
  const coinRef = useRef<HTMLDivElement>(null);
  const coinBoxRef = useRef<HTMLDivElement>(null);
  const [topVal, setTopVal] = useState<number>(-1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const rocketImage = document.getElementById("rockImg");
      if (
        !rocketImage?.classList.contains("rocket-inactive") &&
        !coinBoxRef.current?.classList.contains("collected-coin")
      ) {
        setTopVal((prevTopVal) => prevTopVal + velocity);
        if (topVal > 2000 && coinRef.current) {
          coinRef.current.remove();
        }
      }
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, [topVal, velocity]);

  return (
    <div
      className="coin-container"
      ref={coinRef}
      style={{ marginLeft: `${leftVal}vw` }}>
      <div
        ref={coinBoxRef}
        className="coin-box"
        style={{ top: `${topVal}px` }}
      />
      <div
        className="indicator"
        style={{ bottom: `${topVal > -20 ? -100 : 92}%` }}
      />
    </div>
  );
};

export default Coin;
