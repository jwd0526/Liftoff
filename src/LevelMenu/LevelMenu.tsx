import "./LevelMenu.css";
import React from "react";
import levelMenuPanel from "../art/Buttons/panels/level-up-panel.png";

const LevelMenu: React.FC = () => {
    return (
        <div className="level-menu-container">
            <img className="panel-img" id="panel-img" src={levelMenuPanel} alt="level-menu-panel"/>
        </div>
    );
}

export default LevelMenu;