import React, { useState } from 'react';
import './App.css';
import TabContent from './components/TabContent';
import { SlCalender } from "react-icons/sl";
import { UpcomingProvider } from './context/UpcomingContext'; // Import the context provider

function App() {
  const [activeTab, setActiveTab] = useState('YourSessions');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <UpcomingProvider>
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
            <div className='availability-icon'>
              <SlCalender />
              Your Availability
            </div>
          </div>
        </div>

        <TabContent activeTab={activeTab} />
      </div>
    </UpcomingProvider>
  );
}

export default App;

