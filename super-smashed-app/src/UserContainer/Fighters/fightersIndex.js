import React, { Component } from "react";
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./fighters.css";


class FightersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fighters: []
        }
    }

    render(props) {
            const allFighters = this.props.fighters.map((fighter, i) => {
            return(
              <Col sm={{ size: 'auto', offset: 1 }} className="fighter">
                <div key={fighter._id} >
                    <h4>{fighter.name}</h4>
                    <Button onClick={this.props.deleteFighter.bind(null, fighter._id)} >Delete</Button>
                    <Button onClick={this.props.showModal.bind(null, fighter._id)}>Edit</Button>
                </div>
              </Col>
            )
        })
        return(
            <Container>
                <Row>
                    {allFighters}
                </Row>
            </Container>
        )
    }

}


export default FightersList;
