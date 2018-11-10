import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";
import "react-table/react-table.css";
import { setNavigationPath } from "../../navigationDetailActions";
import AppContentWithActionBarContainer from "./components/appContentWithActionBar";

class Assistants extends React.Component {
  constructor(props, { store }) {
    super(props, { store });
    this.addEditAssistant = this.addEditAssistant.bind(this);
    this.removeAssistant = this.removeAssistant.bind(this);

  }

  removeAssistant(id){

  }
  
  addEditAssistant(id) {
    const { store } = this.context;
    var actionPath = "/assistant/" + ((id === null) ? "new" : "edit/" + id)
    store.dispatch(setNavigationPath(actionPath, true, null));
    this.forceUpdate(); // in the future figure out what's wrong with the state to cause us to use forceUpdate
  }

  render() {
    const { classes } = this.props;
    const { store } = this.context;
    let state = store.getState();
    let assistants = state.assistants;
    let navigationDetail = state.navigationDetail;

    const tableData = assistants.map(prop => {
      return {
        id: prop.id,
        name: prop.name,
        contactinfo: {
          email: prop.emailAddress[0].email,
          phoneNumber: prop.phoneNumber[0].number
        },
        employmentInfo: {
          startDate: prop.startWorkDate,
          endDate: prop.endWorkDate,
          numberOfYears: 1.4
        },
        actions: (
          <div className="actions-right">
            {" "}
            <Button
              round
              justIcon
              onClick={() => {
                this.addEditAssistant(prop.id);
              }}
              color="warning"
              className="edit"
            >
              <Edit />
            </Button>{" "}
            <Button
              round
              justIcon
              onClick={() => {}}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        )
      };
    });

    const columns = [
      {
        Header: "Name",
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
      },
      {
        Header: "Contact Info",
        accessor: "contactinfo",
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
      },
      {
        Header: "Employment",
        accessor: "employmentInfo",
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
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false
      }
    ];

    if (navigationDetail.canNavigate) {
      var path = store.getState().navigationDetail.pathname;
      store.dispatch(setNavigationPath(path, false, null));
      return (
        <Redirect
          to={{
            pathname: path,
            state: { assistantId: "currentLocation" }
          }}
          push
        />
      );
    }

    return (
      <AppContentWithActionBarContainer
        ActionBarButtons={[
          { name: "Add New Assistant", color: "Info", icon: "Add", eventDelegate:this.addEditAssistant, params:null }
        ]}
      >
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
                  defaultPageSize={5}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </AppContentWithActionBarContainer>
    );
  }
}

Assistants.contextTypes = {
  store: PropTypes.object
};
export default withStyles(extendedTablesStyle)(Assistants);
