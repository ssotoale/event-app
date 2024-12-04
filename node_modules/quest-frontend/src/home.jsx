// src/home.jsx
import React from 'react';
import MyApp from './App'; // Render MyApp component for quest management
import { useNavigate } from 'react-router-dom';

const Home = ({ email, loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  if (!loggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {email}</h1>
      <MyApp /> {/* Render MyApp component here */}
      <button onClick={() => {
        setLoggedIn(false);
        navigate('/login');
      }}>Logout</button>
    </div>
  );
};

export default Home;
