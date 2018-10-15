import React from 'react';
import PropTypes from 'prop-types';
// react component for creating dynamic tables
import ReactTable from 'react-table';
import { Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Assignment from '@material-ui/icons/Assignment';
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import Button from "components/CustomButtons/Button.jsx";
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';

import extendedTablesStyle from 'assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx';
import 'react-table/react-table.css';

import { setNavigationPath } from "../../navigationDetailActions";
import { debug } from 'util';

class Assistants extends React.Component {
    constructor(props, { store }) {
        super(props, { store });
    }

    render() {
        const { classes } = this.props;
        const { store } = this.context;
        let state = store.getState();
        let assistants = state.assistants;
        let navigationDetail = state.navigationDetail;

        const tableData = assistants.map((prop) => {
            return {
                id: prop.id,
                name: prop.name,
                contactinfo: { email: prop.emailAddress[0].email, phoneNumber: prop.phoneNumber[0].number },
                employmentInfo: { startDate: prop.startWorkDate, endDate: prop.endWorkDate, numberOfYears: 1.4 },
                actions: (

                    <div className="actions-right">
                        {" "}

                        <Button
                            round
                            onClick={() => {
                                store.dispatch(setNavigationPath('/assistant/1', true, null));
                                this.forceUpdate();
                            }}
                            color="warning"
                            className="edit"
                        >
                            <Edit />
                        </Button>{" "}

                        <Button
                            round
                            onClick={() => {

                            }}
                            color="danger"
                            className="remove"
                        >
                            <Close />
                        </Button>{" "}
                    </div>
                )
            }
        });

        const columns = [{
            Header: 'Name',
            columns: [
                {
                    Header: "First Name",
                    id: "first",
                    accessor: d => d.name.first
                },
                {
                    Header: "Last Name",
                    id: "last",
                    accessor: d => d.name.last
                }
            ]
        }, {
            Header: 'Contact Info',
            accessor: 'contactinfo',
            columns: [
                {
                    Header: "Email",
                    id: "emailAddress",
                    accessor: d => d.contactinfo.email
                },
                {
                    Header: "Phone Number",
                    id: "phoneNumber",
                    accessor: d => d.contactinfo.phoneNumber
                }
            ]
        }, {
            Header: 'Employment',
            accessor: 'employmentInfo',
            columns: [
                {
                    Header: "Start Date",
                    id: "startDate",
                    accessor: d => d.employmentInfo.startDate
                },
                {
                    Header: "End Date",
                    id: "endDate",
                    accessor: d => d.employmentInfo.endDate
                },
                {
                    Header: "Number Of Years",
                    id: "numberOfYears",
                    accessor: d => d.employmentInfo.numberOfYears
                }
            ]
        }, {
            Header: "Actions",
            accessor: "actions",
            sortable: false,
            filterable: false
        }];

        debugger;
        if (navigationDetail.canNavigate) {
            return (<Redirect to={{
                pathname: '/assistant/1',
                search: '?utm=your+face',
                state: { assistantId: "currentLocation" }
            }} push />)
        }

        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="primary" icon>
                            <CardIcon color="primary">
                                <Assignment />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Assistants</h4>
                        </CardHeader>
                        <CardBody>
                            <ReactTable
                                data={tableData}
                                columns={columns}
                                className="-striped -highlight"
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

Assistants.contextTypes = {
    store: PropTypes.object
}
export default withStyles(extendedTablesStyle)(Assistants);
