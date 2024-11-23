import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './TopNav.css';
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
      <button
        className="Burger_burger__1c5EC"
        type="button"
        aria-label="Toggle Bookmark Navigation"
        title="Toggle Bookmark Navigation"
        onClick={toggleBookmarkNav}
      >
        <svg
          className="Icon_icon__1UNFx"
          width="26"
          height="20"
          viewBox="0 0 26 20"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M25 18C25.5523 18 26 18.4477 26 19C26 19.5128 25.614 19.9355 25.1166 19.9933L25 20H1C0.447715 20 0 19.5523 0 19C0 18.4872 0.38604 18.0645 0.883379 18.0067L1 18H25ZM25 9C25.5523 9 26 9.44772 26 10C26 10.5128 25.614 10.9355 25.1166 10.9933L25 11H1C0.447715 11 0 10.5523 0 10C0 9.48716 0.38604 9.06449 0.883379 9.00673L1 9H25ZM25 0C25.5523 0 26 0.447715 26 1C26 1.51284 25.614 1.93551 25.1166 1.99327L25 2H1C0.447715 2 0 1.55228 0 1C0 0.487164 0.38604 0.0644928 0.883379 0.00672773L1 0H25Z"></path>
        </svg>
      </button>

      
      <div className="top-nav-center">
        <h1 className="app-title">Questboard</h1>
      </div>


      <div className="top-nav-right">
        <img src={profileImg} alt="Profile" className="profile-icon" />
        <span className="profile">Profile</span>
      </div>

      
      {isBookmarkNavOpen && (
        <nav className="bookmark-nav">
          <ul className="bookmark-nav-list">
            <li className="bookmark-item selected">
              <a href="/home" className="bookmark-link">
                <div className="bookmark-icon">
                  <img src={quest} alt="Tasks Log" />
                </div>
                <div className="bookmark-label">Tasks</div>
              </a>
            </li>

            <li className="bookmark-item">
              <a href="/Progress" className="bookmark-link">
               <div className="bookmark-icon">
                  <img src={map} alt="Progress" />
              </div>
             <div className="bookmark-label">Progress</div>
             </a>
            </li>


            <li className="bookmark-item">
              <a href="/Challenges" className="bookmark-link">
                <div className="bookmark-icon">
                  <img src={sword} alt="Challenges" />
                </div>
                <div className="bookmark-label">Challenges</div>
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
