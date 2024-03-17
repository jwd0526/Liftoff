import React, { useState, useEffect, useRef, useCallback } from "react";
import rocketInactive from "../art/rocket-inactive.png";
import playButton from "../art/Buttons/Play_Button_01.png";
import statsPanel from "../art/Buttons/panels/stats-panel.png";
import "./Rocket.css";
import { State, Action } from "../App";
import Coin from "../Coin";
import { doc } from "prettier";

interface RocketProps {
  levelState: State;
  levelDispatch: React.Dispatch<Action>;
}

const MAX_SPEED = 50;
const BACKGROUND_INCREMENT = 2000;

const Rocket: React.FC<RocketProps> = ({ levelState, levelDispatch }) => {
  const acceleration = (levelState.power / 6) * 0.15;

  const [launched, setLaunched] = useState(false);
  const [speed, setSpeed] = useState(5);
  const incrementProgress = useRef(0);
  const [color, setColor] = useState(80);
  const [height, setHeight] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [horizontalPosition, setHorizontalPosition] = useState<number>(47);
  const [movingLeft, setMovingLeft] = useState<boolean>(false);
  const [movingRight, setMovingRight] = useState<boolean>(false);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const [coins, setCoins] = useState<{ leftVal: number; velocity: number }[]>(
    []
  );

  useEffect(() => {
    const CoinInterval = setInterval(() => {
      if (launched) {
        setCoins((prevCoins) => {
          const newLeftVal = Math.floor(Math.random() * 100);
          const newCoin = { leftVal: newLeftVal, velocity: speed };
          return [...prevCoins, newCoin];
        });
      }
    }, 1000);
    return () => clearInterval(CoinInterval);
  }, [launched]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      setMovingLeft(true);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      setMovingRight(true);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      setMovingLeft(false);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      setMovingRight(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (movingLeft) {
        setHorizontalPosition((prevPosition) =>
          Math.max(prevPosition - 0.5, 0)
        );
      } else if (movingRight) {
        setHorizontalPosition((prevPosition) =>
          Math.min(prevPosition + 0.5, 100)
        );
      }
    }, 10);

    return () => clearInterval(interval);
  }, [movingLeft, movingRight]);

  useEffect(() => {
    if (!launched) return;

    const updateSpeed = () => {
      const newSpeed = speed < MAX_SPEED ? speed + acceleration : speed;
      setSpeed(newSpeed);
    };

    const updateBackgroundProgress = () => {
      if (incrementProgress.current > BACKGROUND_INCREMENT) {
        incrementProgress.current = 0;
        setColor((prevColor) => Math.max(prevColor - 1, 0));
      } else {
        incrementProgress.current += speed;
      }
    };

    const updateFuelAndHeight = () => {
      if (parseInt(fuel.toFixed(0)) === Math.round(levelState.capacity * 500)) {
        setSpeed(0);
        setLaunched(false);
        rocketRef.current?.classList.remove("rocket-active");
        rocketRef.current?.classList.add(
          "falling-and-spinning",
          "rocket-inactive"
        );
      } else {
        setFuel((prevFuel) => prevFuel + 1 / (levelState.powerPoints / 10 + 1));
      }

      const blank = document.createElement("div");
      blank.style.height = `${speed}px`;
      blank.style.background = `hsl(198, 100%, ${color}%)`;
      blank.style.zIndex = "2";
      blank.classList.add("blank");

      document.body.appendChild(blank);

      setHeight((prevHeight) => prevHeight + speed);
    };

    if (!rocketRef.current) return;

    const interval = setInterval(() => {
      rocketRef.current?.classList.add("launched");
      updateSpeed();
      updateBackgroundProgress();
      updateFuelAndHeight();
    }, 20);

    return () => clearInterval(interval);
  }, [
    launched,
    speed,
    acceleration,
    color,
    fuel,
    levelState.capacity,
    levelState.powerPoints,
    levelState.coinVal,
  ]);

  return (
    <>
      <div className="launch-button">
        <img
          src={playButton}
          alt="Launch"
          className="clickable-launch"
          onClick={() => {
            setLaunched(true);
            const pan = document.getElementById("panel-img");
            const colImg = document.getElementById("collapse-img");
            const col = document.getElementById("collapse");
            pan?.classList.add("collapse");
            colImg?.classList.add("rotate");
            col?.classList.add("collapse");
          }}
        />
      </div>
      <div
        className="rocket-box"
        ref={rocketRef}
        style={{ left: `${horizontalPosition}%` }}
      >
        <img src={rocketInactive} alt="Rocket" className="rocket-img" />
        <progress
          value={
            parseFloat(
              (
                ((levelState.capacity * 500 - fuel) /
                  (levelState.capacity * 500)) *
                100
              ).toFixed(2)
            ) / 100
          }
        />
      </div>
      <div className="stats-panel-box">
        <img className="stats-panel-img" src={statsPanel} alt="stats-img" />
      </div>
      <div className="stats-box">
        <h2 className="stats-header">Stats</h2>
        <div className="stats">
          <p>Acceleration: {(acceleration + 1).toFixed(3)}</p>
          <p>Height: {(height / 10).toFixed(1)}</p>
          <p>Speed: {(speed === 0 ? speed : speed - 5).toFixed(2)} m/s</p>
          <p>
            Fuel:{" "}
            {(
              ((levelState.capacity * 500 - fuel) /
                (levelState.capacity * 500)) *
              100
            ).toFixed(2)}
            %
          </p>
          <p>Collected Coins:</p>
        </div>
      </div>
      <div className="coins-box">
        {coins.map((coin, index) => (
          <Coin key={index} leftVal={coin.leftVal} velocity={coin.velocity} />
        ))}
      </div>
    </>
  );
};

export default Rocket;
