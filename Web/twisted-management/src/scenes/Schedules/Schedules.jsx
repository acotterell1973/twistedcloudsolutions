import React from "react";
import ReactTable from "react-table"
import { withStyles } from "@material-ui/core";
import { cardTitle } from "assets/jss/material-dashboard-react";

const style = {
    customCardContentClass: {
        paddingLeft: "0",
        paddingRight: "0"
    },
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class Schedules extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>List of Schedules</span>
        );
    }
}

export default withStyles(style)(Schedules);