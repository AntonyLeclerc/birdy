import axios from "axios";

export const GET_MESSAGES = "GET_MESSAGES"
export const LIKE_MESSAGE = "LIKE_MESSAGE"
export const UNLIKE_MESSAGE = "UNLIKE_MESSAGE"
export const UPDATE_MESSAGE = "UPDATE_MESSAGE"
export const DELETE_MESSAGE = "DELETE_MESSAGE"
export const CREATE_MESSAGE = "CREATE_MESSAGE"
export const SHARE_MESSAGE = "SHARE_MESSAGE"
export const UNSHARE_MESSAGE = "UNSHARE_MESSAGE"
export const PIN_MESSAGE = "PIN_MESSAGE"
export const UNPIN_MESSAGE = "UNPIN_MESSAGE"

export const ADD_COMMENT = "ADD_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

export const getMessages = (number) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/msgs`)
            .then((res) => {
              const array = res.data.slice(0,number)
              dispatch({type: GET_MESSAGES, payload: array})
            })
            .catch((err) => {
                console.log(err)
            });
    };
};


export const likeMessage = (msgId, likerId) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/like-msg/` + msgId,
      data: {id: likerId},
    })
      .then((res) => {
        dispatch({type: LIKE_MESSAGE, payload: {msgId, likerId}});
      })
      .catch((err) => console.log(err));
  };
};

export const unlikeMessage = (msgId, likerId) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/unlike-msg/` + msgId,
      data: {id: likerId},
    })
      .then((res) => {
        dispatch({type: UNLIKE_MESSAGE, payload: {msgId, likerId}});
      })
      .catch((err) => console.log(err));
  };

};


export const updateMessage = (messageId, newMsg) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/msgs/update-msg/${messageId}`,
        data: { newMsg },
      })
        .then((res) => {
          // Ajoutez cette requête axios pour mettre à jour les messages dans l'état de l'application
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/msgs`)
            .then((res) => {
              dispatch({ type: GET_MESSAGES, payload: res.data });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


export const deleteMessage = (msgId) => {
  return (dispatch) => {
    return axios({
      method:"delete",
      url: `${process.env.REACT_APP_API_URL}api/msgs/${msgId}`,
    })
    .then((res) => {
      dispatch({type: DELETE_MESSAGE, payload: {msgId}})
    }) 
    .catch((err) => {
      console.log(err);
    })
  }

}

export const createMessage = (contenu,uid) => {
  return (dispatch) => {
    return axios({
      method:"POST",
      url: `${process.env.REACT_APP_API_URL}api/msgs/`,
      data: {userId: uid, msg: contenu}
    })
  }
}

export const shareMessage = (msgId, sharerId) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/share/` + msgId,
      data: {sharerId: sharerId},
    })
      .then((res) => {
        dispatch({type: SHARE_MESSAGE, payload: {msgId, sharerId}});
      })
      .catch((err) => console.log(err));
  };
};

export const unshareMessage = (msgId, sharerId) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/unshare/` + msgId,
      data: {sharerId: sharerId},
    })
      .then((res) => {
        dispatch({type: UNSHARE_MESSAGE, payload: {msgId, sharerId}});
      })
      .catch((err) => console.log(err));
  };

};

export const pinMessage = (msgId, uid) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/ping/${msgId}`,
      data: {userId: uid},
    })
      .then((res) => {
        dispatch({type: PIN_MESSAGE, payload: {msgId, uid}});
      })
      .catch((err) => console.log(err));
  };
};

export const unpinMessage = (uid) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/unping/${uid}`,
    })
      .then((res) => {
        dispatch({type: UNPIN_MESSAGE, payload: {uid}});
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/msgs/comment/${postId}`,
      data: {commenterId: commenterId, commenterPseudo: commenterPseudo, text: text}
    })
      .then((res) => {
        dispatch({type: ADD_COMMENT, payload: {postId}});
      })
      .catch((err) => console.log(err));
  }
}

export const deleteComment = (cId, msgId) => {
  return (dispatch) => {
    return axios({
      method:"delete",
      url: `${process.env.REACT_APP_API_URL}api/msgs/deleteComment/${msgId}`,
      data: { commentId: cId},
    })
    .then((res) => {
      dispatch({type: DELETE_COMMENT, payload: {cId, msgId}})
    })
    .catch((err) => console.log(err));
  }
}