import React from "react";
import "./LevelMenu.css";
import levelMenuPanel from "../art/Buttons/panels/level-up-panel.png";
import collapse from "../art/leftButton.png";
import levelUp from "../art/Buttons/Adjust_Up_Button_01.png";
import levelDown from "../art/Buttons/Adjust_Down_Button_01.png";
import coinIcon from "../art/coinIcon.png";
import { State, Action } from "../App";


interface Props {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const LevelMenu : React.FC<Props> = ({ state, dispatch }) => {

    const capacityExponent: number =  Math.floor(Math.log10(state.capacity));

    return (
        <div className="level-menu-container">
            <div className="panel-container" id="panel-img">
                <img className="panel-img" src={levelMenuPanel} alt="level-menu-panel"/>
                <div className="panel-content">
                    <h1 className="panel-header">Upgrades</h1>
                    <div className="capacity-headers headers">
                        <h2 className="capacity-header p1"><sup></sup>Fuel Capacity: </h2>
                        <h2 className="capacity-header p2">{((state.capacity / Math.pow(10,capacityExponent))).toFixed(2)} x 10<sup>{capacityExponent + 3}</sup> kg</h2>
                    </div>
                    <div className="allocate-box">
                        <div className="level-up">
                            <img className={`level-up-img ${state.points > 0 ? '' : 'no-press'}`} src={levelUp} alt="level-up" onClick={() => dispatch({ type:"increaseCapacity"})}/>
                        </div>
                        <p className="point-value">{state.capacityPoints}</p>
                        <div className="level-down">
                            <img className={`level-down-img ${state.capacityPoints > 0 ? '' : 'no-press'}`} src={levelDown} alt="level-down" onClick={() => dispatch({ type:"decreaseCapacity"})}/>
                        </div>
                    </div>
                    
                    <div className="power-headers headers">
                        <h2 className="power-header p1">Fuel Power: </h2>
                        <h2 className="power-header p2">{(5 + state.power).toFixed(2)} MJ/L</h2>
                    </div>
                    <div className="allocate-box">
                        <div className="level-up">
                            <img className={`level-up-img ${state.points > 0 ? '' : 'no-press'}`} src={levelUp} alt="level-up" onClick={() => dispatch({ type:"increasePower"})}/>
                        </div>
                        <p className="point-value">{state.powerPoints}</p>
                        <div className="level-down">
                            <img className={`level-down-img ${state.powerPoints > 0 ? '' : 'no-press'}`} src={levelDown} alt="level-down" onClick={() => dispatch({ type:"decreasePower"})}/>
                        </div>
                    </div>

                    <div className="forcefield-headers headers">
                        <h2 className="forcefield-header p1">Forcefield: </h2>
                        <h2 className="forcefield-header p2">{ state.forcefield } HP</h2>
                    </div>
                    <div className="allocate-box">
                        <div className="level-up">
                            <img className={`level-up-img ${state.points > 0 ? '' : 'no-press'}`} src={levelUp} alt="level-up" onClick={() => dispatch({ type:"increaseForcefield"})}/>
                        </div>
                        <p className="point-value">{state.forcefieldPoints}</p>
                        <div className="level-down">
                            <img className={`level-down-img ${state.forcefieldPoints > 0 ? '' : 'no-press'}`} src={levelDown} alt="level-down" onClick={() => dispatch({ type:"decreaseForcefield"})}/>
                        </div>
                    </div>
            
                    <div className="points-headers headers">
                        <h2 className="points-header p1">Unused Points: </h2>
                        <h2 className="points-header p2">{ state.points } Points</h2>
                    </div>
                    
                    <div className="coins-headers headers">
                        <h2 className="coins-header p1">Coins:</h2>
                        <h2 className="coins-header p2">{ state.coins } </h2>
                        <div className="coin-img-box">
                            <img className="coin-img" src={coinIcon} alt="coin-icon"/>
                        </div>
                    </div>    

                    <div className="buy-box">
                        <button className={`buy-point ${state.coins > state.cost ? '' : 'no-press'}`} id="buy-point" onClick={() => {
                            dispatch({ type:"increasePoint" });
                        }}>Buy Point</button>
                        <h2 className="cost-header">Cost: {state.cost}</h2>
                    </div>
                </div>
            </div>
            
            
            <div className="left-box" id="collapse">
                <img className="left" id="collapse-img" src={collapse} alt="collapse" onClick={() => {
                    const pan = document.getElementById("panel-img");
                    const colImg = document.getElementById("collapse-img");
                    const col = document.getElementById("collapse");
                    if (pan?.classList.contains("collapse")) {
                        pan?.classList.remove("collapse");
                        colImg?.classList.remove("rotate");
                        col?.classList.remove("collapse");
                    } else {
                        pan?.classList.add("collapse");
                        colImg?.classList.add("rotate");
                        col?.classList.add("collapse");
                    }
                        
                }}/>
            </div>
        </div>
    )
}

export default LevelMenu;