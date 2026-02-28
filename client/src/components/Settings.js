import React, { useState } from 'react';
import DeleteAccount from './SettingsOptions/DeleteAccount';
import BlockWord from './SettingsOptions/BlockWord';
import { useSelector } from 'react-redux';
import { isEmpty } from './Utils';
import BannedWord from './SettingsOptions/BannedWord';
import './Settings.css'
import ChangeEmail from './SettingsOptions/ChangeEmail';
import ChangePassword from './SettingsOptions/ChangePassword';

const Settings = () => {

    const userData = useSelector((state) => state.userReducer);
    const [showBlockedWords, setShowBlockedWords] = useState(false);

    return (
        <div id="options-container">
            <h2 id="options">Options</h2>
            <br/>
            <button id={showBlockedWords ? "displayed-block-words" : "display-block-words"} onClick={() => setShowBlockedWords(!showBlockedWords)}>Afficher les mots bloqués</button>
            {showBlockedWords && isEmpty(userData.block) && <BlockWord />}
            {showBlockedWords && !isEmpty(userData.blockedWords) && userData.blockedWords.length > 0 && (
                <div>
                    <h2>Blocked Words:</h2>
                    <ul>
                        {userData.blockedWords.map((word) => (
                            <BannedWord bword={word} key={word}/>
                        ))}
                    </ul>
                </div>
            )}
            <br/>
            <ChangeEmail />
            <ChangePassword />
            
            <br/>
            <DeleteAccount />

        </div>
    );
};

export default Settings;
