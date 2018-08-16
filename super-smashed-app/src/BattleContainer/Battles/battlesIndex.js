import React, { Component } from "react";
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./battles.css";
import HistoryList from "./HistoryList/HistoryList.js";


class BattlesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [],
            fighters: [],
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    historyCheck = async (e) => {
        if (this.state.history.length > 10) {
            this.state.history.shift();
            console.log("this.state.history:", this.state.history);
        } else {
            console.log("Slots left until history clear:", 5 - this.state.history.length)
        }
    }



    handleClick = async (e) => {
        let parsedValue = JSON.parse(e.target.value);
        await this.setState({ fighters: [...this.state.fighters, parsedValue] });
    }

    clearHistory = async (e) => {
      this.setState({history: []});
    }

    initializeCombat = async (e) => {
        console.log("Initializing Combat.");
        let fighters = this.state.fighters;
        let initializeCombatFailState = `Not enough participants, current participant count: ${fighters.length}, you need 2 - ${fighters.length} more`;
        if (fighters.length < 2) {
            await this.setState({ history: [...this.state.history, initializeCombatFailState] });
            await this.historyCheck();
        } else {
            console.log("Battle is full.");
            this.executeCombat();
        }
    }

    turn1 = async (e) => {
        const fighter1 = this.state.fighters[0].fighter;
        console.log("Turn One:", fighter1.name);
        let turnOneStartIndicator = `Turn One: ${fighter1.name}`;
        await this.setState({ history: [...this.state.history, turnOneStartIndicator] });
        await this.historyCheck();
        const fighter2 = this.state.fighters[1].fighter;
        const f1MaxAtk = fighter1.baseAtk + fighter1.atkVariance;
        let f1Atk = Math.floor(Math.random() * (f1MaxAtk - fighter1.baseAtk) ) + fighter1.baseAtk;
        if (f1Atk > fighter2.def) {
            console.log("HIT FOR:", f1Atk, "damage");
            let turn1HitIndicator = `Hit for ${f1Atk} damage!`;
            await this.setState({ history: [...this.state.history, turn1HitIndicator] });
            await this.historyCheck();
            if (f1Atk > fighter2.hp) {
               console.log(fighter1.name, "has won!");
               let turn1WinState = `${fighter1.name} has won!`;
               await this.setState({ history: [...this.state.history, turn1WinState], fighters: [] });
               await this.historyCheck();
               return
            } else {
                let newHp = fighter2.hp -= f1Atk;
                console.log("fighter2.hp:", newHp);
                let f2RemainingHp = `fighter2.hp: ${newHp}`;
                await this.setState({ history: [...this.state.history, f2RemainingHp] });
                await this.historyCheck();
                this.turn2();
                return;
            }
        } else {
            console.log("MISS");
            let turn1MissIndicator = "MISS";
            await this.setState({ history: [...this.state.history, turn1MissIndicator] });
            await this.historyCheck();
            this.turn2();
            return;
        }
    }

    turn2 = async (e) => {
        const fighter1 = this.state.fighters[0].fighter;
        const fighter2 = this.state.fighters[1].fighter;
        console.log("Turn Two:", fighter2.name);
        let turnTwoStartIndicator = `Turn Two: ${fighter2.name}`;
        await this.setState({ history: [...this.state.history, turnTwoStartIndicator] });
        await this.historyCheck();
        const f2MaxAtk = fighter2.baseAtk + fighter2.atkVariance;
        let f2Atk = Math.floor(Math.random() * (f2MaxAtk - fighter2.baseAtk) ) + fighter2.baseAtk;
        if (f2Atk > fighter1.def) {
            console.log("HIT FOR:", f2Atk, "damage");
            let turn2HitIndicator = `Hit for ${f2Atk} damage!`;
            await this.setState({ history: [...this.state.history, turn2HitIndicator] });
            await this.historyCheck();
            if (f2Atk > fighter1.hp) {
                let turn2WinState = `${fighter2.name} has won!`;
                await this.setState({ history: [...this.state.history, turn2WinState], fighters: [] });
                await this.historyCheck();
                return
            } else {
                let newHp = fighter1.hp -= f2Atk;
                console.log("fighter1.hp:", newHp);
                let f1RemainingHp = `fighter1.hp: ${newHp}`;
                await this.setState({ history: [...this.state.history, f1RemainingHp] });
                await this.historyCheck();
                this.turn1();
            return;
            }
        } else {
            console.log("MISS");
            let turn2MissIndicator = "MISS";
            await this.setState({ history: [...this.state.history, turn2MissIndicator] });
            await this.historyCheck();
            this.turn1();
            return;
        }
    }

    executeCombat = async (e) => {
        console.log("Executing Combat.");
        this.turn1();

    }

    render() {
        const allFighters = this.props.fighters.map((fighter, index) => {
            return(

                        <div key={fighter._id} >
                            {fighter.name}
                            <form>
                                <Button name={fighter.name} type="button" value={JSON.stringify({fighter})} onClick={this.handleClick}>Select</Button>
                            </form>
                        </div>

            )
        })
        const allParticipants = this.state.fighters.map((participant, index) => {
            let participantName = participant.fighter.name;
            return(

                    <div key={participant._id} >
                        {participantName}
                    </div>

            )
        })
        const allBattles = this.props.battles.map((battle, index) => {
        return(
            <Col sm={{ size: 'auto', offset: 1 }} className="battleInfo">
                <div key={battle._id} >
                    <h6>{battle.name}</h6>
                    <h6>Participants:</h6>
                        {allParticipants}
                        <form>
                            <Button name="initializeCombat" type="button" onClick={this.initializeCombat} >Start {battle.name}!</Button>







                            <HistoryList history={this.state.history} clearHistory={this.clearHistory} />







                            <Button name="deleteBattle" type="button"  onClick={this.props.deleteBattle.bind(null, battle._id)} >Delete</Button>
                        </form>
                </div>
                <h6>Available Fighters:</h6>
                {allFighters}
            </Col>
        )
    })
        return(
            <Container>
              <Row>
                {allBattles}
              </Row>
            </Container>
        )
    }
}


export default BattlesList;
