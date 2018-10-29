import React from 'react';
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Header from "components/Header/Header.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";

import dashboardRoutes from "routes/dashboard";
import image from "assets/img/sidebar-4.jpg";
import logo from "assets/img/Upload-toCloud-512.png";

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

var ps;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    getRoute() {
        return this.props.location.pathname !== "/maps";
    }
    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
        window.removeEventListener("resize", this.resizeFunction);
    }
    render() {
        const { classes, ...rest } = this.props;
        const mainPanel =
            classes.mainPanel +
            " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                    navigator.platform.indexOf("Win") > -1
            });
        return (
   
            <div className={classes.wrapper}>
                <Sidebar
                    routes={dashboardRoutes}
                    logoText={"Twisted Cloud"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    bgColor="black"
                    {...rest}
                />
                <div className={mainPanel} ref="mainPanel">
                    <Header
                        routes={dashboardRoutes}
                        
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>{switchRoutes}</div>
                        </div>
                    ) : (
                            <div className={classes.map}>{switchRoutes}</div>
                        )}
                    
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);