// ##############################
// // // ExtendedForms view styles
// #############################

import { cardTitle } from "assets/jss/material-dashboard-react";
import customSelectStyle from "assets/jss/material-dashboard-react/customSelectStyle";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-react/customCheckboxRadioSwitch";

const extendedFormsStyle = {
  ...customCheckboxRadioSwitch,
  ...customSelectStyle,
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  }
};

export default extendedFormsStyle;
