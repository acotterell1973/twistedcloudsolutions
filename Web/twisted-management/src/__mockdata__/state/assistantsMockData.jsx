import Chance from 'chance';
var generateAssistancesData = function () {
  let chance = new Chance();
  chance.mixin({
    'user': function () {
      return {
        name: {
          title: chance.prefix(),
          first: chance.first(),
          last: chance.last()
        },
        address: [
          {
            id: chance.guid({ version: 5 }),
            streetNumber: chance.integer({ min: 2000, max: 2500 }),
            streetName: chance.street({ country: 'us' }),
            unitName: null,
            city: chance.city(),
            state: chance.state({ country: 'us' }),
            postCode: chance.zip()
          }
        ],
        startWorkDate: chance.date({ string: true }),
        endWorkDate: null,
        emailAddress: [
          {
            id: chance.guid({ version: 5 }),
            email: chance.email({ domain: 'gmail.com' }),
            emailType: null
          }
        ],
        phoneNumber: [
          {
            id: chance.guid({ version: 5 }),
            number: chance.phone(),
            phoneType: null
          }
        ],
        dob: chance.birthday({ string: true }),
        nationality: '',
        genderType: chance.gender()
      };
    }
  });
  var assistants = [];
  for (let i = 0; i < 39; i++) {
    assistants.push(chance.user());
  }
  return assistants;
  // Then you can call your mixin
  //console.log("user " + JSON.stringify(chance.user(), null, '\t'));

}

const assistantsMockData = {

  assistants: [
    {
      startWorkDate: '07/16/2017',
      endWorkDate: null,
      emailAddress: [
        {
          id: 2,
          email: "acotterell@gmail.com",
          emailType: null
        }
      ],
      phoneNumber: [

        {
          id: 1,
          number: "954-559-3068",
          phoneType: null
        }
      ],
      address: null,
      name: {
        title: null,
        first: "Andrew",
        last: "Cotterell"
      },
      dob: null,
      nationality: null,
      genderType: 0,
      id: "5b81ae5c3cca1e650447cb14"
    },
    {
      startWorkDate: null,
      endWorkDate: null,
      emailAddress: [
        {
          id: 3,
          email: "acotterell@hotmail.com",
          emailType: null
        }
      ],
      phoneNumber: [

        {
          id: 1,
          number: "305-898-4588",
          phoneType: null
        }
      ],
      address: [],
      name: {
        title: null,
        first: "Susan",
        last: "Salamon"
      },
      dob: null,
      nationality: null,
      genderType: 0,
      id: "5b81d065d544815cb887c63a"
    }, ...generateAssistancesData()]
};
//console.log("user " + JSON.stringify(assistantsMockData, null, '\t'));

export default assistantsMockData;