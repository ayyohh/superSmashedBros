import React, { Component } from "react";
import UserContainer from "../UserContainer/UserContainer.js";
import BattleContainer from "../BattleContainer/BattleContainer.js";
import "../BattleContainer/CreateBattle/CreateBattle.js";
import "../UserContainer/CreateFighter.js";
import EditFighter from "../UserContainer/ShowFighter.js";
import Player from "../Youtube/YoutubeComp";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import classes from "./MainContainer.css";


class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            battles: [],
            fighters: [],
            showEdit: false,
            editFighterId: null,
            fighterToEdit: {
              name: "",

        }
    }
  }

    componentDidMount() {
        this.getFighters().then((fighters) => {
            this.setState({
                fighters: fighters.data
            })
        }).catch((err) => {
            console.log(err)
        });
        this.getBattles().then((battles) => {
            this.setState({
                battles: battles.data
            })
        }).catch((err) => {
            console.log(err)
        })
        console.log(this.state)
    }

    getBattles = async () => {
        const battles = await fetch("http://localhost:9000/api/v1/battles", {
            credentials: "include",
            method: "GET"
        }) ;
        const parsedBattles = battles.json();
        return parsedBattles
    }

    getFighters = async () => {
        const fighters = await fetch("http://localhost:9000/api/v1/fighters", {
            credentials: "include",
            method: "GET"
        }) ;
        const parsedFighters = fighters.json();
        return parsedFighters
    }

    addBattle = async (battle, e) => {
        e.preventDefault();
        try {
            const createBattle = await fetch("http://localhost:9000/api/v1/battles", {
                method: "post",
                credentials: "include",
                body: JSON.stringify(battle),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const parsedResponse = await createBattle.json();
            this.setState({battles: [...this.state.battles, parsedResponse.data]})
        } catch (err) {
            console.log(err)
        }
    }

    addFighter = async (fighter, e) => {
        e.preventDefault();
        try {
            const createFighter = await fetch("http://localhost:9000/api/v1/fighters", {
                method: "post",
                credentials: "include",
                body: JSON.stringify(fighter),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const parsedResponse = await createFighter.json();
            this.setState({fighters: [...this.state.fighters, parsedResponse.data]})
        } catch (err) {
            console.log(err)
        }
    }

    deleteBattle = async (id, e) => {
        e.preventDefault();
        console.log("This is: The Most Hated");
        const deleteBattle = await fetch("http://localhost:9000/api/v1/battles/" + id, {
            credentials: "include",
            method: "DELETE"
        });
        const parsedResponse = await deleteBattle.json();
        this.setState({battles:
        this.state.battles.filter((battle, i) => {
            return battle._id !== id
        })});
    }

    deleteFighter = async (id, e) => {
        e.preventDefault();
        console.log("CLICKED BITCH");
        const deleteFighter = await fetch("http://localhost:9000/api/v1/fighters/" + id, {
            credentials: "include",
            method: "DELETE"
        });
        const parsedResponse = await deleteFighter.json();
        this.setState({fighters:
        this.state.fighters.filter((fighter, i) => {
            return fighter._id !== id
        })});
    }

    showModal = (id) => {
        // Find method returns the object atht meets the condition. Our movieToEdit variable will contain the movie we want to edit (the actual object).
        const fighterToEdit = this.state.fighters.find((fighter) => {
            fighter._id === id
        });
        this.setState({
            showEdit: true,
            editFighterId: id,
            fighterToEdit: {fighterToEdit}
        });
    }

    closeAndEdit = async (e) => {
        try {
            e.preventDefault();
            const editFighter = await fetch("http://localhost:9000/api/v1/fighters/" + this.state.editFighterId ,{
                credentials: "include",
                method: "PUT",
                body: JSON.stringify(this.state.fighterToEdit),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const parsedResponse = await editFighter.json();
            console.log(parsedResponse);
            const editedFighterArray = this.state.fighters.map((fighter) => {
                if (fighter._id === this.state.editFighterId) {
                    fighter.name = parsedResponse.data.name;

                } else {
                    console.log("Failure to update.");
                }
                return fighter
            });
            this.setState({
                fighters: editedFighterArray,
                showEdit: false
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleFormChange = (e) => {
        this.setState({
            fighterToEdit: {
                 // Spread operator
                ...this.state.fighterToEdit,
                [e.target.name]: e.target.value
            }
        });
    }


    render() {
        return(

          <Container className="mainContainer">
            <div>
                <Player />Press Play
            </div>

              <Row>
                <Col sm="12" md={{ size: 8, offset: 3 }}>
                <img src={require('./superSmashed1.png')} className="logo" />
                </Col>
              </Row>


                  <Row>
                    <Col>
                        <div className="userContainer">
                            <UserContainer addFighter={this.addFighter} fighters={this.state.fighters} battles={this.state.battles} deleteFighter={this.deleteFighter} showModal={this.showModal} />
                            {this.state.showEdit ? <EditFighter closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} fighterToEdit={this.state.fighterToEdit} /> : null}
                        </div>
                      </Col>
                      <Col>
                            <div className="battleContainer">
                              <BattleContainer addBattle={this.addBattle} fighters={this.state.fighters} battles={this.state.battles} deleteBattle={this.deleteBattle} />
                            </div>
                      </Col>
                    </Row>
                  </Container>
        )
    }
}


export default MainContainer;
