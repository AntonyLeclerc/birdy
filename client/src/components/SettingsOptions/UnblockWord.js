import React, { useContext, useState } from 'react';
import CrossIcon from '../../img/icons/cross.png'
import UnbanCrossIcon from '../../img/icons/unbanning-cross.png'
import './UnblockWord.css'
import { useDispatch } from 'react-redux';
import { unblockAWord } from '../../actions/user.actions';
import { UidContext } from '../AppContext';

const UnblockWord = ({word}) => {

    const [isUnblocking, setIsUnblocking] = useState(false);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    const unblockWord = async () => {
        setIsUnblocking(!isUnblocking);
        await new Promise((resolve) => setTimeout(resolve, 150));
        const shouldUnblock = window.confirm("Débloquer le mot ?");
        if (shouldUnblock) {
          dispatch(unblockAWord(uid, word))
        } else {
          setIsUnblocking(false);
        }
    };
    
    
    return (
        
        <div className='unblock-word-container'>
            <p>{word}</p>
            <img src={isUnblocking ? UnbanCrossIcon : CrossIcon} alt="unban-word" onClick={unblockWord} className={isUnblocking ? "unblocking-word-cross" : "word-cross"}/>
        </div>
            
        
    );
};

export default UnblockWord;