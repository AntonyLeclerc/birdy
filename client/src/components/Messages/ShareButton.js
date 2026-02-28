import React, { useContext, useEffect, useState } from 'react';
import RetweetIcon from '../../img/icons/retweet.png'
import RetweetedIcon from '../../img/icons/retweeted.png'
import { UidContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { shareMessage, unshareMessage } from '../../actions/message.actions';


const ShareButton = ( {post} ) => {
    const uid = useContext(UidContext);
    const [isShared, setIsShared] = useState(false);
    const dispatch = useDispatch();
    
    const share = () => {
        if (!window.confirm("Voulez vous partager ce message ?")){
            return;
        }
        
        dispatch(shareMessage(post._id, uid));
        setIsShared(true);
    }
    const unshare = () => {
        if (!window.confirm("Voulez vous annuler le partager ce message ?")){
            return;
        }
        dispatch(unshareMessage(post._id, uid));
        setIsShared(false);
    }

    const shareNotConnected = () => {
        alert ("Connectez vous pour pouvoir partager un message !")
    }

    useEffect(() => {
        if (post.sharers.includes(uid)) setIsShared(true);
        else setIsShared(false);
    }, [uid, post.sharers, isShared])

    return (
        <span className="retweet-action" >
            {isShared ? 
                <img onClick={unshare} src={RetweetedIcon} alt="retweet" className="retweet-icon"/>
                
                :
                
                (uid ? <img onClick={share} src={RetweetIcon} alt="retweet" className="retweet-icon"/> :
                !uid && <img onClick={shareNotConnected} src={RetweetIcon} alt="retweet" className="retweet-icon"/>)

                
                }

            <p>{post.sharers.length}</p>
        </span>
    );
};

export default ShareButton;