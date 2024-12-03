<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleSubmit, setEmail }) => {
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

=======
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import wizardImg from './components/assets/wizard.png'; // Adjust the path if necessary

const Login = ({ setLoggedIn, setEmail }) => {
  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

>>>>>>> 0b06c9fe430cedf9c14a727e6234a11f9dad45ef
  const navigate = useNavigate();

  const onButtonClick = () => {
    console.log("Submitting credentials:", { email, password }); // Debugging log

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    handleSubmit({ email, password })
      .then(() => {
        console.log("Login successful");
        setEmail(email); // Save email
        navigate("/home"); // Redirect on success
      })
      .catch((err) => {
        console.error("Login failed:", err); // Debugging log
        setError(err || "Login failed. Please try again.");
      });
  };

  return (
<<<<<<< HEAD
    <div className="mainContainer">
      <div className="titleContainer">
        <h2>Login</h2>
      </div>
      <div className="inputContainer">
        <input
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setLocalEmail(e.target.value)}
          className="inputBox"
        />
      </div>
      <div className="inputContainer">
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="inputBox"
        />
      </div>
      {error && <div className="errorLabel">{error}</div>}
      <div className="inputContainer">
        <button className="inputButton" onClick={onButtonClick}>
          Log in
        </button>
      </div>
=======
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
>>>>>>> 0b06c9fe430cedf9c14a727e6234a11f9dad45ef
    </div>
  );
};

export default Login;
