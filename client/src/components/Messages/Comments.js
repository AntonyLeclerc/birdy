import React, { useContext, useEffect, useState } from 'react';
import CommentIcon from '../../img/icons/comments.png'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import FollowHandler from '../Profil/FollowHandler';
import { addComment, getMessages } from '../../actions/message.actions';
import DeleteComment from './DeleteComment';
import { getUser } from '../../actions/user.actions';
import { UidContext } from '../AppContext';

const Comments = ({post}) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        !isEmpty(usersData[0]) && getMessages() && getUser();
    }, [usersData, post]);
    
    const handleSendComment = () => {
        if (newComment) {
            dispatch(addComment(post._id, userData._id, newComment, userData.pseudo))
                .then(() => dispatch(getMessages()))
                .then(() => setNewComment(""));
        }
        
    }

    

    return (
            
            <div className='comments-container'>
                
                {post.comments.map((comment) => {
                    return <div className='commentaire'>
                            <div className='commentaire-user'>
                            <div className='comment-pseudo-follow'>

                                <a href={comment.commenterId === uid ? '/profil' : `/user/${comment.commenterPseudo}`} className='link-to-user-from-comment'><img src={!isEmpty(usersData[0]) && usersData.map((user) => {if (user._id === comment.commenterId) return user.picture;
                                    else return null}).join("")} alt="pp"/>
                                    <p>{comment.commenterPseudo}</p></a>
                                    {comment.commenterId !== userData._id ? <FollowHandler idToFollow={comment.commenterId} type={"card-follow-handler"}/> : null}
                                </div>

                                    <DeleteComment commentaire={comment} msgId={post._id}/>
                            </div>
                                <p>{comment.text}</p>
                                <p className='comment-date'>{timestampParser(comment.timestamp)}</p>
                        </div>
                })}
                {uid && <div className='post-comment'>
                    <textarea placeholder='Poster un commentaire' onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>
                    <button onClick={handleSendComment}>Envoyer commentaire</button>
                </div>}
            </div>
    );
};

export default Comments;