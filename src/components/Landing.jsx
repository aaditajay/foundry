import React from 'react';
import { useApp } from '../context/AppContext';

export const Landing = () => {
  const { navigate, user } = useApp();

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', padding: '48px 64px' }}>
      {/* Top Greeting matching Reference Image 2 */}
      <div className="greeting-header" style={{ fontSize: '42px' }}>
        Hello <strong style={{ fontWeight: '800' }}>Founder</strong>,
      </div>

      {/* Center Content matching Reference Image 2 */}
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

        {/* Forge CTA Pill Button matching Reference Image 2 */}
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

      {/* Subtle bottom spacer for balanced whitespace */}
      <div style={{ height: '24px' }} />
    </div>
  );
};

export default Landing;
