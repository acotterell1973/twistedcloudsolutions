import C from "../src/constants";
import {
  setNavigationPath,
  setNavigationPathAndQuery
} from "./navigationDetailActions";
import initialStateMockData from "./__mockdata__/state/initialStateMockData";

import {
  storeFactory
} from "./storeFactory";

import deepFreeze from "deep-freeze";
import {
  v4
} from 'uuid';

describe("navigation detail reducer", () => {
  let store;

  beforeAll(() => {
    console.log("IN BEFORE ALL");
    console.log("INITIAL STATE" + initialStateMockData);
    
    store = storeFactory(initialStateMockData);
    //console.log(store.getState());
  });

  it("UPDATE_NAVIGATION_PATHNAME Reducer success", () => {
 
    const results =  store.dispatch(setNavigationPath('/assistant/1',true,null));

    expect(results).toEqual({
        canNavigate: true,
        pathname: '/assistant/1',
        search: null,
        referrer: null
    });
  });


});