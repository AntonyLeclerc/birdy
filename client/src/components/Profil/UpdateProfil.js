import React, { useState } from 'react';
import './UpdateProfil.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateBio, updatePseudo } from '../../actions/user.actions';
import UploadImg from './UploadImg';
import FollowHandler from './FollowHandler';

const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [bio, setBio] = useState("")
    const dispatch = useDispatch();
    const [followingWindow,setFollowingWindow] = useState(false);
    const [followersWindow,setFollowersWindow] = useState(false);

    const [changingPseudo, setChangingPseudo] = useState(false);
    const [pictureClicked, setPictureClicked] = useState(false);
    const [bioClicked,setBioClicked] = useState(false);
    const [newPseudo, setNewPseudo] = useState(false);


    const handleClickedBio = () => {
        setBioClicked(!bioClicked);
        setPictureClicked(false);
        setChangingPseudo(false);
    }

    const handleUpdate = () => {
        dispatch(updateBio(bio, userData._id))
        handleClickedBio();
    }

    const handleUpdatePseudo = () => {
        if (!newPseudo || newPseudo.trim().length === 0 || newPseudo.trim().length <= 2) {
          alert("Le pseudo sélectionné est trop court !");
          return;
        }
        dispatch(updatePseudo(newPseudo, userData._id));
        setChangingPseudo(false);
        window.location = "/profil"
      }
      

    const handleClickedPicture = () => {
        setPictureClicked(!pictureClicked);
        setBioClicked(false);
        setChangingPseudo(false);

    }

    const handleFollowingWindow = () => {
        setFollowingWindow(!followingWindow);
        setFollowersWindow(false);

    }

    const handleFollowersWindow = () => {
        setFollowersWindow(!followersWindow);
        setFollowingWindow(false);

    }

    const handleChangePseudo = () => {
        setChangingPseudo(!changingPseudo);
        setPictureClicked(false);
        setBioClicked(false);
    }

    const closeSocialsWindows = () => {
        followingWindow && setFollowingWindow(false);
        followersWindow && setFollowersWindow(false);
    }

    

    return (
        <>
        
        <div className='profil' onClick={closeSocialsWindows}>
            {pictureClicked ? (
                <div id="presentation">
                    <img onClick={handleClickedPicture} src={userData.picture} alt="profile-pic" id="profile-pic"/>
                    <p id="pseudo">{userData.pseudo}</p>
                    <UploadImg pic={handleClickedPicture}/>
                </div>
                ) : (
                <div id="presentation">
                    <img onClick={handleClickedPicture} src={userData.picture} alt="profile-pic" id="profile-pic"/>
                    <p>{userData.pseudo}</p>
                    {changingPseudo ? 
                        <textarea id="change-pseudo-area" placeholder='Entrez votre nouveau pseudo' onChange={(e) => setNewPseudo(e.target.value)}/>
                        :
                    ""
                    }
                </div>)
                }
            <div id="social">
                <p id="followers" onClick={handleFollowersWindow}>Followers : {userData.followers ? userData.followers.length : ""}</p>
                <p id="following" onClick={handleFollowingWindow}>Following : {userData.following ? userData.following.length : ""}</p>
                {changingPseudo ? <div className="changement-pseudo">
                    <p id="following" onClick={handleChangePseudo}>Annuler changement</p>
                    <p id="following" onClick={handleUpdatePseudo}>Valider nouveau pseudo !</p>

                </div> : <p id="following" onClick={handleChangePseudo}>Changer de pseudo</p>}
            </div>
            
            <div id="bio">
                {bioClicked ? (
                    <div id="typing-bio">
                        <textarea placeholder={userData.bio} defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}/>
                        <input onClick={handleUpdate} type="button" id="validate-change-bio" value="Valider"/>
                        <input onClick={handleClickedBio} type="button" id="validate-change-bio" value="Annuler"/>
                    </div>
                ) : (
                    <div>
                        <p>{userData.bio}</p>
                        <input type="button" value="Modifier la bio" onClick={handleClickedBio}/>
                    </div>
                )
            
            }
            </div>
        </div>
        {followersWindow && (
            <div className="social-window">
                <div className="up-bar">
                    <h3>Followers de : {userData.pseudo} </h3>
                    <span onClick={handleFollowersWindow} className='cross'>&#10005;</span>
                </div>
                <ul>
                        {usersData.map((user) => {
                            for(let i = 0; i < userData.followers.length; i++){
                                if (user._id === userData.followers[i]){
                                    return (
                                        <li key={user._id} className='social-user'>
                                            <a href={"/user/" + user.pseudo} className='follow-windows-user'>
                                            <img src={user.picture} alt="user-pic" className="follower"/>
                                            <h4>{user.pseudo}</h4>
                                            </a>
                                            <FollowHandler idToFollow={user._id} type={"social-follow-handler"}/> 
                                        </li>
                                    )
                                
                                }
                            }
                        return null;
                        })}
                    </ul>
            </div>
        )}

        {followingWindow && (
            <div className="social-window">
                <div className="up-bar">
                    <h3>Abonnements de : {userData.pseudo}</h3>
                    <span onClick={handleFollowingWindow} class="cross">&#10005;</span>
                </div>
                <ul>
                        {usersData.map((user) => {
                            for(let i = 0; i < userData.following.length; i++){
                                if (user._id === userData.following[i]){
                                    return (
                                        <li key={user._id} className='social-user'>
                                            <a href={"/user/" + user.pseudo} className='follow-windows-user'>
                                                <img src={user.picture} alt="user-pic" className="following"/>
                                                <h4>{user.pseudo}</h4>
                                            </a>
                                            <FollowHandler idToFollow={user._id} type={"social-follow-handler"}/> 
                                        </li>
                                    ) 
                                }
                                
                                
                            }
                        return null})}
                </ul>
            </div>
        )}
        </>
    );
};

export default UpdateProfil;