import React, { Component } from "react";
import { Alert, Button } from 'reactstrap'

const HistoryList = (props) => {
    const fullHistory = props.history.map((history, index) => {
        return (
            <Alert color="success">
                <li key={history._id} >
                    {history}
                </li>
              </Alert>

        )
    })
    return (
        <div>
            {fullHistory}
            <form>
            <Button type="Submit" value="Restart" onClick={props.clearHistory}>Restart</Button>
            </form>
        </div>
    )
}


export default HistoryList;
