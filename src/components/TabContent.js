import React from 'react';
import './TabContent.css'; 
import YourSessions from './YourSessions/YourSessions';
import Requests from './Request/Requests';
import Upcoming from './Upcoming/Upcoming';
import History from './History-com/History';
import YourAvailability from './YourAvailability/YourAvailability';

function TabContent({ activeTab }) {
  switch (activeTab) {
    case 'YourSessions':
      return <YourSessions />;
    case 'Requests':
      return <Requests />;
    case 'Upcoming':
      return <Upcoming />;
    case 'History':
      return <History />;
    case 'YourAvailability':
      return <YourAvailability />;
    default:
      return null;
  }
}

export default TabContent;
