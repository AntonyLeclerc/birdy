import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import './SignUp.css'


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const SignUpForm = (props) => {
  const [inscrit, setInscrit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);


  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPasswords(!showPasswords)
  }
  
  const setLogin = () => {
    window.location.replace("http://localhost:3000/login");
  }

  const handleRegister = async (e) => {
    e.preventDefault();
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          finishSignUp()
        })
        .catch((err) => console.log(err));
    
  };

  const finishSignUp = async () => {
    setInscrit(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.replace("http://localhost:3000/login");
  }

  return (
    <>
        <form action="" onSubmit={handleRegister} id="signinForm">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type={showPasswords ? "text" : "password"}
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <input
            type={showPasswords ? "text" : "password"}
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          ></input>
        <button onClick={handleShowPassword}>Montrer mots de passe</button><br/>

        <button type="submit" id='signUpButton'>Valider inscription</button><button type="button" onClick={setLogin} className='signUpButtonConnexion'>Connexion</button>

        </form>

        { inscrit ? <p id="has-signed-up">Engistrement réussi, veuillez vous connecter !</p> : <p></p>}
        </>
  );
};

export default SignUpForm;