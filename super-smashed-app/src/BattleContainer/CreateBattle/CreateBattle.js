import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from './createBattle.css'


class CreateBattle extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
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


    updateBattle = async (e) => {
        await this.setState({[e.target.name]: e.target.value});
        return console.log("this.state:", this.state)
    }

    render() {
        return(


          <div>
            <Button className="createBattleBTN" color="danger" onClick={this.toggle}>Create Battle!</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Create Battle</ModalHeader>
              <ModalBody>


            <div className="createBattleModal">
                <form onSubmit={this.props.addBattle.bind(null, this.state)}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={this.updateBattle} />
                    </label><br/>
                    <Button type="Submit" value="Create Battle" onClick={this.toggle}>Create Battle</Button>
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


export default CreateBattle;
