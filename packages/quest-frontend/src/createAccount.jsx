import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Add your backend API URL
const API_PREFIX = process.env.REACT_APP_API_PREFIX || "https://questlogger-epcdgcdvh9gga5cp.westus3-01.azurewebsites.net";
console.log(API_PREFIX);

const registerUser = (username, password, setMessage) => {
  return fetch(`${API_PREFIX}/api/create-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((errorText) => {
          throw new Error(errorText || "Unknown error occurred.");
        });
      }
      return response.json(); // Parse as JSON if the response is OK
    })
    .then((data) => {
      console.log("API Response:", data);
      setMessage("Account created successfully.");
      return true; // Success
    })
    .catch((error) => {
      console.error("Error creating user:", error.message);
      setMessage(`Error: ${error.message}`);
      return false; // Failure
    });
};

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Added message state for error or success messages
  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;
    if (!username) {
      setMessage("Username is required.");
      valid = false;
    }
    if (!password) {
      setMessage("Password is required.");
      valid = false;
    }

    return valid;
  };

  const onButtonClick = () => {
    setMessage(""); // Clear previous messages before validation

    if (!validateInputs()) return;
    console.log(API_PREFIX);
    
    registerUser(username, password, setMessage).then((success) => {
      if (success) {
        setMessage("Account created successfully.");
        navigate("/login"); // Redirect to the login page after successful account creation
      } else {
        setMessage("Account creation failed. Please try again.");
      }
    });
  };

  return (
    <div className="createAccountContainer">
      <h1 className="createAccountTitle">Create a New Account</h1>
      <form className="createAccountForm" onSubmit={(e) => e.preventDefault()}>
        <div className="inputContainer">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="Enter your username"
            className="inputBox"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Enter your password"
            className="inputBox"
          />
        </div>
        {message && <p className="statusMessage">{message}</p>}
        <button
          type="button"
          className="createAccountButton"
          onClick={onButtonClick}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
