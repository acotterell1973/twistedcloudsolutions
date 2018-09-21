import C from "../services/constants";
export const assistantDetail = (state = {}, action) => {
  switch (action.type) {
    case C.EDIT_ASSISTANT_NAME:
      return {
        title: action.title,
        first: action.first,
        last: action.last
      };

    case C.EDIT_ASSISTANT_ADDRESS:
      return [{
        streetNumber: action.streetNumber,
        streetName: action.streetName,
        unitName: action.unitName,
        city: action.city,
        state: action.state,
        postCode: action.postCode
      }]

    case C.EDIT_ASSISTANT_PHONE:
      return {
        number: action.number,
        phoneType: action.phoneType
      }

    case C.EDIT_ASSISTANT_EMAIL:
      return [{
        email: action.email,
        emailType: action.emailType
      }]

    default:
      return state;
  }
}

export const assistant = (state = {}, action) => {
  switch (action.type) {
    case C.EDIT_ASSISTANT_NAME:
      return (state.id !== action.id) ? state : {
        ...state,
        name: assistantDetail(state, action)
      }

    case C.EDIT_ASSISTANT_ADDRESS:
      return (state.id !== action.id) ? state : {
        ...state,
        address: assistantDetail(state, action)
      }

    case C.EDIT_ASSISTANT_PHONE:
      return (state.id !== action.id) ? state : {
        ...state,
        phoneNumber: assistantDetail(state, action)
      }

    case C.EDIT_ASSISTANT_EMAIL:
      return (state.id !== action.id) ? state : {
        ...state,
        emailAddress: assistantDetail(state, action)
      }

    case C.ADD_ASSISTANT:
      return (state.id !== action.id) ? state : {
        ...state,
        startWorkDate: action.startWorkDate,
        endWorkDate: action.endWorkDate,
        dob: action.dob,
        nationality: action.nationality,
        genderType: action.genderType,
        id: action.id,
      };

    default:
      return state;
  }
};

export const assistants = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ASSISTANT:
      return [...state, assistant({}, action)];

    case C.EDIT_ASSISTANT_NAME:
    case C.EDIT_ASSISTANT_ADDRESS:
    case C.EDIT_ASSISTANT_PHONE:
    case C.EDIT_ASSISTANT_EMAIL:
      return state.map(entity => assistant(entity, action));

    case C.REMOVE_ASSISTANT:
      state.filter(assistant => assistant.Id != action.Id);
      break;
    default:
      return state;
  }
};


