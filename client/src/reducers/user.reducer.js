import { PIN_MESSAGE, UNPIN_MESSAGE } from "../actions/message.actions";
import { BLOCK_WORD, CHANGE_EMAIL, CHANGE_PASSWORD, FOLLOW_USER, GET_USER, UNBLOCK_WORD, UNFOLLOW_USER, UPDATE_BIO, UPDATE_PSEUDO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};


export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            }
        case UPDATE_BIO:
            return{
                ...state,
                bio: action.payload
            }
        case UPDATE_PSEUDO:
            return{
                ...state,
                pseudo: action.payload
            }
        case FOLLOW_USER:
            return{
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }
        case UNFOLLOW_USER:
            return{
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow),
            }
        
        case PIN_MESSAGE:
            return{
                ...state,
                pinnedMessage: action.payload.msgId
            }
        case UNPIN_MESSAGE:
            return{
                ...state,
                pinnedMessage: ""
            }
        
        case BLOCK_WORD:
            return{
                ...state,
                blockedWords: [action.payload.bword, ...state.blockedWords]
            }

        case UNBLOCK_WORD:
            return{
                ...state,
                blockedWords: state.blockedWords.filter((word) => word !== action.payload.bword),

            }

        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload.newMail
            }
        case CHANGE_PASSWORD:
            return {...state,
            }
        default:
            return state;
    }
}