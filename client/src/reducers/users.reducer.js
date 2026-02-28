import { DELETE_ACCOUNT } from "../actions/users.actions";
import { GET_USERS } from "../actions/users.actions";

const initialState = {};

export default function usersReducer(state=initialState, action){
    switch(action.type){
        case GET_USERS:
            return action.payload;
        case DELETE_ACCOUNT:
            return state.filter((user) => user._id !== action.payload.uid);
        default:
            return state;
    }
}