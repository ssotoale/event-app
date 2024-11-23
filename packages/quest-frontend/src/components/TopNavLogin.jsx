import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './TopNavLogin.css';
import profileImg from './assets/knight_inverted.png';
import sword from './assets/sword.png';
import map from './assets/map.png';
import quest from './assets/quest.png';

const TopNav = () => {
  const [isBookmarkNavOpen, setBookmarkNavOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleBookmarkNav = () => {
    setBookmarkNavOpen(!isBookmarkNavOpen);
  };

  const handleLogout = () => {
    setBookmarkNavOpen(false); 
    navigate('/login'); // Redirect to the login screen
  };

  return (
    <div className="top-nav">
      <div className="top-nav-center">
        <h1 className="app-title">Questboard</h1>
      </div>
      
      {isBookmarkNavOpen && (
        <nav className="bookmark-nav">
          <ul className="bookmark-nav-list">
            <li className="bookmark-item selected">
              <a href="/home" className="bookmark-link">
                <div className="bookmark-icon">
                  <img src={quest} alt="Tasks Log" />
                </div>
                <div className="bookmark-label">Tasks Log</div>
              </a>
            </li>
            <li className="bookmark-item">
              <a href="/home/progress" className="bookmark-link">
                <div className="bookmark-icon">
                  <img src={map} alt="Progress" />
                </div>
                <div className="bookmark-label">Progress</div>
              </a>
            </li>
            <li className="bookmark-item">
              <a href="/home/challenge" className="bookmark-link">
                <div className="bookmark-icon">
                  <img src={sword} alt="Challenge" />
                </div>
                <div className="bookmark-label">Challenge</div>
              </a>
            </li>
            <li className="bookmark-item">
              <button onClick={handleLogout} className="bookmark-link" style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }}>
                
                <div className="bookmark-label">Logout</div>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TopNav;
