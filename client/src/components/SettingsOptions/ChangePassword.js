import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../actions/user.actions';
import { UidContext } from '../AppContext';
import './ChangePassword.css'

const ChangePassword = () => {

    const uid = useContext(UidContext);
    const [newPass1, setNewPass1] = useState("");
    const [newPass2, setNewPass2] = useState("");
    const dispatch = useDispatch();
    const [hasChanged, setHasChanged] = useState(false);
    const [changing, setChanging] = useState(false);
    const input1 = document.getElementById("pwd1")
    const input2 = document.getElementById("pwd2")
    const [showPasswords, setShowPasswords] = useState(false);

    const handleChangePassword = async () => {
        dispatch(changePassword(uid, newPass1));
        setHasChanged(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setHasChanged(false);
        input1.value = "";
        input2.value = "";
        setNewPass1("")
        setNewPass2("")
        setChanging(false);

    }


    return (
        <div className='change-password-container'>
            <button id={changing ? "change-pwd-active" : "change-pwd"} onClick={() => setChanging(!changing)}>Changer de mot de passe</button>
            {changing ? <div className='password-container'>
                <div className='passwords'>
                    <div id="pwd1"><label>Nouveau mot de passe : </label><input id="pwd1" type={showPasswords ? "text" : "password"} onChange={(e) => setNewPass1(e.target.value)}/></div>
                    <div id="pwd2"><label>Confirmer nouveau mot de passe : </label><input id="pwd2" type={showPasswords ? "text" : "password"} onChange={(e) => setNewPass2(e.target.value)}/></div>
                </div>
                <button onClick={() => setShowPasswords(!showPasswords)}>Montrer mots de passe</button>

                <p style={{color:"red"}}>{newPass1 !== newPass2 && "Les mots de passe sont différents !"}</p>
                <p style={{color:"red"}}>{newPass1 === newPass2 && newPass1.length < 6 && "Le mot de passe choisi est trop court !"}</p>
                {newPass1 === newPass2 && newPass1.length >= 6 && <button onClick={handleChangePassword} id="validate-new-pwd">Valider nouveau mot de passe !</button>}
                {hasChanged ? "Mot de passe modifié !" : null}
            </div> : null}
        </div>
    );
};

export default ChangePassword;