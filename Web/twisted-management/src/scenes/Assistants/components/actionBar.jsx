import React from "react";
import PropTypes from "prop-types";
import Add from "@material-ui/icons/Add";
import Button from "components/CustomButtons/Button.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle";

var ActionBar = props => {
  const { classes, ActionBarButtons } = props;

  /* helpers */
  const getActionTypes = actionType => {
    switch (actionType) {
      case "Add":
        return <Add />;
      default:
        break;
    }
  };

  const actionButtons = [...ActionBarButtons].map((prop, key) => {
    return prop.icon != null ? (
      <Button
        justIcon
        round
        color="info"
        key={key}
        onClick={prop.eventDelegate}
      >
        {getActionTypes(prop.icon)}
      </Button>
    ) : (
      <Button color="info" key={key}>
        {prop.name}
      </Button>
    );
  });

  /* styles */
  const style = {
    content: {
      float: "right"
    }
  };

  return (
    <footer className={classes.footer}>
      <div style={style.content}>{actionButtons}</div>
    </footer>
  );
};

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  ActionBarButtons: PropTypes.array.isRequired
};

ActionBar.defaultProps = {
  ActionBarButtons: []
};

export default withStyles(footerStyle)(ActionBar);
