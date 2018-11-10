import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ActionBar from "./actionBar";

const style = {
    mainContent: {
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 105px)",
        flex: "1 0 auto",
    },
    content: {
        flex: "1 0 auto",
    }
};

function AppContentWithActionBarContainer(props) {
    const { children, classes,...rest } = props;
    return (
        <div style={style.mainContent} >
            <div style={style.content}  >
                {children}
            </div>
            <ActionBar {...rest} ></ActionBar>
        </div>

    );
}

export default withStyles(style)(AppContentWithActionBarContainer);
