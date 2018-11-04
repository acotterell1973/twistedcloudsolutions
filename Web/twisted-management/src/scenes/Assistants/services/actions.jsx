import C from "./constants";
import fetchThenDispatch from "./fetchData";
import { v4 } from "uuid";

export const initializeAssistant = id => ({
  type: C.ADD_ASSISTANT,
  id: id || v4()
});

export const initializeEmail = (id, emailId) => ({
  type: C.ADD_ASSISTANT_EMAIL,
  id,
  emailId
});

export const initializePhone = (id, phoneId) => ({
  type: C.ADD_ASSISTANT_PHONE,
  id,
  phoneId
});

export const initializeAddress = (id, addressId) => ({
  type: C.ADD_ASSISTANT_ADDRESS,
  id,
  addressId
});


export const addAssistantName = (id, first, last, title) => (
  dispatch,
  getState
) =>
  fetchThenDispatch(
    dispatch({
      type: C.ADD_ASSISTANT_NAME,
      id,
      first,
      last,
      title
    }),
    "/api/colors",
    "POST",
    JSON.stringify({ first, last })
  );

export const editAssistantName = (id, first, last, title) => ({
  type: C.EDIT_ASSISTANT_NAME,
  id,
  first,
  last,
  title
});

export const getAddress = (id, getState) => ({
  type: C.EDIT_ASSISTANT_ADDRESS,
  id
});

export const editAddress = (
  id,
  addressId,
  streetNumber,
  streetName,
  unitName,
  city,
  state,
  postCode
) => ({
  type: C.EDIT_ASSISTANT_ADDRESS,
  id,
  addressId,
  streetNumber,
  streetName,
  unitName,
  city,
  state,
  postCode
});

export const editAssistantPhone = (id, number, phoneType) => ({
  type: C.EDIT_ASSISTANT_PHONE,
  id,
  number,
  phoneType,
});

export const editAssistantEmail = (id, email, emailType) => ({
  type: C.EDIT_ASSISTANT_EMAIL,
  id,
  email,
  emailType,
});

export const getAssistant = (id) => ({
  type: C.GET_ASSISTANT,
  id
});