import C from './constants';
import fetchThenDispatch from './fetchData'
import { v4 } from 'uuid';

export const addAssistantName = (first, last, title) => (dispatch, getState) => 
    fetchThenDispatch(dispatch({
        type: C.ADD_ASSISTANT_NAME,
        id: v4(),
        first,
        last,
        title
    }),'/api/colors','POST', JSON.stringify({first,last}));
    


export const editAssistantName = (id, first, last, title) => ({
    type: C.EDIT_ASSISTANT_NAME,
    id,
    first,
    last,
    title
})

export const getAddress = (id, getState) =>({
    type: C.EDIT_ASSISTANT_ADDRESS,
    id
})

export const editAddress = (id,field, value) =>({
    type: C.EDIT_ASSISTANT_ADDRESS,
    id,
    [field]: value
})