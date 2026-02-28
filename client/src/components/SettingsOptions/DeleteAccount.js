import React, { useContext } from 'react';
import './DeleteAccount.css'
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../actions/users.actions';
import { UidContext } from '../AppContext';
import cookie from 'js-cookie';
import axios from 'axios'

const DeleteAccount = () => {

    const dispatch = useDispatch();
    const uid = useContext(UidContext);

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

    const handleDeleteAccount = () => {
        if (window.confirm("Voulez vous supprimer ce compte ? ")){
            if (window.confirm("Veuillez re-confirmer ? ")){
                logout();
                dispatch(deleteAccount(uid));
                window.alert("Compte supprimé")
            }
        }
    }
    
    return (
        <div>
            <button id="delete-account-button" onClick={handleDeleteAccount}>Supprimer le compte</button>
        </div>
    );
};

export default DeleteAccount;