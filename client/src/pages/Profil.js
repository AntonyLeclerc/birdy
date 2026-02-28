import React, { useContext, useEffect, useState } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext"
import { useSelector } from 'react-redux';
import SignInForm from '../components/Log/SignInForm';
import UpdateProfil from '../components/Profil/UpdateProfil';
import Feed from '../components/Feed';
import './Profil.css'
import CreateMessageForm from '../components/Messages/CreateMessageForm';

const Profil = ( props ) => {
    const uid = useContext(UidContext);

    const [showLikes, setShowLikes] = useState(false);
    const [showShared, setShowShared] = useState(false);
    const [showUser, setShowUser] = useState(true);
    const [isMounted, setisMounted] = useState(false);

    const showUserFeed = () => {
        setShowLikes(false);
        setShowShared(false);
        setShowUser(true);
    }

    const showLikedFeed = () => {
        setShowUser(false);
        setShowShared(false);
        setShowLikes(true);
    }

    const showSharedFeed = () => {
        setShowLikes(false);
        setShowUser(false);
        setShowShared(true);
    }

    useEffect(() => {
        if (props.match && props.match.params){
            setisMounted(true);
        }
    }, [props.match])

    return (
        <div className="profil-page">
            {
                uid ?
                    <div className="elements">
                        <UpdateProfil />
                        <CreateMessageForm type={"in-profile-form"}/>
                        <div className='category'>
                            <button onClick={showUserFeed} className={showUser ? 'setCategory-active' : 'setCategory'} >Messages</button>
                            <button onClick={showLikedFeed} className={showLikes ? 'setCategory-active' : 'setCategory'} >J'aime</button>
                            <button onClick={showSharedFeed} className={showShared ? 'setCategory-active' : 'setCategory'} >Partagés</button>
                        </div>
                        {showUser && <Feed type={"user-feed"}/>}
                        {showLikes && <Feed type={"liked-feed"}/>}
                        {showShared && <Feed type={"shared-feed"}/>}
                    </div>
                :
                    <div>
                        <SignInForm />
                    </div>
            }
        </div>
    );
};


export default Profil;
