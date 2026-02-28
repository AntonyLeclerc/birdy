import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";
import './FollowHandler.css'

const FollowHandler = ({ idToFollow, type }) => {

  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);

  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };
  
  useEffect(() => {
    if (!isEmpty(userData.following) && getUser()) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow} className="follow-handler">
          {type === "social-follow-handler" && <button className="social-button-followed">Abonné</button>}
          {type === "in-profile-social-follow-handler" && <button className="social-button-followed">Abonné</button>}
          {type === "card-follow-handler" && <button className="card-social-button-unfollow">Abonné</button>}
        </span>
      )}
      {!isFollowed && !isEmpty(userData) && (
        <span onClick={handleFollow} className="follow-handler">
          {type === "social-follow-handler" && <button className="social-button">Suivre</button>}
          {type === "in-profile-social-follow-handler" && <button className="social-button">Suivre</button>}
          {type === "card-follow-handler" && <button className="card-social-button-follow">Suivre</button>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;