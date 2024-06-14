import React, { useState } from 'react';
import './YourSessions.css';
import SessionForm from './SessionForm';
import { SlCalender } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa";


function YourSessions() {
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([]);

  const handleCreateNewSessionClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (newSession) => {
    setSessions([...sessions, newSession]);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="your-sessions-container">
      <div className="sessions-list">
        {sessions.map((session, index) => (
          <div key={index} className="session-item">
            <div className="session-type">{session.sessionType}</div>
            <div className="session-title">{session.sessionTitle}</div>
              <div className="session-description">{session.sessionDescription}</div>
            <div className="session-details">
              <div className="session-duration"><SlCalender color='black'/> {session.sessionDuration}</div>
              <div className="session-price">₹{session.sessionPrice}  <FaArrowRight className='right-icon'/></div>
            </div>
          </div>
        ))}
      </div>
      <div className="create-session-box">
        <button className="create-session-button" onClick={handleCreateNewSessionClick}>
          + Create New Session
        </button>
      </div>

      {showForm && (
        <SessionForm onSubmit={handleFormSubmit} onClose={handleCloseForm} />
      )}
    </div>
  );
}

export default YourSessions;
