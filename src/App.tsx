import React, { useReducer } from 'react';
import './App.css';
import Start from './Start';
import LevelMenu from './LevelMenu';
import Rocket from './Rocket/Rocket';

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
  coinVal: number;
};

export type Action =
  | { type: "increasePoint" }
  | { type: "increaseCapacity" }
  | { type: "decreaseCapacity" }
  | { type: "increasePower" }
  | { type: "decreasePower" }
  | { type: "increaseForcefield" }
  | { type: "decreaseForcefield" }
  | { type: "calculateCost" }
  | { type: "calculateValue" }

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
  coinVal: 1,
};

function reducer(state: State, action: Action): State {

  switch (action.type) {
      case "calculateValue":
        return {
          ...state,
          coinVal: parseInt((((1 / (Math.pow(1.02, (state.points + state.powerPoints + state.capacityPoints + state.forcefieldPoints) * 50))) * state.height) + 1).toFixed(0))
        }
      case "calculateCost":
      return {
        ...state,
        cost: parseInt(Math.pow(1.2, (state.points + state.capacityPoints + state.powerPoints + state.forcefieldPoints)).toFixed(0)),
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



const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <Start />
      <LevelMenu state={state} dispatch={dispatch} />
      <Rocket levelState={state} levelDispatch={dispatch}/>
    </div>
  );
}

export default App;
