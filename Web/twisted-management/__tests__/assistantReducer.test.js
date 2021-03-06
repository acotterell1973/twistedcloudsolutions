import C from "../src/scenes/Assistants/services/constants";
import {
  assistants,
  assistant
} from "../src/scenes/Assistants/reducers/assistantsReducer";
import initialStateMockData from "../src/__mockdata__/state/initialStateMockData";

import {
  storeFactory
} from "../src/storeFactory";
import deepFreeze from "deep-freeze";
import {
  v4
} from 'uuid';

describe("assistant reducer", () => {
  let store;

  beforeAll(() => {
    store = storeFactory(initialStateMockData);
    //console.log(store.getState());
  });

  it("ADD_ASSISTANT Reducer success", () => {
    let state = {};
    let id = v4();
    const action = {
      type: C.ADD_ASSISTANT,
      id
    };
    deepFreeze(state);
    deepFreeze(action);

    const results = assistant(state, action);

    expect(results).toEqual({
      startWorkDate: null,
      endWorkDate: null,
      emailAddress: [

      ],
      phoneNumber: [],
      address: [],
      name: {
        title: null,
        first: null,
        last: null
      },
      dob: null,
      nationality: null,
      genderType: 0,
      id
    });
  });

  it("EDIT_ASSISTANT_NAME AssistantDetail Reducer success", () => {
    const action = {
      type: C.EDIT_ASSISTANT_NAME,
      id: "5b81d065d544815cb887c63a",
      first: "Zsusanna",
      last: "Cotterell",
      title: "Mrs."
    };

    let state = store.getState().assistants[1];

    deepFreeze(state);
    deepFreeze(action);

    const results = assistant(state, action);

    expect(results.name).toEqual({
      first: "Zsusanna",
      last: "Cotterell",
      title: "Mrs."
    });
  });

  it("EDIT_ASSISTANT_ADDRESS Assistants Reducer success", () => {
    const action = {
      type: C.EDIT_ASSISTANT_ADDRESS,
      id: "5b81d065d544815cb887c63a",
      streetNumber: "2188",
      streetName: "Telogio Ct",
      unitName: null,
      city: "West Palm Beach",
      state: "FL",
      postCode: "33411"
    };

    let state = store.getState().assistants[1];

    deepFreeze(state);
    deepFreeze(action);

    const results = assistant(state, action);

    expect(results.address).toEqual([{
      streetNumber: "2188",
      streetName: "Telogio Ct",
      unitName: null,
      city: "West Palm Beach",
      state: "FL",
      postCode: "33411"
    }]);
  });
});