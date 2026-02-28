import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import './CreateMessageForm.css'
import { createMessage, getMessages } from '../../actions/message.actions';

const CreateMessageForm = ({type}) => {


    const currentArea = document.getElementsByClassName("create-message-area")

    const [isLoading, setIsLoading] = useState(true);

    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isEmpty(userData)){
            setIsLoading(false);
        }
    }, [userData])

    const cancelPost = () => {
        setIsTyping(false);
        setMessage("");
        currentArea.value = "";
    }

    const handleCreerMessage = async () => {
        let newStr = message.replace(/(\r\n|\n|\r)/gm, "");
        if (newStr === "" || newStr === null || newStr.length === 0){
            alert("Veuillez entrer un message !");
            return;
        }
        if (message.trim().length === 0 || message.trim() === "" || message.trim() === null){
            alert("Veuillez entrer un message !");
            return;
        }
        if (message){
            await dispatch(createMessage(message, userData._id));
            dispatch(getMessages());
            cancelPost();

        } else {
            alert("Veuillez entrer un message");
        }
    }

    return (
        <>
        {type==="in-profile-form" && <div className='create-message'>
            {
                isLoading ?
                    <p>Loading</p>
                :
                <>
                <div className='create-msg-form'>
                    
                    <textarea placeholder="Comment vous sentez vous aujourd'hui ?" className='create-message-area' onChange={(e) => setMessage(e.target.value)} value={message}/>
                    {message ? 
                    <div className="buttons-msg-form">
                        <button id="send-button" onClick={handleCreerMessage}>Envoyer !</button>
                        <button id="cancel-button" onClick={cancelPost}>Annuler</button>
                    </div> : 
                    
                    null
                    }
                </div>
                </>

            }
        </div>}

        {type==="in-home-form" && <div className='create-message'>
            {
                isLoading ?
                    <p>Loading</p>
                :
                <>
                <img src={userData.picture} alt='user-picturee' className='user-picture'/>
                <div className='create-msg-form'>
                    
                    <textarea placeholder="Comment vous sentez vous aujourd'hui ?" className='create-message-area' onChange={(e) => setMessage(e.target.value)} value={message}/>
                    {message ? <div className="buttons-msg-form">
                        <button id="send-button" onClick={handleCreerMessage}>Envoyer !</button>
                        <button id="cancel-button" onClick={cancelPost}>Annuler</button>
                    </div> : null}
                </div>
                </>

            }
        </div>}
        </>
    );
};

export default CreateMessageForm;