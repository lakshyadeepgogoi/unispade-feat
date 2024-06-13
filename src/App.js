import React, { useState } from 'react';
import './App.css';
import TabContent from './components/TabContent';

function App() {
  const [activeTab, setActiveTab] = useState('YourSessions'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  };

  return (
    <div className="App">
      <h2>Mentoring</h2>
      <div className="TabContainer">
        <div className="LeftTabs">
          <div className={`Tab ${activeTab === 'YourSessions' ? 'active' : ''}`} onClick={() => handleTabClick('YourSessions')}>
            Your Sessions
          </div>
          <div className={`Tab ${activeTab === 'Requests' ? 'active' : ''}`} onClick={() => handleTabClick('Requests')}>
            Requests
          </div>
          <div className={`Tab ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => handleTabClick('Upcoming')}>
            Upcoming
          </div>
          <div className={`Tab ${activeTab === 'History' ? 'active' : ''}`} onClick={() => handleTabClick('History')}>
            History
          </div>
        </div>
        <div className={`Tab RightTab ${activeTab === 'YourAvailability' ? 'active' : ''}`} onClick={() => handleTabClick('YourAvailability')}>
          Your Availability
        </div>
      </div>

      <TabContent activeTab={activeTab} />
    </div>
  );
}

export default App;
