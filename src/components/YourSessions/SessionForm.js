import React, { useState } from 'react';
import './SessionForm.css';

const SessionForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [callNumber, setCallNumber] = useState('');
  const [sessionType, setSessionType] = useState('Video Call');
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [sessionPrice, setSessionPrice] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSession = {
      sessionType,
      sessionTitle,
      sessionDuration,
      sessionPrice,
      sessionDescription,
    };
    onSubmit(newSession);
    setSessionType('Video Call');
    setSessionTitle('');
    setSessionDuration('');
    setSessionPrice('');
    setSessionDescription('');
  };

  return (
    <div className="session-form-overlay">
      <div className="session-form-container">
        <form className="session-form" onSubmit={handleSubmit}>
          <div className="session-form-tabs">
            <div
              className={`session-type-button ${
                sessionType === 'Video Call' ? 'active' : ''
              }`}
              onClick={() => setSessionType('Video Call')}
            >
              Video Call
            </div>
            <div
              className={`session-type-button ${
                sessionType === 'Webinar' ? 'active' : ''
              }`}
              onClick={() => setSessionType('Webinar')}
            >
              Webinar
            </div>
            <div
              className={`session-type-button ${
                sessionType === 'Email' ? 'active' : ''
              }`}
              onClick={() => setSessionType('Email')}
            >
              Email
            </div>
            <div
              className={`session-type-button ${
                sessionType === 'Priority DM' ? 'active' : ''
              }`}
              onClick={() => setSessionType('Priority DM')}
            >
              Priority DM
            </div>
          </div>
          <div className="session-form-content">
            <div className="session-form-field">
              <label>Session Title:</label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                required
              />
            </div>
            <div className="session-form-field">
              <label>Session Duration:</label>
              <input
                type="text"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                required
              />
            </div>
            <div className="session-form-field">
              <label>Session Price:</label>
              <input
                type="text"
                value={sessionPrice}
                onChange={(e) => setSessionPrice(e.target.value)}
                required
              />
            </div>
            <div className="session-form-field">
              <label>Session Description:</label>
              <textarea
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="session-form-buttons">
              <button type="submit">Submit</button>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;
