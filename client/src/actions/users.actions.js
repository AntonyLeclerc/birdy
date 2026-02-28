import axios from 'axios';
import cookie from "js-cookie";


export const GET_USERS = "GET_USERS"
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";


export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/`)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data})
            })
            .catch((err) => console.log(err));
    };
};

export const deleteAccount = (uid) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      })
      .then((res) => {
        dispatch({type: DELETE_ACCOUNT, payload: uid})
      })
      .catch((err) => console.log(err))
    }
  }