import C from "../services/constants";
import {
  addAssistant,
  editAssistantName,
  editAddress
} from "../services/actions";
import {
  v4
} from 'uuid';
import {
  assistants,
  assistant
} from "./assistantsReducer";
import {
  storeFactory,
  intialState
} from "../../../storeFactory";
import deepFreeze from "deep-freeze";

describe("assistants reducer", () => {
  let store;
let assistantId = v4();
  beforeAll(() => {
    store = storeFactory();
    deepFreeze(store);
 
  });

  it("should ADD_ASSISTANT Reducer success", () => {
    store.dispatch(addAssistant(assistantId));
    expect(store.getState().assistants.length).toBe(1);
  });

  it("should ADD_EDIT_ASSISTANT NAME action creator success", () => {
    store.dispatch(editAssistantName(assistantId, "John", "Doe", "Mr."));

    expect(store.getState().assistants[0].name).toEqual({
      first: "John",
      last: "Doe",
      title: "Mr."
    });
  });


  it("should ADD_EDIT_ADDRESS action creator success", () => {
   
    store.dispatch(editAddress(assistantId, 2188, "Telogio Ct", null, "West Palm Beach", "FL", "33411"));
    
    expect(store.getState().assistants[0].name).toEqual({
      first: "John",
      last: "Doe",
      title: "Mr."
    });
  });
});