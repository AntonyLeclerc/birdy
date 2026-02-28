import React from 'react';
import NewLogo from "../../img/icons/new.svg"
import './Login.css'

const SignUp = () => {

    const signup = () => {
        window.location = "/signup"
    }
    return (
        <div className="login-bloc">
            <div onClick={signup}>
                <img src={NewLogo} alt="signup" />
            <span>Sign Up</span>
            </div>
        </div>
    );
};

export default SignUp;