import React, { useContext } from 'react';
import Logo from "../logo.png"
import './NavigationPanel.css'
import { UidContext } from "./AppContext";
import Logout from './Log/Logout';
import { useSelector } from 'react-redux';
import Login from '../components/Log/Login'
import SignUp from './Log/SignUp';
import SettingsButton from './SettingsButton';



const NavigationPanel = () => {
  
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);


  return (
    <nav className='navigationpanel'>
      <a href="/">
        <div id="logo">
          <img src={Logo} alt="logo" id="logo" />
        </div>
      </a>
      { uid ? (
        <div className='right-element-logged'>
          <a href="/profil"><img src={"./." + userData.picture} alt="profile-pic" id="pp-navbar"/></a>
          <a href="/profil">
            {userData.pseudo}
          </a>
          <SettingsButton />

          <Logout />
        </ div>
      ) 
       :
      ( 
        <div className='right-element-not-logged'>
          <Login />

          <SignUp />

        </div>
      )
      }

    </nav>
  );
};

export default NavigationPanel;