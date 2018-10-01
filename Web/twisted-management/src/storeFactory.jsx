import { createStore, combineReducers } from 'redux';
import { assistants } from './scenes/Assistants/reducers/assistantsReducer';
import { appConstants } from './appConstants';

export const storeFactory = (intialState) =>
    createStore(combineReducers({ assistants }),
        (localStorage[appConstants.LOCAL_STORE_NAME]) ? JSON.parse(localStorage[appConstants.LOCAL_STORE_NAME]) : intialState);


export const intialState = {
    assistants: [
        {
            "startWorkDate": null,
            "endWorkDate": null,
            "emailAddress": null,
            "phoneNumber": null,
            "address": null,
            "name": {
                "title": null,
                "first": "Andrew",
                "last": "Cotter"
            },
            "dob": null,
            "nationality": null,
            "genderType": 0,
            "id": "5b81ae5c3cca1e650447cb14"
        },
        {
            "startWorkDate": null,
            "endWorkDate": null,
            "emailAddress": null,
            "phoneNumber": null,
            "address": null,
            "name": null,
            "dob": null,
            "nationality": null,
            "genderType": 0,
            "id": "5b81d065d544815cb887c63a",
        }

    ]
}
