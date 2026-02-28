import React, { useContext, useEffect, useState } from 'react';
import LikeIcon from '../../img/icons/like.svg'
import LikedIcon from '../../img/icons/liked.svg'
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { likeMessage, unlikeMessage } from '../../actions/message.actions';

const LikeButton = ( {post} ) => {

    const [isLiked, setIsLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likeMessage(post._id, uid));
        setIsLiked(true);
    }

    const unlike = () => {
        dispatch(unlikeMessage(post._id, uid));
        setIsLiked(false);
    }

    const likeNotConnected = () => {
        alert ("Connectez vous pour pouvoir liker un message !")
    }

    useEffect(() => {
        if (post.likers.includes(uid)) setIsLiked(true);
        else setIsLiked(false);
    }, [uid, post.likers, isLiked])

    return (
        <>
        {uid && <span className="like-action">
            {isLiked && uid ? <img onClick={unlike} src={LikedIcon} alt="retweet" className="like-icon"/> : <img onClick={like} src={LikeIcon} alt="retweet" className="like-icon"/>}
            <p>{post.likers.length}</p>
        </span>}

        {!uid && <span className="like-action" onClick={likeNotConnected}>
            {isLiked && uid ? <img src={LikedIcon} alt="retweet" className="like-icon"/> : <img src={LikeIcon} alt="retweet" className="like-icon"/>}
            <p>{post.likers.length}</p>
        </span>}
        </>
    );
};

export default LikeButton;