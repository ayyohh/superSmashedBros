import React, { Component } from "react";
import Auth from '../Login/Auth.js'
const auth = new Auth();


class CreateFighter extends Component {
    constructor() {
        super();
        this.state = {
            archetype: "",
            name: "",
            hp: 0,
            def: 0,
            atk: 0,
            str: 0,
            dex: 0,
            int: 0,
            userGivenName: auth.getProfile().given_name,
         }
    }

    updateFighter = async (e) => {
        await this.setState({[e.target.name]: e.target.value});
        return
    }

    incrementAttribute = (e) => {
        let target = [e.target.name];
        console.log("target:", target);
    }

    checkArchetype = async (e) => {
        if (this.state.archetype === "Brawler") {
           await this.setState({hp: 14, def: 11, atk: 18, str: 18, dex: 12, int: 6});
        } else if (this.state.archetype === "Scrapper") {
            this.setState({hp: 11, def: 14, atk: 18, str: 12, dex: 18, int: 6});
        } else if (this.state.archetype === "Arcanist") {
            this.setState({hp: 8, def: 11, atk: 18, str: 6, dex: 12, int: 18});
        } else {
            this.setState({hp: 0, def: 0, atk: 0, str: 0, dex: 0, int: 0})
            console.log("No archetype set.");
        }
        return console.log(this.state);
    }

    selectArchetype = async (e) => {
        await this.setState({archetype: e.target.value});
        await this.checkArchetype();
        return
    }

    render() {
        const increment = + 1;
        const decrement = - 1;
        console.log(increment)
        console.log(decrement)

        return(
            <div>
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
                        name:
                        <input type="text" name="name" onChange={this.updateFighter} />
                    </label><br/>
                    <label>
                        hp: {this.state.hp}
                    </label><br/>
                    <label>
                        def: {this.state.def}
                    </label><br/>
                    <label>
                        atk: {this.state.atk}
                    </label><br/>
                    <label>
                        str: {this.state.str}
                        <button name="str" onClick={this.incrementAttribute} value={this.state.increment} >TEST INCREMENT</button>
                    </label><br/>
                    <label>
                        dex: {this.state.dex}
                    </label><br/>
                    <label>
                        int: {this.state.int}
                    </label><br/>
                    <input type="Submit" value="Create Fighter" />
                </form>
            </div>
        )
    }
}


export default CreateFighter;
