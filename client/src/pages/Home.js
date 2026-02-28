import React, { useContext, useEffect, useState } from 'react';
import './Home.css'
import Feed from '../components/Feed'
import CreateMessageForm from '../components/Messages/CreateMessageForm';
import { UidContext } from '../components/AppContext';
import Login from '../components/Log/Login';
import SignInForm from '../components/Log/SignInForm';
import Statistiques from '../components/Statistiques';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../components/Utils';
import { getMessages } from '../actions/message.actions';

const Home = props => {

    const [page,setPage] = useState("main_page");
    const uid = useContext(UidContext);

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        !isEmpty(usersData[0]) && getMessages();
    }, [usersData]);

    return (
        <div>
            { uid ? 
                  <div id="stats-form">
                    <Statistiques />
                    <CreateMessageForm type={"in-home-form"}/>
                    </div> : 
                <>
                <h1>Connectez / Inscrivez vous pour envoyer vos messages !</h1>
                
                <SignInForm />
                </>
            
            }
                <Feed type={"global-feed"}/>
        </div>
    );
};

export default Home;