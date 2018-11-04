import { createStore, combineReducers, applyMiddleware } from "redux";
import { assistants } from "./scenes/Assistants/reducers/assistantsReducer";
import { navigationDetail } from "./navigationDetailReducer";
import { appConstants } from "./appConstants";

const logger = store => next => action => {
  let result;
  console.groupCollapsed("dispatching", action.type);
  console.log("PREVIOUS STATE >> ", JSON.stringify(store.getState(), null, '\t'));
  console.log("ACTION >> ", action);
  result = next(action);
  console.log("NEXT START >> ", JSON.stringify(store.getState(), null, '\t'));
  console.groupEnd();
  return result;
};

const saver = store => next => action => {
  let result = next(action);
  localStorage[appConstants.LOCAL_STORE_NAME] = JSON.stringify(
    store.getState()
  );
  return result;
};
export const storeFactory = intialState =>
  applyMiddleware(logger, saver)(createStore)(
    combineReducers({ navigationDetail, assistants }),
    localStorage[appConstants.LOCAL_STORE_NAME]
      ? intialState
      : intialState
  );