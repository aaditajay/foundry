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
      {/* Centered Logo matching Reference Image 1 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '80px' }}>
        <FoundryLogo color="#FFFFFF" className="w-28 h-36" />
      </div>

      {/* Line with dots at both ends matching exact reference image 1 */}
      <div style={{ position: 'absolute', bottom: '120px', width: '560px', maxWidth: '80%' }}>
        <div style={{ height: '1px', backgroundColor: '#555555', position: 'relative', width: '100%' }}>
          {/* Left Dot */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '-3.5px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ffffff'
          }} />

          {/* Progress bar animation */}
          <div 
            style={{ 
              height: '1px', 
              backgroundColor: '#ffffff', 
              width: '100%',
              animation: 'fillProgress 2.6s ease-in-out forwards',
              transformOrigin: 'left'
            }} 
          />

          {/* Right Dot */}
          <div style={{
            position: 'absolute',
            right: '0',
            top: '-3.5px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ffffff'
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
