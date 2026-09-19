import React, { useEffect } from 'react';
import FoundryLogo from './FoundryLogo';
import { useApp } from '../context/AppContext';

export const Splash = () => {
  const { navigate } = useApp();

  useEffect(() => {
    // Auto transition to landing after 2.8 seconds
    const timer = setTimeout(() => {
      navigate('LANDING');
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      onClick={() => navigate('LANDING')}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#161616',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative'
      }}
      className="animate-fade-in"
    >
      {/* Centered Emblem matching Reference Screen 1 */}
      <div style={{ transform: 'scale(1.4)', marginBottom: '40px' }}>
        <FoundryLogo color="#FFFFFF" className="w-24 h-28" />
      </div>

      {/* Minimal progress line treatment matching Reference Screen 1 */}
      <div style={{ width: '280px', position: 'relative', marginTop: '40px' }}>
        {/* Base Gray Line */}
        <div style={{ height: '1px', backgroundColor: '#333333', width: '100%', position: 'relative' }}>
          {/* Left Endpoint Dot */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '-3px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#888888'
          }} />

          {/* Animated White Progress Line */}
          <div 
            style={{ 
              height: '1px', 
              backgroundColor: '#ffffff', 
              width: '100%',
              animation: 'fillProgress 2.6s ease-in-out forwards',
              transformOrigin: 'left'
            }} 
          />

          {/* Right Endpoint Dot */}
          <div style={{
            position: 'absolute',
            right: '0',
            top: '-3px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 8px #ffffff'
          }} />
        </div>
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

export default Splash;
