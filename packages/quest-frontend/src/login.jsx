// src/login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="mainContainer">
      <div className="titleContainer">
        <h2>Login</h2>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setLocalEmail(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <button className="inputButton" onClick={onButtonClick}>Log in</button>
      </div>
      <br />
      {/* Link to Home Page */}
      <div className="inputContainer">
        <Link to="/home">Go to Home</Link>
      </div>
    </div>
  );
};

export default Login;
