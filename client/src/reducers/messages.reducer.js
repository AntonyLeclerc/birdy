import {
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGES,
  LIKE_MESSAGE,
  SHARE_MESSAGE,
  UNSHARE_MESSAGE,
  UNLIKE_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_COMMENT,
} from "../actions/message.actions";

const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;

    case LIKE_MESSAGE:
      return state.map((post) => {
        if (post._id === action.payload.msgId) {
          return {
            ...post,
            likers: [action.payload.likerId, ...post.likers],
          };
        }
        return post;
      });

    case UNLIKE_MESSAGE:
      return state.map((post) => {
        if (post._id === action.payload.msgId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.likerId),
          };
        }
        return post;
      });

    case UPDATE_MESSAGE:
      return state.map((msg) => {
        if (msg._id === action.payload.messageId)
          return {
            ...msg,
            messages: action.payload.message,
          };
        else return msg;
      });

    case DELETE_MESSAGE:
      return state.filter((post) => post._id !== action.payload.msgId);

    case SHARE_MESSAGE:
      return state.map((post) => {
        if (post._id === action.payload.msgId) {
          return {
            ...post,
            sharers: [action.payload.sharerId, ...post.sharers],
          };
        }
        return post;
      });

    case UNSHARE_MESSAGE:
      return state.map((post) => {
        if (post._id === action.payload.msgId) {
          return {
            ...post,
            sharers: post.sharers.filter(
              (id) => id !== action.payload.sharerId
            ),
          };
        }
        return post;
      });

      case DELETE_COMMENT:
        return state.map((post) => {
          if (post._id === action.payload.msgId) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== action.payload.commentId
              ),
            };
          } else return post;
        });
      
    default:
      return state;
  }
}
