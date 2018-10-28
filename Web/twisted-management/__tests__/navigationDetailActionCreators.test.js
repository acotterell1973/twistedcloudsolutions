import C from "../src/constants";
import {
  setNavigationPath,
  setNavigationPathAndQuery
} from "../src/navigationDetailActions";
import initialStateMockData from "../src/__mockdata__/state/initialStateMockData";

import {
  storeFactory
} from "../src/storeFactory";

import deepFreeze from "deep-freeze";
import {
  v4
} from 'uuid';

describe("navigation detail reducer", () => {
  let store;

  beforeAll(() => {
    store = storeFactory(initialStateMockData);
    deepFreeze(store);
  });

  it("UPDATE_NAVIGATION_PATHNAME Reducer success", () => {
 
    store.dispatch(setNavigationPath('/assistant/1',true,null));

    expect(store.getState().navigationDetail).toEqual({
        canNavigate: true,
        pathname: '/assistant/1',
        search: null,
        referrer: null
    });
  });


});