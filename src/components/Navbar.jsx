import React from 'react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { activeScreen, navigate } = useApp();

  if (activeScreen === 'SPLASH') return null;

  const demoSteps = [
    { key: 'LANDING', label: '1. Landing' },
    { key: 'LOGIN', label: '2. Login' },
    { key: 'FOUNDER_INFO', label: '3. Founder Info' },
    { key: 'NEW_IDEA', label: '4. New Idea' },
    { key: 'FORGING', label: '5. Agents' },
    { key: 'COOPERATION', label: '6. Cooperation' },
    { key: 'CONFLICT', label: '7. Conflict' },
    { key: 'STRATEGY', label: '8. Strategy' },
    { key: 'PAST_IDEAS', label: '9. History' }
  ];

  return (
    <div 
      style={{
        position: 'absolute',
        top: '16px',
        right: '24px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'rgba(240, 240, 240, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '6px 12px',
        borderRadius: '100px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        maxWidth: 'calc(100vw - 320px)',
        overflowX: 'auto'
      }}
    >
      <span style={{ fontSize: '11px', fontWeight: '800', color: '#888888', marginRight: '6px', letterSpacing: '0.5px' }}>
        DEMO FLOW:
      </span>
      {demoSteps.map((step) => {
        const isActive = activeScreen === step.key;
        return (
          <button
            key={step.key}
            onClick={() => navigate(step.key)}
            style={{
              backgroundColor: isActive ? '#111111' : 'transparent',
              color: isActive ? '#ffffff' : '#555555',
              border: 'none',
              borderRadius: '100px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: isActive ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;
