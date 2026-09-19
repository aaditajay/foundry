import React from 'react';
import FoundryLogo from './FoundryLogo';
import { useApp } from '../context/AppContext';
import { Sparkles, History, User, PlusCircle } from 'lucide-react';

export const Sidebar = () => {
  const { activeScreen, navigate, user, founderInfo, handleLogout } = useApp();

  // If splash screen, don't render standard static sidebar (Splash renders animated logo)
  if (activeScreen === 'SPLASH') return null;

  const showNav = ['NEW_IDEA', 'FORGING', 'COOPERATION', 'CONFLICT', 'STRATEGY', 'PAST_IDEAS'].includes(activeScreen);

  const displayName = user?.name || founderInfo?.name || "Founder";

  return (
    <div className="sidebar">
      {/* Top Brand Name: "Foundry" */}
      <div className="sidebar-top">
        <div 
          className="brand-header cursor-pointer flex items-center justify-between"
          onClick={() => navigate(user ? 'NEW_IDEA' : 'LANDING')}
          style={{ cursor: 'pointer', textTransform: 'none', fontSize: '15px', fontWeight: '800', letterSpacing: '1px' }}
        >
          <span>Foundry</span>
        </div>
      </div>

      {/* Center Logo in Sidebar */}
      <div className="sidebar-center-logo">
        <div style={{ transform: 'scale(1.2)' }}>
          <FoundryLogo color="#FFFFFF" className="w-20 h-24" />
        </div>
      </div>

      {/* Navigation Links */}
      {showNav && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', opacity: 0.9 }}>
          <button 
            onClick={() => navigate('NEW_IDEA')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: activeScreen === 'NEW_IDEA' ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '10px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              textAlign: 'left'
            }}
          >
            <PlusCircle size={16} />
            <span>Forge New Idea</span>
          </button>

          <button 
            onClick={() => navigate('PAST_IDEAS')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: activeScreen === 'PAST_IDEAS' ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '10px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              textAlign: 'left'
            }}
          >
            <History size={16} />
            <span>Past Ideas</span>
          </button>

          {user && (
            <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={displayName} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                ) : (
                  <User size={16} />
                )}
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#dddddd', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayName}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: '#999999', fontSize: '11px', cursor: 'pointer' }}
              >
                Exit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
