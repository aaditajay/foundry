import React, { useState, useEffect } from 'react';
import FoundryLogo from './FoundryLogo';
import { useApp } from '../context/AppContext';

export const Splash = ({ onComplete }) => {
  const { transitionFromSplash } = useApp();
  const [isSliding, setIsSliding] = useState(false);

  const startTransition = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      if (onComplete) onComplete();
      transitionFromSplash();
    }, 750);
  };

  useEffect(() => {
    // Auto transition after 2.5 seconds
    const timer = setTimeout(() => {
      startTransition();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      onClick={startTransition}
      className={`splash-container ${isSliding ? 'slide-left' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      {/* Moving Emblem matching requirement #4 */}
      <div className={`splash-logo ${isSliding ? 'move-to-sidebar' : ''}`}>
        <FoundryLogo color="#FFFFFF" className="w-28 h-36" />
      </div>

      {/* Progress Line with endpoint dots */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '120px', 
          width: '560px', 
          maxWidth: '80%',
          opacity: isSliding ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
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
              animation: 'fillProgress 2.4s ease-in-out forwards',
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
