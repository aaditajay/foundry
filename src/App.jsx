import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FoundryLogo from './components/FoundryLogo';
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
  const { activeScreen, navigate } = useApp();

  // Intro Splash -> Landing animation state: 'SPLASH_CENTER' | 'SPLASH_TRANSITIONING' | 'READY'
  const [introPhase, setIntroPhase] = useState('SPLASH_CENTER');

  const startIntroTransition = () => {
    if (introPhase !== 'SPLASH_CENTER') return;
    setIntroPhase('SPLASH_TRANSITIONING');
    setTimeout(() => {
      setIntroPhase('READY');
      navigate('LANDING');
    }, 850);
  };

  useEffect(() => {
    // Auto start right-to-left intro transition after 2.4 seconds if on SPLASH screen
    if (activeScreen === 'SPLASH') {
      const timer = setTimeout(() => {
        startIntroTransition();
      }, 2400);
      return () => clearTimeout(timer);
    } else {
      setIntroPhase('READY');
    }
  }, [activeScreen]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'SPLASH':
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

  const isIntroMode = activeScreen === 'SPLASH' || introPhase !== 'READY';

  return (
    <div className="app-container" onClick={isIntroMode ? startIntroTransition : undefined}>
      
      {/* Dark Left Sidebar (Expands to 100vw on Splash, shrinks to 260px on transition) */}
      <div 
        className={`sidebar ${isIntroMode && introPhase === 'SPLASH_CENTER' ? 'full-splash' : ''}`}
        style={{
          width: isIntroMode ? (introPhase === 'SPLASH_CENTER' ? '100vw' : '260px') : '260px',
          minWidth: isIntroMode ? (introPhase === 'SPLASH_CENTER' ? '100vw' : '260px') : '260px'
        }}
      >
        {/* Top Brand Header */}
        <div className="sidebar-top" style={{ opacity: introPhase === 'SPLASH_CENTER' ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <div 
            className="brand-header cursor-pointer flex items-center justify-between"
            onClick={() => navigate('LANDING')}
            style={{ cursor: 'pointer', textTransform: 'none', fontSize: '15px', fontWeight: '800', letterSpacing: '1px' }}
          >
            <span>Foundry</span>
          </div>
        </div>

        {/* Center Logo Slot */}
        <div className="sidebar-center-logo">
          {/* Animated Logo moving from viewport center (50vw) to sidebar center (130px) */}
          <div 
            className={`intro-logo-wrapper ${introPhase === 'READY' || introPhase === 'SPLASH_TRANSITIONING' ? 'in-sidebar' : ''}`}
            style={{
              position: 'fixed',
              top: '50%',
              left: isIntroMode ? (introPhase === 'SPLASH_CENTER' ? '50vw' : '130px') : '130px',
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
              zIndex: 100
            }}
          >
            <FoundryLogo color="#FFFFFF" className="w-24 h-32" />
          </div>
        </div>

        {/* Splash Progress Line with dots */}
        {isIntroMode && (
          <div className={`splash-progress-line ${introPhase !== 'SPLASH_CENTER' ? 'hiding' : ''}`}>
            <div style={{ height: '1px', backgroundColor: '#555555', position: 'relative', width: '100%' }}>
              <div style={{ position: 'absolute', left: '0', top: '-3.5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
              <div style={{ height: '1px', backgroundColor: '#ffffff', width: '100%', animation: 'fillProgress 2.4s ease-in-out forwards', transformOrigin: 'left' }} />
              <div style={{ position: 'absolute', right: '0', top: '-3.5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
            </div>
          </div>
        )}
      </div>

      {/* Navbar overlay */}
      {!isIntroMode && <Navbar />}

      {/* Main Canvas (White panel sliding in from right attached to contracting black screen) */}
      <div 
        className="main-canvas"
        style={{
          transform: isIntroMode ? (introPhase === 'SPLASH_CENTER' ? 'translateX(100vw)' : 'translateX(0)') : 'translateX(0)',
          transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)'
        }}
      >
        {renderScreen()}
      </div>

      <style>{`
        @keyframes fillProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
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
