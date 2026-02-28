import React from 'react';
import SettingsIcon from '../img/icons/settings.png'
import './SettingsButton.css'

const SettingsButton = () => {
    return (
        <div>
            <a href="/settings">
            <img src={SettingsIcon} alt="settings" id="settings-icon"/>
            </a>
        </div>
    );
};

export default SettingsButton;