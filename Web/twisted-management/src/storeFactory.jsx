//https://medium.com/@baphemot/intro-to-debugging-reactjs-applications-67cf7a50b3dd

import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger' //https://github.com/LogRocket/redux-logger
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"; //https://github.com/leoasis/redux-immutable-state-invariant
import { assistants } from "./scenes/Assistants/reducers/assistantsReducer";
import { navigationDetail } from "./navigationDetailReducer";
import { appConstants } from "./appConstants";

const saver = store => next => action => {
  let result = next(action);
  localStorage[appConstants.LOCAL_STORE_NAME] = JSON.stringify(
    store.getState()
  );
  return result;
};

const logColors = {
  title: (action) => '#202020',
  prevState: (prevState) => '#FF9933',
  action: (action) => '#66FF66',
  nextState: (nextState) => '#0080FF',
  error: (error, prevState) => '#FF0000',

}
const middlewares = [];

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    level: 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
    predicate: (getState, action) => action.type !== "AUTH_REMOVE_TOKEN",
    colors: logColors,
    duration: true
  });

  middlewares.push(reduxImmutableStateInvariant());
  middlewares.push(saver);
  middlewares.push(logger);

}
/* eslint-disable no-underscore-dangle */
export const storeFactory = intialState =>
  applyMiddleware(...middlewares)(createStore)(
    combineReducers({ navigationDetail, assistants }),
    localStorage[appConstants.LOCAL_STORE_NAME] ? intialState : intialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */