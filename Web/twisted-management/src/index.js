
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
//Redux
import { Provider } from 'react-redux';
import { storeFactory, intialState } from './storeFactory';

import indexRoutes from "./routes/index";
import './assets/css/material-dashboard-react.css?v=1.4.1';
import { appConstants } from './appConstants';
import { editAssistantName } from './scenes/Assistants/services/actions';

const hist = createBrowserHistory();
const store = storeFactory(intialState);
console.log(store.getState());
store.subscribe(() => {
    localStorage[appConstants.LOCAL_STORE_NAME] = JSON.stringify(store.getState());
    console.log(store.getState());
});


store.dispatch(editAssistantName(
    "5b81d065d544815cb887c63a",
    "Andrew Action",
    "Cotterell 2",
    "Mr."
));

// store.dispatch({
//     type: "EDIT_ASSISTANT_ADDRESS",
//     id: "5b81d065d544815cb887c63a",
//     streetNumber: 2188,
//     streetName: "Telogia Ct",
//     unitName: null,
//     city: "West Palm Beach",
//     state: "FL",
//     postCode: "33411"
// })

// store.dispatch({
//     type: "EDIT_ASSISTANT_PHONE",
//     id: "5b81d065d544815cb887c63a",
//     number: 9545593068,
//     phoneType: "Mobile"
// })

// store.dispatch({
//     type: "EDIT_ASSISTANT_EMAIL",
//     id: "5b81d065d544815cb887c63a",
//     email: "acotterell1973@gmail.com",
//     emailType: "Primary"
// })

// console.log(store.getState());


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
