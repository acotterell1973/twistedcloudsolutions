import React from "react";
import { withStyles } from "@material-ui/core";
import { cardTitle } from "assets/jss/material-dashboard-react";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";


class Assistants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          checked: []
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(value) {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      this.setState({
        checked: newChecked
      });
    }
    

    

    render() {
      
        const { classes } = this.props;
      
        const fillButtons = [
          { color: "info", icon: Person },
          { color: "success", icon: Edit },
          { color: "danger", icon: Close }
        ].map((prop, key) => {
          return (
            <Button color={prop.color} className={classes.actionButton} key={key}>
              <prop.icon className={classes.icon} />
            </Button>
          );
        });

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
              <Table
                tableHead={[
                  "#",
                  "Name",
                  "Job Position",
                  "Since",
                  "Salary",
                  "Actions"
                ]}
                tableData={[
                  [
                    "1",
                    "Andrew Mike",
                    "Develop",
                    "2013",
                    "€ 99,225",
                    fillButtons
                  ],
                  ["2", "John Doe", "Design", "2012", "€ 89,241", fillButtons],
                  [
                    "3",
                    "Alex Mike",
                    "Design",
                    "2010",
                    "€ 92,144",
                    fillButtons
                  ],
                  [
                    "4",
                    "Mike Monday",
                    "Marketing",
                    "2013",
                    "€ 49,990",
                    fillButtons
                  ],
                  [
                    "5",
                    "Paul Dickens",
                    "Communication",
                    "2015",
                    "€ 69,201",
                    fillButtons
                  ]
                ]}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        );
    }
}

export default withStyles(extendedTablesStyle)(Assistants);