import React from 'react';
import LoginLogo from "../../img/icons/login.svg"
import './Login.css'

const Login = () => {

    const login = () => {
        window.location = "/login";
    }

    return (
        <div className="login-bloc">
            <div onClick={login}>
                <img src={LoginLogo} alt="signup" />
            </div>
            <span>Log In</span>
        </div>
    );
};

export default Login;