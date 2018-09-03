import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";


class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
    render() {

      return (
       <span>Hell0</span>
      );
    }
  }
  
  Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
  };
  export default withStyles(dashboardStyle)(Dashboard);