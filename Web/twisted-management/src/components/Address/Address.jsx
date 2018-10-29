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
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount() {
    
    const google = window.google;

    this.streetname = new google.maps.places.Autocomplete(
      document.getElementById("streetname"),
      {}
    );

    this.streetname.addListener("place_changed", this.handlePlaceSelect);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

 
  handleSubmit(event) {
    event.preventDefault();
    // this.props.dispatch(addParlor(this.state));
    // this is just some redux.
    // just trust that it does what it's supposed to do,
    // send an ajax request to my server
  }

  handlePlaceSelect() {
    debugger;
    let addressObject = this.streetname.getPlace();
    let address = addressObject.address_components;

    let test = explodeAddress(addressObject.formatted_address, function(err,addressObj){
      debugger;
      console.log('Street: ', addressObj.street_address1)
      console.log('City: ', addressObj.city)
      console.log('State: ', addressObj.state)
      console.log('Zip: ', addressObj.postal_code)
      console.log('Country: ', addressObj.country)
    });

    /*this.setState({
      name: addressObject.name,
      street_address: `${address[0].long_name} ${address[1].long_name}`,
      city: address[4].long_name,
      state: address[6].short_name,
      zip_code: address[8].short_name,
      googleMapLink: addressObject.url
    });*/
  }
  render() {
    const { classes, addressOwnerId,addressInfo } = this.props;
    const { store } = this.context;

    return (
      <div>
        <form>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Street Number"
                  id="street-number"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value:addressInfo.streetNumber,
                    onChange: event => this.change(event, "firstname", "length", 3),
                    
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <CustomInput
                  labelText="Street Name"
                  id="streetname"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Unit"
                  id="unit-number"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="City"
                  id="city"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel htmlFor="state-select" className={classes.selectLabel} >
                    State
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={addressInfo.state}
                    inputProps={{
                      id: "state-select"
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Choose State
                    </MenuItem>
                    {
                      States.map((state, idx) =>
                        <MenuItem key={idx} classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }} value={state.abbreviation} >{state.name}</MenuItem>
                      )
                    }

                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Postal Code"
                  id="postal-code"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
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
}
export default withStyles(extendedFormsStyle)(AddressForm);
