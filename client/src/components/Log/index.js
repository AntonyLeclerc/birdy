import React, { useState } from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'


const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);

    const HandleModals = () => {
        setSignUpModal(!signUpModal);
        setSignInModal(!signInModal);
    }

    return (
        <div className='auth-form'>
            
            {signUpModal && <SignUpForm setSignIn={HandleModals}/>}
            {signInModal && <SignInForm setSignUp={HandleModals}/>}
        </div>
    );
};

export default Log;