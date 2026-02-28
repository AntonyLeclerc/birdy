import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, dateParser } from './Utils';
import './User.css'
import Feed from '../components/Feed'
import FollowHandler from './Profil/FollowHandler';

const User = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  

  const { username } = props.match.params;

  useEffect(() => {
    if (!isEmpty(usersData)) {
      const userData = usersData.find(user => user.pseudo === username);
      setUserData(userData);
      setLoadingData(false);
    }
  }, [usersData, username]);

  return (
    <div>
      {loadingData ? (
        <p>Loading...</p>
      ) : (
        <>
          {userData && userData.picture && (
            <div className='other-user-profile-page'>
                <h2>Profil de {username}</h2>
                <div className='presentation-other-user'>
                    <div className="in-profile">
                      <img src={"./." + userData.picture} alt="profile-pic" className='other-user-picture'/>
                      <FollowHandler idToFollow={userData._id} type={"in-profile-social-follow-handler"}/>
                    </div>
                    <p id="other-user-bio">{userData.bio}</p>
                    <p>Followers : {userData.followers.length} | Following : {userData.following.length}</p>
                    <p>A rejoint le {dateParser(userData.createdAt)}</p>

                </div>
                <Feed type={"other-user-feed"} otherUserId={userData._id}/>
            </div>
          )}
          {!userData && <p>User not found.</p>}
        </>
      )}
    </div>
  );
};

export default User;
