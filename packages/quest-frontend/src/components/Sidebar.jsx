
import React from 'react';
import profileImg from './assets/knight_inverted.png';
import sword from './assets/sword.png';
import map from './assets/map.png';
import quest from './assets/quest.png';
import './Sidebar.css'; // For the CSS styling


const BookmarkNav = () => {
    return (
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
        </ul>
      </nav>
    );
  };
  
  export default BookmarkNav;
