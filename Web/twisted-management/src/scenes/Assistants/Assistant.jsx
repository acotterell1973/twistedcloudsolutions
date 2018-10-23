import React, { Component } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons
import Face from '@material-ui/icons/Face';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';


// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Clearfix from 'components/Clearfix/Clearfix.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import AddressForm from 'components/Address/Address.jsx';

import userProfileStyles from 'assets/jss/material-dashboard-react/views/extendedFormsStyle.jsx';
import avatar from 'assets/img/generic-person.png';


class AssistantUserProfile extends Component {
    constructor(props, {store}) {
        super(props,{store});
  
    }
    render() {
        
        const { classes } = this.props;
        const { store } = this.context;
    
        let assistants = store.getState()
        return (
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
                                            id="firstname"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event =>
                                                    this.change(event, 'firstname', 'length', 3),
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
                                            id="lastname"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                onChange: event =>
                                                    this.change(event, 'lastname', 'length', 3),
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Person
                                                            className={classes.inputAdornmentIcon}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <AddressForm addressOwnerId={'5b81ae5c3cca1e650447cb14'} addressInfo={{streetNumber:'2345', state:'FL'}} />
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
                                            id="phone-number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
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
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
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
                                <Button color="rose" className={classes.updateProfileButton}>
                  Update Profile
                                </Button>
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
        );
    }
}
AssistantUserProfile.contextTypes = {
    store: PropTypes.object
}

export default withStyles(userProfileStyles)(AssistantUserProfile);
