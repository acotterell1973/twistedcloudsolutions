import C from "../src/scenes/Assistants/services/constants";
import {
  initializeAssistant,
  initializeAddress,
  initializeEmail,
  initializePhone,
  editAssistantName,
  editAddress

} from "../services/actions";
import { v4 } from "uuid";
import { assistants, assistant } from "./assistantsReducer";
import { storeFactory, intialState } from "../../../storeFactory";
import deepFreeze from "deep-freeze";

describe("assistants reducer", () => {
  let store;
  let assistantId = v4();
  let addressId = v4();
  beforeAll(() => {
    store = storeFactory();
    deepFreeze(store);
  });

  it("should INITIALIZE_ASSISTANT Reducer success", () => {
    store.dispatch(initializeAssistant(assistantId));
    expect(store.getState().assistants.length).toBe(1);
  });


  it("should INITIALIZE ASSISTANT ADDRESS Reducer success", () => {
    store.dispatch(initializeAddress(assistantId, addressId));
    expect(store.getState().assistants[0].address.length).toBe(1);
  });

  it("should INITIALIZE ASSISTANT PHONE Reducer success", () => {
    store.dispatch(initializePhone(assistantId, addressId));
    expect(store.getState().assistants[0].phoneNumber.length).toBe(1);
  });

  it("should INITIALIZE ASSISTANT EMAIL Reducer success", () => {
    store.dispatch(initializeEmail(assistantId, addressId));
    expect(store.getState().assistants[0].emailAddress.length).toBe(1);
  });

  it("should EDIT_ASSISTANT NAME action creator success", () => {
    store.dispatch(editAssistantName(assistantId, "John", "Doe", "Mr."));

    expect(store.getState().assistants[0].name).toEqual({
      first: "John",
      last: "Doe",
      title: "Mr."
    });
  });

  it("should EDIT_ADDRESS action creator success", () => {
    store.dispatch(
      editAddress(
        assistantId,
        addressId,
        2188,
        "Telogio Ct",
        null,
        "West Palm Beach",
        "FL",
        "33411"
      )
    );
    expect(store.getState().assistants[0].name).toEqual({
      first: "John",
      last: "Doe",
      title: "Mr."
    });
  });

  it("should EDIT_PHONE action creator success", () => {
    store.dispatch(
      editAddress(
        assistantId,
        addressId,
        2188,
        "Telogio Ct",
        null,
        "West Palm Beach",
        "FL",
        "33411"
      )
    );
    expect(store.getState().assistants[0].name).toEqual({
      first: "John",
      last: "Doe",
      title: "Mr."
    });
  });

  it("should EDIT_EMAIL action creator success", () => {
    store.dispatch(
      editAddress(
        assistantId,
        addressId,
        2188,
        "Telogio Ct",
        null,
        "West Palm Beach",
        "FL",
        "33411"
      )
    );
    expect(store.getState().assistants[0].name).toEqual({
      first: "John",
      last: "Doe",
      title: "Mr."
    });
  });
});
