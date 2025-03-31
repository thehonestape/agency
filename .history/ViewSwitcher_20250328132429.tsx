import React, { useState } from 'react';

interface ViewSwitcherProps {
  children: React.ReactNode;
}

export const ViewContext = React.createContext({
  currentView: 'home',
  setCurrentView: (view: string) => {}
});

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');

  return (
    <ViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => React.useContext(ViewContext);

interface ViewProps {
  name: string;
  children: React.ReactNode;
}

export const View: React.FC<ViewProps> = ({ name, children }) => {
  const { currentView } = useView();
  
  if (currentView !== name) return null;
  
  return <>{children}</>;
}; 