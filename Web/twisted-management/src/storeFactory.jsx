import { createStore, combineReducers, applyMiddleware } from "redux";
import { assistants } from "./scenes/Assistants/reducers/assistantsReducer";
import { appConstants } from "./appConstants";

const logger = store => next => action => {
  let result;
  console.groupCollapsed("dispatching", action.type);
  console.log("PREVIOUS STATE >> ", JSON.stringify(store.getState()));
  console.log("ACTION >> ", action);
  result = next(action);
  console.log("NEXT START >> ", JSON.stringify(store.getState()));
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
    combineReducers({ assistants }),
    localStorage[appConstants.LOCAL_STORE_NAME]
      ? JSON.parse(localStorage[appConstants.LOCAL_STORE_NAME])
      : intialState
  );

export const intialState = {
  assistants: [
    {
      startWorkDate: null,
      endWorkDate: null,
      emailAddress: null,
      phoneNumber: null,
      address: null,
      name: {
        title: null,
        first: "Andrew",
        last: "Cotter"
      },
      dob: null,
      nationality: null,
      genderType: 0,
      id: "5b81ae5c3cca1e650447cb14"
    },
    {
      startWorkDate: null,
      endWorkDate: null,
      emailAddress: null,
      phoneNumber: null,
      address: [],
      name: {
        title: null,
        first: null,
        last: null
      },
      dob: null,
      nationality: null,
      genderType: 0,
      id: "5b81d065d544815cb887c63a"
    }
  ]
};
