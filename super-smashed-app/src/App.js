import React, { Component } from 'react';
import './App.css';
import MainContainer from "./MainContainer/MainContainer.js";
// import User from "./MainContainer/UserContainer/UserContainer.js";
// import Battle from "./MainContainer/BattleContainer/BattleContainer.js";
import { Route, Switch } from "react-router-dom";

const My404 = () => {
  return(
    <div>
      <h1>404</h1>
    </div>
  )
}

class App extends Component {
  render() {
    console.log("SUP NERD")
    return (
      <main>
        <Switch>
        <Route exact path="/home" component={ MainContainer } />
        <Route component={My404} />
        </Switch>
      </main>
    )
  }
}


export default App;
