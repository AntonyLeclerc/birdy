import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import "./Card.css";
import EditIcon from '../../img/icons/edit.svg'
import FollowHandler from "../Profil/FollowHandler";
import { updateMessage } from "../../actions/message.actions";
import SharedIcon from '../../img/icons/shared.png'

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import ShareButton from "./ShareButton";
import PinButton from "./PinButton";
import ShowCommentButton from "./ShowCommentButton";
import Comments from "./Comments";
import { UidContext } from "../AppContext";

const Card = ( { post, type, userId}) => {

  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);
  const [updating, setUpdating] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null)
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [isFromUser, setIsFromUser] = useState(usersData.find((user) => post.userId === user._id)._id !== userId)

  const updateMsg = () => {
    if (textUpdated){
      dispatch(updateMessage(post._id, textUpdated))
    }
    setUpdating(false);
    setTextUpdated("");
  }  

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const handleUpdate = () => {
    setUpdating(!updating);
  }

  
  return (
    <div className="message" key={post._id}>
      {isFromUser && type==="inProfile" && post.sharers.includes(userData._id) && <div className="has-shared-container"><p className="has-shared">{userData.pseudo} a partagé</p><img src={SharedIcon} alt="shared" className="shared-icon"/></div>}
      {usersData.map((user) => {
        if (post.userId === user._id)
          return (
            <div>
              { type==="inProfile" && post._id === userData.pinnedMessage && <div className="has-shared-container"><p className="has-pinned">Message épinglé</p></div>}
              { type==="in-other-user-profile-pinned" && <div className="has-shared-container"><p className="has-pinned">Message épinglé</p></div>}
              { type==="in-other-user-profile" && post.sharers.includes(userId) && <div className="has-shared-container"><p className="has-shared">{usersData.find((useer) => useer._id === userId).pseudo} a partagé</p><img src={SharedIcon} alt="shared" className="shared-icon"/></div>}

              <div className="msg-user">

                {userData.pseudo === user.pseudo && type!=="in-other-user-profile" && <a href={`/profil`}><img src={user.picture} alt="" className="msg-img" /></a>}
                {userData.pseudo === user.pseudo && type==="in-other-user-profile" && <a href={`/profil`}><img src={"./." + user.picture} alt="" className="msg-img" /></a>}
                {userData.pseudo !== user.pseudo && <a href={`/user/${user.pseudo}`}><img src={"./." + user.picture} alt="" className="msg-img" /></a>}
                
                <div className="pseudo-follow">
                    <span>{user.pseudo}</span>
                    {userData._id === user._id ? "" : <FollowHandler idToFollow={user._id} type={"card-follow-handler"}/>}
                </div>
                {userData._id === user._id ? (
                  //<button className="modify-msg-button" onClick={handleUpdate} src={EditIcon}>Modifier</button>
                  <div className="owner-msg-actions">
                    <img src={EditIcon} alt="modify" className="modify-msg-button" onClick={handleUpdate} title="Modifier"/>
                    <DeleteButton id={post._id}/>
                    <PinButton post={post}/>
                  </div>
                ) : (
                  ""
                )}
              </div>
              { updating ? 
                <div className="updating-message">
                    <textarea defaultValue={post.message} className="update-msg" onChange={(e) => setTextUpdated(e.target.value)} />
                    <button onClick={updateMsg} className="update-msg-button">Confirmer les modifications</button>
                </div>
                :
                <p>{post.message}</p>
                }
              <div className="footer-card">
                <p className="date">{dateParser(post.createdAt)}</p>
                <div className="footer-actions">

                  <div onClick={() => setShowComments(!showComments)}>
                    <ShowCommentButton post={post} />
                  </div>
                  <LikeButton post={post}/>

                  <ShareButton post={post} />
                </div>
              </div>
              {showComments && uid ? <Comments post={post}/> : null}
            </div>
          )
          return null;
      })}
    </div>
  );
};

export default Card;
