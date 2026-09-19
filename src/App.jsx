import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import Landing from './components/Landing';
import Login from './components/Login';
import FounderInfo from './components/FounderInfo';
import NewIdea from './components/NewIdea';
import ForgingAgents from './components/ForgingAgents';
import Cooperation from './components/Cooperation';
import ConflictResolution from './components/ConflictResolution';
import FinalStrategy from './components/FinalStrategy';
import PastIdeas from './components/PastIdeas';

const MainContent = () => {
  const { activeScreen } = useApp();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'SPLASH':
        return <Splash />;
      case 'LANDING':
        return <Landing />;
      case 'LOGIN':
        return <Login />;
      case 'FOUNDER_INFO':
        return <FounderInfo />;
      case 'NEW_IDEA':
        return <NewIdea />;
      case 'FORGING':
        return <ForgingAgents />;
      case 'COOPERATION':
        return <Cooperation />;
      case 'CONFLICT':
        return <ConflictResolution />;
      case 'STRATEGY':
        return <FinalStrategy />;
      case 'PAST_IDEAS':
        return <PastIdeas />;
      default:
        return <Landing />;
    }
  };

  if (activeScreen === 'SPLASH') {
    return <Splash />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <Navbar />
      {renderScreen()}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
