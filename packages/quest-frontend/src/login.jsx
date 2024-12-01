import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import wizardImg from './components/assets/wizard.png'; // Adjust the path if necessary

const Login = ({ setLoggedIn, setEmail }) => {
  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmail(email);
    setLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="loginContainer">
      <h1 className="loginTitle">Welcome Traveler!</h1>
      <img src={wizardImg} alt="Wizard" className="wizardImage" />
      <form className="loginForm">
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setLocalEmail(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <button type="button" className="loginButton" onClick={onButtonClick}>
          Log In
        </button>
        <button type="button" className="createAccountButton">
          Create Account
        </button>
        <Link to="/home" className="homeLink">Go to Home</Link>
      </form>
    </div>
  );
};

export default Login;
