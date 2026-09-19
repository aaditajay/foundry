import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const Landing = () => {
  const { navigate, user } = useApp();

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between' }}>
      {/* Top Greeting matching Reference Screen 2 */}
      <div className="greeting-header">
        Hello <strong>Founder</strong>,
      </div>

      {/* Center Content matching Reference Screen 2 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'auto 0' }}>
        <h1 
          className="page-title" 
          style={{ fontSize: '52px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '16px' }}
        >
          Turn Ideas Into Strategy.
        </h1>
        
        <p style={{ fontSize: '24px', fontWeight: '500', color: '#555555', letterSpacing: '-0.5px', marginBottom: '48px' }}>
          Market. Product. Finance.
        </p>

        <button 
          onClick={() => navigate(user ? 'NEW_IDEA' : 'LOGIN')}
          className="btn-primary"
          style={{ padding: '18px 48px', fontSize: '18px', borderRadius: '16px' }}
        >
          <span>forge</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Footer subtle text */}
      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingBottom: '8px' }}>
        AI-Powered Multi-Agent Strategy Platform
      </div>
    </div>
  );
};

export default Landing;
