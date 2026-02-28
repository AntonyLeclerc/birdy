import React, { useContext, useState } from 'react';
import { UidContext } from '../AppContext';
import { blockAWord } from '../../actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';

const BlockWord = () => {

    const [wordToBlock, setWordToBlock] = useState("");
    const [isBlockingWord, setIsBlockingWord] = useState(false)
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleBanWord = () => {
        if (wordToBlock.length < 1){
            window.alert("Veuillez entrer un mot / une expression à bloquer !");
            return;
        }
        if (userData.blockedWords.includes(wordToBlock.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
            window.alert(`${wordToBlock.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} est déjà bloqué !`);
            return;
        }
        if (window.confirm(`Voulez vous bloquer le mot : ${wordToBlock.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} ?`)){
            dispatch(blockAWord(uid, wordToBlock.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
            setIsBlockingWord(false);
        }
    }

    return (
        <div id="block-word-input">
            <button onClick={() => setIsBlockingWord(!isBlockingWord)}>{isBlockingWord ? "Annuler" : "Bannir un mot"}</button>
            
            {isBlockingWord ? <div id="banword-container">
                    <input placeholder='Mot à bannir' onChange={(e) => setWordToBlock(e.target.value)}/>
                    <button onClick={handleBanWord}>Confirmer</button>  
                </div> : ""
            }
        </div>
    );
};

export default BlockWord;