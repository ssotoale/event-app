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

  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<TasksLog />} />
          <Route path="/home/progress" element={<Progress />} />
          <Route path="/home/challenge" element={<Challenges />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;