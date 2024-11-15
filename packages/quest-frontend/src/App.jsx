// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Table from './Table';
import Form from './Form';
import Home from './home';
import Login from './login';
import './main.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [characters, setCharacters] = useState([]);

  // Functions for managing quests
  const removeOneCharacter = (index) => {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  };

  const updateList = (person) => {
    setCharacters([...characters, person]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        <nav>
          <Link to="/login">Login</Link> | <Link to="/home">Home</Link>
        </nav>

        <Routes>
          {/* Default route for Login */}
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          
          {/* Redirect the root route (/) to /login */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Home route */}
          <Route
            path="/home"
            element={
              <div className="container">
                <h2>Enter your task here!</h2>
                <Table characterData={characters} removeCharacter={removeOneCharacter} />
                <Form handleSubmit={updateList} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
