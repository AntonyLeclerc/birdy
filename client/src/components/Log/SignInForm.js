import React from 'react';
import { useState } from 'react';
import './SignIn.css'
import axios from 'axios'


const SignInForm = (props) => {

    const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [showPassword,setShowPassword] = useState(false);


    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
      }

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/";
                }
            })
            .catch ((err) => {
                console.log(err);
            })
    }

    const setSignUp = () => {
        window.location.replace("http://localhost:3000/signup");
    }
     
    return (
        
        <form method="POST" action='' id="loginForm" onSubmit={handleLogin}>

            <label htmlFor='email' >Email</label>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>

            <label htmlFor='mdp'>Mot de passe</label>
            <input type={showPassword ? "texte" : "password"} name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <button onClick={handleShowPassword}>Montrer mot de passe</button><br/>

            <button type="submit" className="loginButton">Se connecter</button><button className="loginButton" type="button" onClick={setSignUp}>Inscription</button>
        </form>

    );
};

export default SignInForm;