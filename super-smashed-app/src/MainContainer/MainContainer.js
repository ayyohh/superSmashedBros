import React, { Component } from "react";
import UserContainer from "../UserContainer/UserContainer.js";
import BattleContainer from "../BattleContainer/BattleContainer.js";



class MainContainer extends Component {
    render() {
        return(
            <div className="mainContainer">
                <div className="userContainer">
                    <h1>User</h1>
                    <UserContainer />

                </div>
                <div className="battleContainer">
                    <h1>Battles</h1>
                    <BattleContainer />
                </div>
            </div>
        )
    }
}


export default MainContainer;
