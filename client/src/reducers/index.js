import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import messagesReducer from "./messages.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    messagesReducer,
});