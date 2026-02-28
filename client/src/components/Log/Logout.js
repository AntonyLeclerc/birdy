import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";
import LogoutIcon from '../../img/icons/logout.svg'



const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined"){
            cookie.remove(key, {expires: 1});
        }
    }

    const logout = async () => {
        await axios({
            method:'delete',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err));
        
        window.location = "/";
    }

    return (
        <div onClick={logout} id="logout-button">
            <img src={LogoutIcon} alt="logout" />
            <p>Log out</p>
        </div>
        
    );
};

export default Logout;