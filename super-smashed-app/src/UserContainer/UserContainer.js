import React, { Component } from "react";
import CreateFighter from "./CreateFighter.js";
import Fighters from "./Fighters/fightersIndex.js";


class UserContainer extends Component {
    render() {
        return (
            <div>
                <div>

                    <CreateFighter addFighter={this.props.addFighter} />
                    <h3>Fighters:</h3>
                    <Fighters fighters={this.props.fighters} deleteFighter={this.props.deleteFighter} showModal={this.props.showModal} />
                </div>
            </div>
        )
    }
}


export default UserContainer;
