import C from "./constants";
import {
  setNavigationPath,
  setNavigationPathAndQuery
} from "./navigationDetailActions";
import {
  storeFactory,
  intialState
} from "./storeFactory";

import deepFreeze from "deep-freeze";
import {
  v4
} from 'uuid';

describe("navigation detail reducer", () => {
  let store;

  beforeAll(() => {
    store = storeFactory(intialState);
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