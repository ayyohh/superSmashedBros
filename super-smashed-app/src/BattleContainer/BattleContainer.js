import React, { Component } from "react";
import CreateBattle from "./CreateBattle/CreateBattle.js";
import Battles from "./Battles/battlesIndex.js";


class BattleContainer extends Component {
    render() {
        return (
            <div>
                <div>
                    <CreateBattle addBattle={this.props.addBattle} />
                    <h3>Battles:</h3>
                    <Battles fighters={this.props.fighters} battles={this.props.battles} deleteBattle={this.props.deleteBattle} />
                </div>
            </div>
        )
    }
}


export default BattleContainer;
