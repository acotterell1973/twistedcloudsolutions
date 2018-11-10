import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import AddressForm from "components/Address/Address.jsx";
import AppContentWithActionBarContainer from "./components/appContentWithActionBar";
import userProfileStyles from "assets/jss/material-dashboard-react/views/extendedFormsStyle.jsx";
import avatar from "assets/img/generic-person.png";
import {
  initializeAssistant,
  initializeAddress,
  initializeEmail,
  initializePhone,
  editAssistantName,
  getAssistant
} from "scenes/Assistants/services/actions";
import { assistants } from "./reducers/assistantsReducer";

class AssistantUserProfile extends Component {
  constructor(props, { store }) {
    super(props, { store });

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      validating: false
    };
  }
  //Properties
  assistantId = null;

  //class methods
  handleBlur(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log("input blur: " + name + " value: " + value);
  }

  handleInputChange(event) {
    const { store } = this.context;
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log("input change: " + name + " value: " + value);
    switch (name) {
      case "first-name":
        store.dispatch(editAssistantName(this.assistantId, value, null, null));
        break;
      case "last-name":
        store.dispatch(editAssistantName(this.assistantId, null, value, null));
        break;
      default:
        break;
    }

   // this.forceUpdate();

    //console.log("Street: ", addressObj.street_address1);
    //console.log("City: ", addressObj.city);
    //console.log("State: ", addressObj.state);
    //console.log("Zip: ", addressObj.postal_code);
    //console.log("Country: ", addressObj.country);
  }

  //Start View event cycle
  componentWillMount() {
    const { match } = this.props;
    const { store } = this.context;

    if (match.isExact) {
      if (match.params.action && match.params.action === "new") {
        this.assistantId = store.dispatch(initializeAssistant()).id;
        store.dispatch(initializeAddress(this.assistantId, 1));
        store.dispatch(initializePhone(this.assistantId, 1));
        store.dispatch(initializeEmail(this.assistantId, 1));
      } else {
        if (match.params.action && match.params.action === "edit")
          this.assistantId = match.params.id;
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { store } = this.context;

    let state = store.getState();
    let assistant = assistants(
      state.assistants,
      getAssistant(this.assistantId)
    );

    return (
      <AppContentWithActionBarContainer
        ActionBarButtons={[{ name: "Update Assistant Profile", color: "Info" }]}
      >
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>Edit Profile</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={
                          <span>
                            First Name <small>(required)</small>
                          </span>
                        }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "first-name",
                          value: assistant.name.first,
                          onChange: this.handleInputChange,
                          onBlur: this.handleBlur,
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={
                          <span>
                            Last Name <small>(required)</small>
                          </span>
                        }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "last-name",
                          value: assistant.name.last,
                          onChange: this.handleInputChange,
                          onBlur: this.handleBlur,
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <Person className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <AddressForm
                        onChange={this.handleInputChange}
                        onBlur={this.handleBlur}
                        addressOwnerId={assistant.id}
                        addressInfo={{
                          streetNumber: assistant.address[0].streetNumber,
                          streetName: assistant.address[0].streetName,
                          unitName: assistant.address[0].unitName,
                          city: assistant.address[0].city,
                          state: assistant.address[0].state,
                          postCode: assistant.address[0].postCode
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={
                          <span>
                            Phone Number <small>(required)</small>
                          </span>
                        }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "phone-number",
                          value: assistant.phoneNumber[0].number,
                          onChange: this.handleInputChange,
                          onBlur: this.handleBlur,
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <Phone className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={
                          <span>
                            Email <small>(required)</small>
                          </span>
                        }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "email-address",
                          value: assistant.emailAddress[0].email,
                          onChange: this.handleInputChange,
                          onBlur: this.handleBlur,
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <Clearfix />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h4 className={classes.cardTitle}>Alec Thompson</h4>
                  <p className={classes.description}>Summary of clients</p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </AppContentWithActionBarContainer>
    );
  }
  //End View event cycle
}
AssistantUserProfile.contextTypes = {
  store: PropTypes.object
};

export default withStyles(userProfileStyles)(AssistantUserProfile);
