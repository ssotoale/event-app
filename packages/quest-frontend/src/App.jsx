import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import Home from "./home";
import Login from "./login";
import CreateAccount from "./createAccount"; // Import your CreateAccount component
import Progress from "./Progress";
import Challenges from "./Challenges";
import TopNav from "./components/TopNav";
import BookmarkNav from "./components/Sidebar";
import "./main.css";
import TasksLog from "./components/TasksLog";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <Routes>
          {/* Create Account route */}
          <Route path="/create-account" element={<CreateAccount />} />

          {/* Login route */}
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />

          {/* Redirect to login page if trying to access the root */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Other routes */}
          <Route path="/home" element={<TasksLog />} />
          <Route path="/home/progress" element={<Progress />} />
          <Route path="/home/challenge" element={<Challenges />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
