import React, { useState, useEffect } from 'react';
import rocketInactive from "../art/rocket-inactive.png";
import "./Rocket.css";
import play1 from "../art/Buttons/Play_Button_01.png";
import { State, Action } from "../App";

interface RocketProps {
    levelState: State;
    levelDispatch: React.Dispatch<Action>;
}

const Rocket: React.FC<RocketProps> = ({ levelState, levelDispatch }) => {
  const [launched, setLaunched] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [incrementProgress, setIncrementProgress] = useState<number>(0);
  const [color, setColor] = useState<number>(80);
  const [height, setHeight] = useState<number>(0);
  const [acceleration, setAcceleration] = useState<number>((levelState.power / 6) * .1);
  const [fuel, setFuel] = useState<number>(0);
  const maxSpeed: number = 100;
  const backGroundIncrement: number = 2000;
  
 

  const launch = () => {
    const rocket = document.getElementById("rocket");
    if (rocket) {
      rocket.classList.add("launched");

      if (speed < maxSpeed) {
        const newSpeed: number = speed + acceleration;
        setSpeed(newSpeed);
      }
      
      if (incrementProgress > backGroundIncrement) {
        setIncrementProgress(0);
        if (color > 0) {
            setColor(color - 1);
        }
      } else {
        setIncrementProgress(incrementProgress + speed);
      }
      if (parseInt(fuel.toFixed(0)) === Math.round(levelState.capacity * 500)) {
        setSpeed(0);
        setLaunched(false);
        rocket.classList.remove("launched");
        rocket.classList.add("rocket-inactive");
        rocket.classList.remove("rocket-active");
        rocket.classList.add("falling-and-spinning");
      } else {
        setFuel(fuel + 1);
      }
      const blank = document.createElement('div');

      blank.style.height = (`${speed}px`);
      blank.style.background = (`hsl(198, 100%, ${color}%)`);
      blank.classList.add("blank");

      document.body.appendChild(blank);
      setHeight(height + speed);
      
    }
  }

  useEffect(() => {
    setAcceleration((levelState.power / 6) * .15);
    if (launched) {
      const interval = setInterval(() => {
        launch();
      }, 40);
      return () => clearInterval(interval);
    }
  }, [launched, speed, setSpeed, levelState.power]);

 
  return (
    <>
      <div className="launch-button">
        <img className="clickable-launch" src={play1} alt="launch-button" onClick={() => {
            setLaunched(true);
            const pan = document.getElementById("panel-img");
            const colImg = document.getElementById("collapse-img");
            const col = document.getElementById("collapse");
            pan?.classList.add("collapse");
            colImg?.classList.add("rotate");
            col?.classList.add("collapse");
            }} />
      </div>
        <div className="rocket-box" id='rocket'>
            <img className="rocket-img" src={rocketInactive} alt='rocket-img'/>
            
        </div>
        <p style={{ position:"fixed", bottom: "5%", left: "5%" }}>Acceleration: {(parseFloat(acceleration.toFixed(3)) + 1).toFixed(3)}<br/>Height: {parseInt(height.toFixed(3))/10}<br/>Fuel: {levelState.capacity * 500 - fuel}</p>
    </>
  );
};

export default Rocket;