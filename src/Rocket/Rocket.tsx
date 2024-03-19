// Importing necessary dependencies and assets
import React, { useState, useEffect, useRef, useCallback } from "react";
import rocketInactive from "../art/rocket-inactive.png";
import playButton from "../art/Buttons/Play_Button_01.png";
import statsPanel from "../art/Buttons/panels/stats-panel.png";
import "./Rocket.css";
import { State, Action } from "../App";
import Coin from "../Coin";
import EndScreen from "../EndScreen";

// Define props interface for Rocket component
interface RocketProps {
  levelState: State;
  levelDispatch: React.Dispatch<Action>;
}

// Constants
const BACKGROUND_INCREMENT = 100;

// Rocket component
const Rocket: React.FC<RocketProps> = ({ levelState, levelDispatch }) => {
  // Calculate acceleration based on power
  const acceleration = (levelState.power / 6) * 0.15;

  // State variables
  const [launched, setLaunched] = useState(false);
  const [speed, setSpeed] = useState(3);
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
  const [maxSpeed, setMaxSpeed] = useState<number>(20);
  const [collectedCoins, setCollectedCoins] = useState<number>(0);
  const [isEnded, setEnded] = useState<boolean>(false);

  // Update max speed when power points change
  useEffect(() => {
    const newMaxSpeed = parseFloat(
      Math.sqrt(100 * (levelState.powerPoints + 4)).toFixed(2)
    );
    setMaxSpeed(newMaxSpeed);
  }, [levelState.powerPoints]);

  // Handle key down event for movement
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      setMovingLeft(true);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      setMovingRight(true);
    }
  }, []);

  // Handle key up event for movement
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      setMovingLeft(false);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      setMovingRight(false);
    }
  }, []);

  // Add event listeners for key events
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Move rocket horizontally based on key presses
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

  // Launch rocket and update various parameters
  useEffect(() => {
    if (!launched) return;

    let blank: HTMLElement | null;
    if (!document.querySelector(".blank")) {
      blank = document.createElement("div");
      blank.classList.add("blank");
      blank.style.width = "100%";
      blank.style.zIndex = "2";
      document.body.appendChild(blank);
    } else {
      blank = document.querySelector(".blank");
    }

    const updateSpeed = () => {
      const newSpeed = speed < maxSpeed ? speed + acceleration : speed;
      setSpeed(newSpeed);
    };

    const updateBackgroundProgress = () => {
      if (incrementProgress.current > BACKGROUND_INCREMENT) {
        incrementProgress.current = 0;
        setColor((prevColor) => Math.max(prevColor - 0.1, 0));
      } else {
        incrementProgress.current += speed;
      }
    };

    const updateFuelAndHeight = () => {
      if (parseInt(fuel.toFixed(0)) === Math.round(levelState.capacity * 500)) {
        const coinList = document.getElementsByClassName("coin-container");
        for (let i = 0; i < coinList.length; i++) {
          coinList[i].classList.add("ended");
        }
        setSpeed(0);
        setLaunched(false);
        rocketRef.current?.classList.remove("rocket-active");
        rocketRef.current?.classList.add(
          "falling-and-spinning",
          "rocket-inactive"
        );
        const rocketImage = document.getElementById("rockImg");
        rocketImage?.classList.add("rocket-inactive");
        rocketImage?.classList.remove("rocket-active");
        setEnded(true); // promts endScreen
      } else {
        setFuel((prevFuel) => prevFuel + 1 / (levelState.powerPoints / 10 + 1));
      }

      if (blank) {
        const blankElement = blank as HTMLElement;
        const newHeight = parseInt(blankElement.style.height, 10) || 0;
        blankElement.style.height = `${newHeight + speed}px`;
        blankElement.style.background = `hsl(198, 100%, ${color}%)`;

        setHeight((prevHeight) => prevHeight + speed);
        levelState.height = height;
      }
    };

    const updateCoins = () => {
      const rand = Math.round(Math.random() * 50);
      if (launched && rand === 3 && height / 10 > 200) {
        const newLeftVal = Math.floor(Math.random() * 98);
        setCoins((prevCoins) => {
          const newCoin = {
            leftVal: newLeftVal,
            velocity: speed,
          };
          return [...prevCoins, newCoin];
        });
      }
    };

    const manageCollisions = () => {
      const rocketHitbox = rocketRef.current?.getBoundingClientRect();
      const coins = document.getElementsByClassName("coin-box");

      for (let i = 0; i < coins.length; i++) {
        var coinHitbox: DOMRect | null = coins[i].getBoundingClientRect();
        if (
          rocketHitbox &&
          rocketHitbox.x < coinHitbox.x + coinHitbox.width &&
          rocketHitbox.x + rocketHitbox.width > coinHitbox.x &&
          rocketHitbox.y < coinHitbox.y + coinHitbox.height &&
          rocketHitbox.y + rocketHitbox.height > coinHitbox.y
        ) {
          if (!coins[i].classList.contains("collected-coin")) {
            coins[i].classList.add("collected-coin");
            setCollectedCoins((prevCollectedCoins) => prevCollectedCoins + 1);
          }
        }
      }
    };

    const updateRocket = () => {
      const rocketImage = document.getElementById("rockImg");
      rocketImage?.classList.add("rocket-active");
      rocketImage?.classList.remove("rocket-inactive");
      updateSpeed();
      updateBackgroundProgress();
      updateFuelAndHeight();
      updateCoins();
      manageCollisions();
    };

    const interval = setInterval(updateRocket, 20);

    return () => {
      clearInterval(interval);
    };
  }, [
    launched,
    speed,
    maxSpeed,
    acceleration,
    color,
    fuel,
    levelState.capacity,
    levelState.powerPoints,
    levelState.coinVal,
    levelState,
    height,
    coins,
  ]);

  const startOver = () => {
    setEnded(false);
  };
  // Render Rocket component
  return (
    <>
      <EndScreen
        coins={collectedCoins}
        height={height}
        visible={isEnded}
        startOver={startOver}></EndScreen>

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
        style={{ left: `${horizontalPosition}%` }}>
        <img
          src={rocketInactive}
          alt="Rocket"
          className="rocket-img"
          id="rockImg"
        />
        <div className="progress-container">
          <progress
            style={{
              width: "100%",
              height: "10%",
              position: "absolute",
              top: "100%",
              left: 0,
            }}
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
      </div>
      <div className="stats-panel-box">
        <img className="stats-panel-img" src={statsPanel} alt="stats-img" />
      </div>
      <div className="stats-box">
        <h2 className="stats-header">Stats</h2>
        <div className="stats">
          <p>Acceleration: {(acceleration + 1).toFixed(3)}</p>
          <p>Height: {(height / 10).toFixed(1)}</p>
          <p>Speed: {launched ? speed.toFixed(2) : 0} m/s</p>
          <p>Max Speed: {maxSpeed}</p>
          <p>
            Fuel:{" "}
            {(
              ((levelState.capacity * 500 - fuel) /
                (levelState.capacity * 500)) *
              100
            ).toFixed(2)}
            %
          </p>
          <p>Collected Coins: {collectedCoins}</p>
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
