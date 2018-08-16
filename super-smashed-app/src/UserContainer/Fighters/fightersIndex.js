import React, { Component } from "react";


const FightersList = (props) => {
    const allFighters = props.fighters.map((fighter, i) => {
        return(
            <li key={fighter._id} >
                <h3>{fighter.name}</h3>
                <p>Created by: {fighter.userGivenName}</p>
            </li>
        )
    })
    return(
        <div>
            <ul>
                {allFighters}
            </ul>
        </div>
    )
}


export default FightersList;
