import React, { createContext, useState } from 'react';

export const UpcomingContext = createContext();

export const UpcomingProvider = ({ children }) => {
  const [upcomingRequests, setUpcomingRequests] = useState([]);

  const addUpcomingRequest = (request) => {
    setUpcomingRequests([...upcomingRequests, request]);
  };

  return (
    <UpcomingContext.Provider value={{ upcomingRequests, addUpcomingRequest }}>
      {children}
    </UpcomingContext.Provider>
  );
};
