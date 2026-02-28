import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../actions/message.actions";
import { isEmpty } from "./Utils";
import Card from "./Messages/Card";
import "./Feed.css";
import { UidContext } from "./AppContext";

const Feed = ({ type, otherUserId, filter }) => {
  const [loadPosts, setLoadPosts] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.messagesReducer);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [currentFilter, setCurrentFilter] = useState("");
  const uid = useContext(UidContext);
  const [otherUser, setOtherUser] = useState(null);
  const followedOnly = useRef(null);
  const [isFollowOnlyChecked, setIsFollowOnlyChecked] = useState(false);
  const [renderedPinnedPost, setRenderedPinnedPost] = useState(false);

  var pinnedPost = null;


  useEffect(() => {
    if (loadPosts) {
      dispatch(getMessages());
      setLoadPosts(false);
    }
  }, [userData, loadPosts, userData.following, dispatch]);


  if (type==="user-feed" && userData.pinnedMessage) {
    pinnedPost = posts.find((post) => post._id === userData.pinnedMessage);
  }

  if (type==="other-user-feed" && !otherUser){
    setOtherUser(usersData.find((user) => user._id === otherUserId))
    
  }
  if (type==="other-user-feed" && otherUser && Array.isArray(posts)) {
    pinnedPost = posts.find((post) => post._id === otherUser.pinnedMessage);
  }


  if (loadPosts) {
    return <div>Loading...</div>;
  }
  
  if (isEmpty(posts) || (uid && isEmpty(userData)) || isEmpty(usersData)) {
    return <div>No messages found</div>;
  }
  

  return (
    <>
      {type === "global-feed" && (
        <div className="thread-container">
          <div id="filter-container">
            <input
              type="text"
              placeholder="Filtre"
              id="filter-input"
              onChange={(e) => setCurrentFilter(e.target.value)}
            />
            {uid && <label>
               <input
                type="checkbox"
                ref={followedOnly}
                onChange={() =>
                  setIsFollowOnlyChecked(followedOnly.current.checked)
                }
              />
              Personnes suivies uniquement
            </label>}
          </div>
          <ul className="thread">
            {currentFilter &&
              !isFollowOnlyChecked &&
              !isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (
                    post.message
                      .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                      .includes(currentFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
                    usersData
                      .find((user) => user._id === post.userId)
                      .pseudo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                      .includes(currentFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                  ) {
                    return <Card post={post} key={post._id} />;
                  }
                  return null;
                })}

            {isFollowOnlyChecked &&
              !currentFilter &&
              !isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (userData.following.includes(post.userId)) {
                    return <Card post={post} key={post._id} />;
                  }
                  return null;
                })}

            {currentFilter &&
              isFollowOnlyChecked &&
              !isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (
                    (post.message
                      .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                      .includes(currentFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
                      usersData
                        .find((user) => user._id === post.userId)
                        .pseudo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .includes(currentFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) &&
                    userData.following.includes(post.userId)
                  ) {
                    return <Card post={post} key={post._id} />;
                  }
                  return null;
                })}

            {!currentFilter &&
              !isFollowOnlyChecked &&
              !isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  return <Card post={post} key={post._id} />;
                })}
          </ul>
        </div>
      )}

      {type === "user-feed" && (
        <div className="thread-container">
          
          <ul className="thread">
          {pinnedPost ? (
              <Card post={pinnedPost} key={pinnedPost._id} type={"inProfile"} />
            ) : null}
            {!isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (
                    post.userId === userData._id ||
                    post.sharers.includes(userData._id)
                  )
                    return (
                      pinnedPost ? (post._id === pinnedPost._id ? null : <Card post={post} key={post._id} type={"inProfile"} />) : <Card post={post} key={post._id} type={"inProfile"} />
                    );
                  return null;
                })}
            
          </ul>
        </div>
      )}

      {type === "liked-feed" && (
        <div className="thread-container">
          <ul className="thread">
            {!isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (post.likers.includes(userData._id))
                    return (
                      <Card post={post} key={post._id} type={"inProfile"} />
                    );
                  return null;
                })}
          </ul>
        </div>
      )}

      {type === "shared-feed" && (
        <div className="thread-container">
          <ul className="thread">
            {!isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (post.sharers.includes(userData._id))
                    return (
                      <Card post={post} key={post._id} type={"inProfile"} />
                    );
                  return null;
                })}
          </ul>
        </div>
      )}

      {type === "other-user-feed" && (
        <div className="thread-container">
          <ul className="thread">
            {pinnedPost ? <Card
                        post={pinnedPost}
                        key={pinnedPost._id}
                        type={"in-other-user-profile-pinned"}
                      /> : null && setRenderedPinnedPost(true)} 
            {!isEmpty(posts[0]) &&
              posts
                .filter((post) => {
                  // Vérifiez si le message contient un des mots bloqués
                  if (!isEmpty(userData.blockedWords)) {
                    for (let currentBlockWord of userData.blockedWords) {
                      if (
                        post.message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(currentBlockWord)
                      ) {
                        return false;
                      }
                    }
                  }
                  return true;
                })
                .map((post) => {
                  if (
                    post.userId === otherUserId ||
                    post.sharers.includes(otherUserId) ||
                    (post.userId !== otherUserId &&
                      post.sharers.includes(otherUserId))
                  )
                    return (
                      (!renderedPinnedPost && pinnedPost !== post && <Card post={post} key={post._id} type={"in-other-user-profile"} userId={otherUserId}/>)
                    );
                  return null;
                })}
          </ul>
        </div>
      )}

      
    </>
  );
};

export default Feed;
