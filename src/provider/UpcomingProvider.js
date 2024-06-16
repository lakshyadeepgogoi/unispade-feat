import React from 'react';
import { UpcomingProvider } from './UpcomingContext';
import Requests from './Requests';
import Upcoming from './Upcoming';

function App() {
  return (
    <UpcomingProvider>
      <div className="App">
        <Requests />
        <Upcoming />
      </div>
    </UpcomingProvider>
  );
}

export default App;
