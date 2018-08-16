import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const EditFighter = (props) => {
    console.log(props, 'props in show fighter');
    return (
        <div>
            <form onSubmit={props.closeAndEdit}>
                <label>
                    Edit Fighter Name: {props.fighterToEdit.name}
                    <input type="text" name="name" onChange={props.handleFormChange} value={props.fighterToEdit.name} />
                </label>

                <Button type="submit" value="Save Changes" onClick={props.handleFormChange}>Save Changes</Button>
            </form>
        </div>
    )
};


export default EditFighter;
