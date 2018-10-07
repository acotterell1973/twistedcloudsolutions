import C from "../services/constants";

const assistantDetail = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_ASSISTANT:
      return {
        startWorkDate: null,
        endWorkDate: null,
        emailAddress: [
          {
            email: null,
            emailType: null
          }
        ],
        phoneNumber: [
          {
            number: null,
            phoneType: null
          }
        ],
        address: [
          {
            streetNumber: null,
            streetName: null,
            unitName: null,
            city: null,
            state: null,
            postCode: null
          }
        ],
        name: {
          title: null,
          first: null,
          last: null
        },
        dob: null,
        nationality: null,
        genderType: 0,
        id: action.id
      };

    case C.EDIT_ASSISTANT_NAME:
      return {
        ...state,
        title: action.title,
        first: action.first,
        last: action.last
      };

    case C.EDIT_ASSISTANT_ADDRESS:
      return {
        ...state,
        streetNumber: action.streetNumber,
        streetName: action.streetName,
        unitName: action.unitName,
        city: action.city,
        state: action.state,
        postCode: action.postCode
      };

    case C.EDIT_ASSISTANT_PHONE:
      return {
        ...state,
        number: action.number,
        phoneType: action.phoneType
      };

    case C.EDIT_ASSISTANT_EMAIL:
      return {
        ...state,
        email: action.email,
        emailType: action.emailType
      };

    default:
      return state;
  }
};

export const assistant = (state = {}, action) => {
  let assistant = {
    ...state
  };

  switch (action.type) {
    case C.ADD_ASSISTANT:
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
      let { emailAddress } = assistant;
      let emailAddressrEntry = assistantDetail(emailAddress.first || {},action);
      assistant.emailAddress = [{ ...emailAddressEntry }];
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
            genderType: action.genderType,
          };

    default:
      return state;
  }
};

export const assistants = (state = [], action) => {
//  console.log("INCOMMING STATE =>" + JSON.stringify(state));
  switch (action.type) {
    case C.ADD_ASSISTANT:
      return [...state, assistant({}, action)];

    case C.EDIT_ASSISTANT_NAME:
    case C.EDIT_ASSISTANT_ADDRESS:
    case C.EDIT_ASSISTANT_PHONE:
    case C.EDIT_ASSISTANT_EMAIL:
      return state.map(entity => assistant(entity, action));

    //case C.REMOVE_ASSISTANT:
      //state.filter(assistant => assistant.Id != action.Id);
      //break;
    default:
      return state;
  }
};
