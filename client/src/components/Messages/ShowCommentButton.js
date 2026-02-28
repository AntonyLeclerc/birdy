import React, { useContext, useEffect, useState } from 'react';
import CommentIcon from '../../img/icons/comments.png'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import { getMessages } from '../../actions/message.actions';
import { UidContext } from '../AppContext';

const ShowCommentButton = ({post}) => {

    const [showing, setShowing] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    useEffect(() => {
        !isEmpty(usersData[0]) && getMessages();
    }, [usersData]);

    const handleShowcomment = () => {
        if(!uid){
            window.alert("Connectez vous pour pouvoir voir les commentaires !")
        }
    }

    return (
        <>
        {uid && <div className='like-action'>
            <img src={CommentIcon} alt="comments" className='comments-icon'/>
            <p>{post.comments.length}</p>
        </div>}

        {!uid && <div className='like-action' onClick={handleShowcomment}>
        <img src={CommentIcon} alt="comments" className='comments-icon'/>
        <p>{post.comments.length}</p>
        </div>}

        </>

        
    );
};

export default ShowCommentButton;