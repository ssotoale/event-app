import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import wizardImg from "./components/assets/wizard.png";

const API_PREFIX = "http://localhost:5000";

const loginUser = (creds, setMessage) => {
  return fetch(`${API_PREFIX}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          setMessage(`Login Error ${response.status}: ${error.message}`);
          return Promise.reject(new Error(error.message)); // Reject with an error message
        });
      }
      return response.json();
    })
    .then((payload) => {
      localStorage.setItem("token", payload.token); // Save the token
      setMessage("Login successful; auth token saved.");
      console.log(
        "Token from localStorage:",
        localStorage.getItem("authToken"),
      );
      return true; // Indicate success
    })
    .catch((error) => {
      setMessage(`Network Error: ${error.message}`);
      return false; // Indicate failure
    });
};

const Login = ({ setLoggedIn }) => {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;
    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    return valid;
  };

  const onButtonClick = () => {
    setUsernameError("");
    setPasswordError("");

    if (!validateInputs()) return; // Stop if inputs are invalid

    const creds = { username, password }; // Create credentials object
    loginUser(creds, setMessage).then((success) => {
      if (success) {
        setLoggedIn(true); // Update parent login state
        setLocalUsername(username); // Set username in parent component
        navigate("/home"); // Navigate to the home page
      }
    });
  };

  return (
    <div className="loginContainer">
      <h1 className="loginTitle">Welcome Traveler!</h1>
      <img src={wizardImg} alt="Wizard" className="wizardImage" />
      <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        <div className="inputContainer">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            placeholder="Enter your username here"
            onChange={(ev) => {
              setLocalUsername(ev.target.value);
              setUsernameError(""); // Clear error on input change
            }}
            className="inputBox"
            autoComplete="username"
            type="text"
          />
          {usernameError && (
            <label className="errorLabel">{usernameError}</label>
          )}
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError(""); // Clear error on input change
            }}
            className="inputBox"
            autoComplete="current-password"
          />
          {passwordError && (
            <label className="errorLabel">{passwordError}</label>
          )}
        </div>
        {message && <p className="statusMessage">{message}</p>}
        <button type="button" className="loginButton" onClick={onButtonClick}>
          Log In
        </button>
        <button type="button" className="createAccountButton">
          <Link to="/create-account" className="create">
            Create Account
          </Link>
        </button>
        <Link to="/home" className="homeLink">
          Go to Home
        </Link>
      </form>
    </div>
  );
};

export default Login;
