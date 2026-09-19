import React from 'react';
import { useApp } from '../context/AppContext';

export const Landing = () => {
  const { navigate, user } = useApp();

  return (
    <div className="page-content animate-fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Greeting */}
      <div className="greeting-header" style={{ fontSize: '42px' }}>
        Hello <strong style={{ fontWeight: '800' }}>Founder</strong>,
      </div>

      {/* Center Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'auto 0' }}>
        
        <h1 
          className="page-title" 
          style={{ fontSize: '56px', fontWeight: '800', letterSpacing: '-1.8px', color: '#000000', marginBottom: '12px' }}
        >
          Turn Ideas Into Strategy.
        </h1>
        
        <p style={{ fontSize: '18px', fontWeight: '400', color: '#555555', letterSpacing: '0.2px', marginBottom: '44px' }}>
          Market. Product. Finance.
        </p>

        {/* Forge CTA Pill Button */}
        <button 
          onClick={() => navigate(user ? 'NEW_IDEA' : 'LOGIN')}
          style={{
            backgroundColor: '#d2d2d2',
            color: '#333333',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 64px',
            fontSize: '22px',
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: 'italic',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c4c4c4';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#d2d2d2';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          forge
        </button>
      </div>

      <div style={{ height: '24px' }} />
    </div>
  );
};

export default Landing;
