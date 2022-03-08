import React from 'react';
import { createContext, useContext } from 'react';
import { API } from '../api/createApi';

const ScrollContext = createContext<API>({} as API);

const useScroller = (): API => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('Need Scroll Context!');
  }
  return context;
};

interface Provider {
  value: API;
}

const ScrollProvider: React.FC<Provider> = ({ children, value }) => {
  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export default ScrollProvider;
export { useScroller, ScrollContext };
