import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

it('renders without crashing', () => {

  //adding name
const action_add_name = {
  type: C.ADD_ASSISTANT_NAME,
  id: "5b81ae5c3cca1e650447cb14",
  title: "Mr.",
  first: "Andrew",
  last: "Cotterell"
}
//adding name
const action_add_address = {
  type: C.ADD_ASSISTANT_ADDRESS,
  id: "5b81ae5c3cca1e650447cb14",
  streetNumber: 2188,
  streetName: "Telogia Ct",
  unitName: null,
  city: "West Palm Beach",
  state: "FL",
  postCode: "33411"
}

const action_add_phone = {
  type: C.ADD_ASSISTANT_PHONE,
  id: "5b81ae5c3cca1e650447cb14",
  number: 9545593068,
  phoneType: "Mobile"
}

const action_add_email = {
  type: C.ADD_ASSISTANT_EMAIL,
  id: "5b81ae5c3cca1e650447cb14",
  email: "acotterell1973@gmail.com",
  emailType: "Primary"
}

const state = {
  startWorkDate: null,
  endWorkDate: null,
  emailAddress: null,
  phoneNumber: null,
  address: null,
  name: null,
  dob: null,
  nationality: null,
  genderType: 0,
  id: "5b81ae5c3cca1e650447cb14",

}

console.log(assistant(state, action_add_name));
console.log(assistant(state, action_add_address));
console.log(assistant(state, action_add_phone));
console.log(assistant(state, action_add_email));




  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
