import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { changeEmail } from '../../actions/user.actions';

const ChangeEmail = () => {


    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validerChangementEmail = () => {
        dispatch(changeEmail(uid, newEmail))
        setChangeMail(false);
        setNewEmail("");
        showHasChanged();
        setIsValid(false);
    }

    const showHasChanged = async () => {
        setHasChanged(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setHasChanged(false);
        window.location = window.location
    }
    
    const [changeMail, setChangeMail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    
    return (
        <div id="change-mail-container">
            <button onClick={() => setChangeMail(!changeMail)} id={changeMail ? "wanna-change-email-active" : "wanna-change-email" }>Changer de mail</button>
            {changeMail ? 
            <div >
            <p>Email actuel : {userData.email}</p>
            <div id="change-mail">
                
                <textarea onChange={(e) => setNewEmail(e.target.value) && setIsValid(true)}/>
                {!validateEmail(newEmail) ? <p style={{color: "red"}}>L'email selectionnée n'est pas valide</p> : "" && setIsValid(false)}
                {usersData.find((user) => user.email === newEmail.toLowerCase() && user._id !== userData._id ) ? <p style={{color: "red"}}>L'email selectionnée est déjà prise</p> : "" && setIsValid(false)}
                {userData.email.toLowerCase() === newEmail.toLowerCase() ? <p style={{color: "red"}}>L'email selectionnée ne peut pas être identique à l'ancienne</p> : "" && setIsValid(false)}
                {validateEmail(newEmail) && !usersData.find((user) => user.email === newEmail.toLowerCase()) ? 
                    !isValid && <button id="validate-change-email" onClick={validerChangementEmail}>
                        Valider !
                    </button> : ""}
            </div>
            </div>

            : 
            null}
            {hasChanged ? <p id="has-changed-mail">Votre mail a correctement été modifié</p> : ""}
            
        </div>
    );
};

export default ChangeEmail;