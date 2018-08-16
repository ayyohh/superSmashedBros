import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from './createFighter.css'
import Auth from '../Login/Auth.js'
const auth = new Auth();

class CreateFighter extends Component {
    constructor() {
        super();
        this.state = {
            budget: 12,
            archetype: "",
            name: "",
            hp: 0,
            def: 0,
            baseAtk: 0,
            atkVariance: 0,
            str: 0,
            dex: 0,
            int: 0,
            userGivenName: auth.getProfile().given_name,
            modal: false,
         }
         this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    updateFighter = async (e) => {
        await this.setState({[e.target.name]: e.target.value});
        return console.log("this.state:", this.state)
    }

    selectArchetype = async (e) => {
        await this.setState({archetype: e.target.value});
        await this.checkArchetype();
        return
    }

    checkArchetype = async () => {
        if (this.state.archetype === "Brawler") {
           await this.setState({str: 18, dex: 12, int: 6});
           await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.str/2, atkVariance: this.state.dex/2});
        } else if (this.state.archetype === "Scrapper") {
            await this.setState({str: 12, dex: 18, int: 6});
            await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.str/2, atkVariance: this.state.dex/2});
        } else if (this.state.archetype === "Arcanist") {
            await this.setState({str: 6, dex: 12, int: 18});
            await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.int/2, atkVariance: this.state.int/2});
        } else {
            this.setState({hp: 0, def: 0, baseAtk: 0, atkVariance: 0, str: 0, dex: 0, int: 0});
            console.log("No archetype set.");
        }
        return console.log(this.state);
    }

    incrementAttribute = async (e) => {
        e.preventDefault();
        const targetValue = e.target.value;
        const oldValue = targetValue;
        const updatedValue = parseInt(oldValue) + 1;
        if (this.state.budget < 1) {
                console.log("No points left to spend.");
                await this.setState({ budget: 1 });
            } else {
                await this.setState({[e.target.name]: updatedValue});
                if (this.state.archetype === "Brawler") {
                    await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.str/2, atkVariance: this.state.dex/2});
                } else if (this.state.archetype === "Scrapper") {
                    await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.str/2, atkVariance: this.state.dex/2});
                } else if (this.state.archetype === "Arcanist") {
                    await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.int/2, atkVariance: this.state.int/2});
                } else {
                    this.setState({hp: 0, def: 0, baseAtk: 0, atkVariance: 0, str: 0, dex: 0, int: 0});
                    console.log("No archetype set.");
            }
        }
        const oldBudget = this.state.budget;
        const newBudget = parseInt(oldBudget) - 1;
        await this.setState({budget: newBudget});
        return console.log("this.state:", this.state);
    }

    decrementAttribute = async (e) => {
        e.preventDefault();
        let targetValue = e.target.value;
        const oldValue = targetValue;
        const updatedValue = parseInt(oldValue) - 1;
        if (this.state.budget > 11) {
            console.log("No points left to spend.");
            await this.setState({ budget: 11 });
            } else {
                await this.setState({[e.target.name]: updatedValue});
                if (this.state.archetype === "Brawler") {
                    await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.str/2, atkVariance: this.state.dex/2});
                } else if (this.state.archetype === "Scrapper") {
                    await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.str/2, atkVariance: this.state.dex/2});
                } else if (this.state.archetype === "Arcanist") {
                    await this.setState({hp: (this.state.str - 10)/2 + 10, def: (this.state.dex - 10)/2 + 10, baseAtk: this.state.int/2, atkVariance: this.state.int/2});
                } else {
                    this.setState({hp: 0, def: 0, baseAtk: 0, atkVariance: 0, str: 0, dex: 0, int: 0});
                    console.log("No archetype set.");
                }
            }
        const oldBudget = this.state.budget;
        const newBudget = parseInt(oldBudget) + 1;
        await this.setState({budget: newBudget});
        return console.log("this.state:", this.state);
    }

    render() {
        return(



          <div className="createFighterBTN">
            <Button color="danger" onClick={this.toggle}>Create Fighter!</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Create Fighter</ModalHeader>
              <ModalBody>


            <div className="createFighterModal">
            <h6>Budget: {this.state.budget}</h6>
                <form onChange={this.selectArchetype}>
                    <select name="archetypes" >
                    <option value="Select Archetype">Select Archetype</option>
                        <option value="Brawler" onChange={this.selectArchetype} >Brawler</option>
                        <option value="Scrapper" onChange={this.selectArchetype} >Scrapper</option>
                        <option value="Arcanist" onChange={this.selectArchetype} >Arcanist</option>
                    </select>
                </form>
                <form onSubmit={this.props.addFighter.bind(null, this.state)}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={this.updateFighter} />
                    </label><br/>
                    <label>
                        HP: {this.state.hp}
                    </label><br/>
                    <label>
                        Defense: {this.state.def}
                    </label><br/>
                    <label>
                        Base Attack: {this.state.baseAtk}
                    </label><br/>
                    <label>
                        Attack Variance: {this.state.atkVariance}
                    </label><br/>
                    <label>
                        Strength: {this.state.str}
                        <Button name="str" value={this.state.str} onClick={this.decrementAttribute} >-</Button>
                        <Button name="str" value={this.state.str} onClick={this.incrementAttribute} >+</Button>
                    </label><br/>
                    <label>
                        Dexterity: {this.state.dex}
                        <Button name="dex" value={this.state.dex} onClick={this.decrementAttribute} >-</Button>
                        <Button name="dex" value={this.state.dex} onClick={this.incrementAttribute} >+</Button>
                    </label><br/>
                    <label>
                        Intelligence: {this.state.int}
                        <Button name="int" value={this.state.int} onClick={this.decrementAttribute} >-</Button>
                        <Button name="int" value={this.state.int} onClick={this.incrementAttribute} >+</Button>
                    </label><br/>
                    <Button type="Submit" value="Create Fighter" onClick={this.toggle}>Create Fighter</Button>
                </form>
            </div>



            </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        )
    }
}


export default CreateFighter;
