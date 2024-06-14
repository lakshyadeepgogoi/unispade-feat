import React from 'react';
import './TabContent.css'; 
import YourSessions from './YourSessions/YourSessions';
import Requests from './Requests';
import Upcoming from './Upcoming';
import History from './History';
import YourAvailability from './YourAvailability';

const TabContent = ({ activeTab }) => {
  return (
    <div className="TabContent">
      {activeTab === 'YourSessions' && <YourSessions />}
      {activeTab === 'Requests' && <Requests />}
      {activeTab === 'Upcoming' && <Upcoming />}
      {activeTab === 'History' && <History />}
      {activeTab === 'YourAvailability' && <YourAvailability />}
    </div>
  );
};

export default TabContent;
