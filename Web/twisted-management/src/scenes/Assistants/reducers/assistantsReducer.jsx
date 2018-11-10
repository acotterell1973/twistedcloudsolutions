import C from "../services/constants";
import assistantDetail from "./assistantDetailReducer";

export const assistant = (state = {}, action) => {
  let assistant = {
    ...state
  };

  switch (action.type) {
    case C.ADD_ASSISTANT:
    case C.ADD_ASSISTANT_ADDRESS:
    case C.ADD_ASSISTANT_PHONE:
    case C.ADD_ASSISTANT_EMAIL:
      return assistantDetail(state, action);

    case C.EDIT_ASSISTANT_NAME:
      let { name } = assistant;
      assistant.name = assistantDetail(name, action);
      return assistant;

    case C.EDIT_ASSISTANT_ADDRESS:
      if (state.id !== action.id) return state;
      let { address } = assistant;
      let addressEntry = assistantDetail(address.first || {}, action);
      assistant.address = [{ ...addressEntry }];
      return assistant;

    case C.EDIT_ASSISTANT_PHONE:
      if (state.id !== action.id) return state;
      let { phoneNumber } = assistant;
      let phoneNumberEntry = assistantDetail(phoneNumber.first || {}, action);
      assistant.phoneNumber = [{ ...phoneNumberEntry }];
      return assistant;

    case C.EDIT_ASSISTANT_EMAIL:
      if (state.id !== action.id) return state;
   
      return assistant;

    case C.EDIT_ASSISTANT:
      return state.id !== action.id
        ? state
        : {
            ...state,
            startWorkDate: action.startWorkDate,
            endWorkDate: action.endWorkDate,
            dob: action.dob,
            nationality: action.nationality,
            genderType: action.genderType
          };
    case C.GET_ASSISTANT:
      return state.id !== action.id ? state : { ...state };

    default:
      return state;
  }
};

export const assistants = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ASSISTANT:
      return [...state, assistant({}, action)];

    case C.ADD_ASSISTANT_ADDRESS:
    case C.ADD_ASSISTANT_PHONE:
    case C.ADD_ASSISTANT_EMAIL:
      return state.map(entity => assistant(entity, action));

    case C.EDIT_ASSISTANT_NAME:
    case C.EDIT_ASSISTANT_ADDRESS:
    case C.EDIT_ASSISTANT_PHONE:
    case C.EDIT_ASSISTANT_EMAIL:
      return state.map(entity => assistant(entity, action));

    case C.GET_ASSISTANT:
      return state.reduce(entity => assistant(entity, action));

    //case C.REMOVE_ASSISTANT:
    //state.filter(assistant => assistant.Id != action.Id);
    //break;
    default:
      return state;
  }
};
