import React, { Component } from "react";
import { PropTypes } from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-react/views/extendedFormsStyle.jsx";
import { States } from "staticdata/listOfStates";
import explodeAddress from "./ParseAddressString";

class AddressForm extends Component {
  constructor(props) {
    super(props);

  }

  //Start View event cycle
  componentDidMount() {
    const { onChange } = this.props;
    const google = window.google;
    const autocompleteFormField = document.getElementById(`streetname`);

    this.streetname = new google.maps.places.Autocomplete(
      autocompleteFormField,
      {
        types: [`address`],
        componentRestrictions: [`us`]
      }
    );

    this.streetname.addListener("place_changed", () => {
      let addressObject = this.streetname.getPlace();

      explodeAddress(addressObject.formatted_address, function (err, addressObj) {
        let event = {
          target: {
            type: "addressInfo",
            name: "address",
            value: addressObj,
            err
          }
        };

        onChange(event);
      });
    });
  }

  render() {
    const { classes, addressInfo, onChange, onBlur } = this.props;
    return (
      <div>
        <form>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Street Number"
                  formControlProps={{ fullWidth: true }}
                  inputProps={{ name: "street-number", value: addressInfo.streetNumber, onChange, onBlur }} />
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <CustomInput
                  id="streetname"
                  labelText="Street Name"
                  inputProps={{ name: "street-name", value: addressInfo.streetName, onChange, onBlur }}
                  formControlProps={{ fullWidth: true }} />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Unit"
                  inputProps={{ name: "unit-name", value: addressInfo.unitName, onChange, onBlur }}
                  formControlProps={{ fullWidth: false }} />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="City"
                  id="city"
                  inputProps={{ name: "city", value: addressInfo.city, onChange, onBlur }}
                  formControlProps={{ fullWidth: true }} />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="state-select" className={classes.selectLabel} >
                    State
                  </InputLabel>
                  <Select
                    MenuProps={{ className: classes.selectMenu }}
                    classes={{ select: classes.select }}
                    value={addressInfo.state}
                    inputProps={{ id: "state-select", name: "state-select", value: addressInfo.city, onChange, onBlur }} >
                    <MenuItem
                      disabled
                      classes={{ root: classes.selectMenuItem }} >
                      Choose State
                    </MenuItem>
                    {States.map((state, idx) => (
                      <MenuItem
                        key={idx}
                        classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                        value={state.abbreviation}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Postal Code"
                  inputProps={{ name: "postal-code", value: addressInfo.city, onChange, onBlur }}
                  formControlProps={{ fullWidth: true }}  />
              </GridItem>
            </GridContainer>
          </div>
        </form>
      </div>
    );
  }
}
AddressForm.contextTypes = {
  store: PropTypes.object
};
export default withStyles(extendedFormsStyle)(AddressForm);
