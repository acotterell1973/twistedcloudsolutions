
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//Redux
import { Provider } from 'react-redux';
import { storeFactory } from './storeFactory';
import initialStateMockData from "./__mockdata__/state/initialStateMockData";


import indexRoutes from "./routes/index";
import './assets/css/material-dashboard-react.css?v=1.4.1';
import { appConstants } from './appConstants';

const hist = createBrowserHistory();
const store = storeFactory();

console.log(store.getState());
store.subscribe(() => {
    localStorage[appConstants.LOCAL_STORE_NAME] = JSON.stringify(store.getState());
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
/*
const script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3W3rqhz-vSPRxlgPLbCTzmoCatvDX02o&libraries=places";
script.async = true;

document.body.appendChild(script);*/
