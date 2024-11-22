import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleSubmit, setEmail }) => {
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    </div>
  );
};

export default Login;
