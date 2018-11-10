import C from "../services/constants";

const assistantDetail = (state = {}, action) => {
  let assistant = {
    ...state
  };

  switch (action.type) {
    case C.ADD_ASSISTANT_PHONE:
      if (state.id !== action.id) return state;

      let { phoneNumber } = assistant;
      assistant.phoneNumber = [
        ...phoneNumber,
        {
          id: action.phoneId,
          number: '',
          phoneType: ''
        }
      ];
      return assistant;


    case C.ADD_ASSISTANT_EMAIL:
      if (state.id !== action.id) return state;

      let { emailAddress } = assistant;
      assistant.emailAddress = [
        ...emailAddress,
        {
          id: action.emailId,
          email: '',
          emailType: ''
        }
      ];
      return assistant;


    case C.ADD_ASSISTANT_ADDRESS:
      if (state.id !== action.id) return state;

      let { address } = assistant;
      assistant.address = [
        ...address,
        {
          id: action.addressId,
          streetNumber: '',
          streetName: '',
          unitName: '',
          city: '',
          state: '',
          postCode: ''
        }
      ];
      return assistant;

    case C.ADD_ASSISTANT:
      return {
        startWorkDate: '',
        endWorkDate: '',
        emailAddress: [],
        phoneNumber: [],
        address: [],
        name: {
          title: '',
          first: '',
          last: ''
        },
        dob: '',
        nationality: '',
        genderType: 0,
        id: action.id
      };

    case C.EDIT_ASSISTANT_NAME:
      return {
        ...state,
        title: action.title || state.title,
        first: action.first || state.first,
        last: action.last || state.last
      };

    case C.EDIT_ASSISTANT_ADDRESS:
      return {
        ...state,
        streetNumber: action.streetNumber || state.streetNumber,
        streetName: action.streetName || state.streetName,
        unitName: action.unitName || state.unitName,
        city: action.city || state.city,
        state: action.state || state.state,
        postCode: action.postCode || state.postCode
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

      case C.EDIT_ASSISTANT:
      return {
        ...state,
        startWorkDate: action.startWorkDate || state.startWorkDate,
        endWorkDate: action.endWorkDate || state.endWorkDate,
        dob: action.dob || state.dob,
        nationality: action.nationality || state.nationality,
        genderType: action.genderType || state.genderType
      };

    default:
      return state;
  }
};

export default assistantDetail;
