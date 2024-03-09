import React, { useReducer } from 'react';
import './App.css';
import Start from './Start';
import LevelMenu from './LevelMenu';
import rocketInactive from "./art/rocket-inactive.png";
import play1 from "./art/Buttons/Play_Button_01.png";

 export type State = {
  power: number;
  capacity: number;
  forcefield: number;
  powerPoints: number;
  capacityPoints: number;
  forcefieldPoints: number;
  points: number;
  coins: number;
  height: number;
  cost: number;
};

export type Action =
  | { type: "increasePoint" }
  | { type: "increaseCapacity" }
  | { type: "decreaseCapacity" }
  | { type: "increasePower" }
  | { type: "decreasePower" }
  | { type: "increaseForcefield" }
  | { type: "decreaseForcefield" }
  | { type: "increaseCoin" }
  | { type: "calculateCost"};

const initialState: State = {
  power: 1,
  capacity: 1,
  forcefield: 0,
  powerPoints: 0,
  capacityPoints: 0,
  forcefieldPoints: 0,
  points: 0,
  coins: 10000,
  height: 0,
  cost: 0,
};

function reducer(state: State, action: Action): State {

  switch (action.type) {
      case "calculateCost":
      return {
        ...state,
        cost: parseInt(Math.pow(1.2, (state.points + state.capacityPoints + state.powerPoints + state.forcefieldPoints)).toFixed(0)),
      }
      case "increaseCoin":
      return {
        ...state,
        coins: state.coins + parseInt(Math.pow(1.2, (state.height / (state.height * 0.9))).toFixed(0)),
      }
      case "increasePoint":
      return {
          ...state,
          cost: parseInt(Math.pow(1.2, (state.points + state.capacityPoints + state.powerPoints + state.forcefieldPoints)).toFixed(0)),
          coins: state.coins - state.cost,
          points: state.points + 1,
      }
      case "increaseCapacity":
      return {
          ...state,
          points: state.points - 1,
          capacityPoints: state.capacityPoints + 1,
          capacity: parseFloat(Math.pow(1.3, (state.capacityPoints + 1) / 2).toFixed(2))
      };
      case "decreaseCapacity":
      if (state.capacityPoints > 0) {
          return {
          ...state,
          points: state.points + 1,
          capacityPoints: state.capacityPoints - 1,
          capacity: parseFloat(Math.pow(1.3, (state.capacityPoints - 1) / 2).toFixed(2))
          };
      }
      return state;
      case "increasePower":
      return {
          ...state,
          points: state.points - 1,
          powerPoints: state.powerPoints + 1,
          power: parseFloat(Math.pow(1.2, (state.powerPoints + 1) / 2).toFixed(2))
      };
      case "decreasePower":
      if (state.powerPoints > 0) {
          return {
          ...state,
          points: state.points + 1,
          powerPoints: state.powerPoints - 1,
          power: parseFloat(Math.pow(1.2, (state.powerPoints - 1) / 2).toFixed(2))
          };
      }
      return state;
      case "increaseForcefield":
      return {
          ...state,
          points: state.points - 1,
          forcefieldPoints: state.forcefieldPoints + 1,
          forcefield: state.forcefield + 10,
      };
      case "decreaseForcefield":
      if (state.forcefieldPoints > 0) {
          return {
          ...state,
          points: state.points + 1,
          forcefieldPoints: state.forcefieldPoints - 1,
          forcefield: state.forcefield -10 ,
          };
      }
      return state;
      default:
      return state;
  }
}

const rocket = document.getElementById("rocket");
const makeActive = () => {
  rocket?.classList.add("rocket-active");
  rocket?.classList.remove("rocket-inactive");
}
const makeInactive = () => {
  rocket?.classList.add("rocket-inactive");
  rocket?.classList.remove("rocket-active");
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  window.onload = (() => {
    dispatch({type: "calculateCost"});
  });
  return (
    <div className="App">
      <Start />
      <LevelMenu state={state} dispatch={dispatch}/>
      <div className="rocket rocket-animate">
          <img className="rocket-inactive" id="rocket" src={rocketInactive} alt="rocket" />
      </div>
      <div className="launch-button">
          <img className="clickable-launch" src={play1} alt="launch-button" onClick={() => { makeActive() }}/>
      </div>
    </div>
  );
}

export default App;
