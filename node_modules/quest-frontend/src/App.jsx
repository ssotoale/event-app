<<<<<<< HEAD
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import Home from "./home";
import Login from "./login";
import TopNav from "./components/TopNav";
import BookmarkNav from "./components/Sidebar";

import "./main.css";

function App() {
  const [email, setEmail] = useState("");
  const [characters, setCharacters] = useState([]);
  const [token, setToken] = useState(""); // State for the token
  const [message, setMessage] = useState(""); // State for messages

  // Function to handle user login
  function loginUser(creds) {
    console.log("Submitting credentials:", creds); // Debugging log
    return fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((payload) => {
            setToken(payload.token); // Save token
            setMessage("Login successful; auth token saved");
          });
        } else {
          return Promise.reject(
            `Error ${response.status}: ${response.statusText}`,
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
        throw error; // Ensure the error is propagated
      });
  }

  // Function to remove a character
  const removeOneCharacter = (index) => {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  };

  // Function to add a new character
  const updateList = (person) => {
    setCharacters([...characters, person]);
  };
=======
// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Table from './Table';
import Form from './Form';
import Home from './home';
import Login from './login';
import Progress from './Progress'; 
import Challenges from './Challenges';
import TopNav from "./components/TopNav";
import BookmarkNav from './components/Sidebar';
import './main.css';
import TasksLog from './components/TasksLog';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
>>>>>>> 0b06c9fe430cedf9c14a727e6234a11f9dad45ef

  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                handleSubmit={loginUser} // Pass login function
                setEmail={setEmail}
              />
            }
          />
<<<<<<< HEAD

          {/* Redirect the root route (/) to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Home route */}
          <Route
            path="/home"
            element={
              <div className="container">
                <Table
                  characterData={characters}
                  removeCharacter={removeOneCharacter}
                />
                <Form handleSubmit={updateList} />
              </div>
            }
          />
=======
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<TasksLog />} />
          <Route path="/home/progress" element={<Progress />} />
          <Route path="/home/challenge" element={<Challenges />} />
>>>>>>> 0b06c9fe430cedf9c14a727e6234a11f9dad45ef
        </Routes>
      </BrowserRouter>

      {/* Display messages */}
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;