import "./Start.css";
import React from "react";
import startPanel from "../art/Buttons/panels/Start-panel.png";
import playBut1 from "../art/Buttons/Text_Play_Button_01.png";
import settingsBut1 from "../art/Buttons/Text_Settings_Button_01.png";
import ground from "../art/grassGround.png";
import play1 from "../art/Buttons/Play_Button_01.png";
import launchPlatform from "../art/lauchPlatform.png";
import rocket from "../art/rocket.png";

const Start: React.FC = () => {
    return (
        <div className="start-container">
            <div className="start-overlay" id="start-overlay">
                <div className="start-box">
                    <div className="start-panel-box">
                        <img className="start-panel-img" src={startPanel} alt="start-panel" />
                    </div>
                    <div className="buttons-box">
                        <img className="play-button" src={playBut1} alt="play-button" onClick={() => {
                            document.getElementById("start-overlay")?.classList.add("hidden");   
                        }}/>
                        <img className="settings-button" src={settingsBut1} alt="settings-button" onClick={() => {

                        }}/>
                    </div>
                    
                </div>
            </div>
            <div className="start-screen">
                <div className="ground">
                    <img className="ground-img" src={ground} alt="grass-ground" />
                </div>
                <div className="launch-button">
                    <img className="clickable-launch" src={play1} alt="launch-button" onClick={() => {
                        document.getElementById("panel-img")?.classList.add("playing");
                    }}/>
                </div>
                <div className="launch-platform">
                    <img className="launch-platform-img" src={launchPlatform} alt="launch-platform"/>
                </div>
                <div className="rocket">
                    <img className="rocket-img" src={rocket} alt="rocket" />
                </div>
            </div>
        </div>
    );
}

export default Start;
