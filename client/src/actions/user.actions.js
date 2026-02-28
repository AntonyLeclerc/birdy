import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPDATE_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const BLOCK_WORD = "BLOCK_WORD";
export const UNBLOCK_WORD = "UNBLOCK_WORD";
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";


export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, userId) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (bio, userId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePseudo = (newPseudo, userId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/pseudo/${userId}`,
      data: { pseudo: newPseudo },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PSEUDO, payload: newPseudo });
      })
      .catch((err) => console.log(err));
  };
};

export const blockAWord = (uid, bword) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/banword/${uid}`,
      data: { banWord: bword },
    })
      .then((res) => {
        dispatch({ type: BLOCK_WORD, payload: {uid, bword} });
      })
      .catch((err) => console.log(err));
  };
};

export const unblockAWord = (uid, bword) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/unbanword/${uid}`,
      data: { banWord: bword },
    })
      .then((res) => {
        dispatch({ type: UNBLOCK_WORD, payload: {uid, bword} });
      })
      .catch((err) => console.log(err));
  };
};

export const changeEmail = (uid, newMail) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/email/${uid}`,
      data: { email: newMail },
    })
      .then((res) => {
        dispatch({ type: CHANGE_EMAIL, payload: {uid, newMail} });
      })
      .catch((err) => console.log(err));
  };
};

export const changePassword = (uid, newPassword) => {
  return (dispatch) => {
    return axios({
      method:"put",
      url: `${process.env.REACT_APP_API_URL}api/user/password/${uid}`,
      data: {enteredPassword: newPassword},
    })
    .then((res) => {
      dispatch({type: CHANGE_PASSWORD})
    })
    .catch((err) => console.log(err));
  }
}