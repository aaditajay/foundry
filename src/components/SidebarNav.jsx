import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, History, User, PlusCircle, Home } from 'lucide-react';

export const SidebarNav = () => {
  const { activeScreen, navigate, user, founderInfo, handleLogout } = useApp();

  const displayName = user?.name || founderInfo?.name || "Founder";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', width: '100%', opacity: 0.95 }}>
      {/* Home / Landing */}
      <button 
        onClick={() => navigate('LANDING')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: activeScreen === 'LANDING' ? 'rgba(255,255,255,0.18)' : 'transparent',
          border: 'none',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 600,
          textAlign: 'left',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          if (activeScreen !== 'LANDING') e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
        onMouseLeave={(e) => {
          if (activeScreen !== 'LANDING') e.currentTarget.style.background = 'transparent';
        }}
      >
        <Home size={16} />
        <span>Home</span>
      </button>

      {/* Forge New Idea */}
      <button 
        onClick={() => navigate('NEW_IDEA')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: activeScreen === 'NEW_IDEA' ? 'rgba(255,255,255,0.18)' : 'transparent',
          border: 'none',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 600,
          textAlign: 'left',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          if (activeScreen !== 'NEW_IDEA') e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
        onMouseLeave={(e) => {
          if (activeScreen !== 'NEW_IDEA') e.currentTarget.style.background = 'transparent';
        }}
      >
        <PlusCircle size={16} />
        <span>Forge New Idea</span>
      </button>

      {/* Past Ideas / History */}
      <button 
        onClick={() => navigate('PAST_IDEAS')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: activeScreen === 'PAST_IDEAS' ? 'rgba(255,255,255,0.18)' : 'transparent',
          border: 'none',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 600,
          textAlign: 'left',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          if (activeScreen !== 'PAST_IDEAS') e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
        onMouseLeave={(e) => {
          if (activeScreen !== 'PAST_IDEAS') e.currentTarget.style.background = 'transparent';
        }}
      >
        <History size={16} />
        <span>Past Ideas / History</span>
      </button>

      {/* Founder Profile */}
      <button 
        onClick={() => navigate('FOUNDER_INFO')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: activeScreen === 'FOUNDER_INFO' ? 'rgba(255,255,255,0.18)' : 'transparent',
          border: 'none',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: 600,
          textAlign: 'left',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          if (activeScreen !== 'FOUNDER_INFO') e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
        onMouseLeave={(e) => {
          if (activeScreen !== 'FOUNDER_INFO') e.currentTarget.style.background = 'transparent';
        }}
      >
        <User size={16} />
        <span>Founder Profile</span>
      </button>

      {/* User Badge / Logout */}
      <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user?.photoURL ? (
            <img src={user.photoURL} alt={displayName} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
          ) : (
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={14} />
            </div>
          )}
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#dddddd', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </span>
        </div>
        {user && (
          <button 
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: '#aaaaaa', fontSize: '11px', cursor: 'pointer' }}
          >
            Exit
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarNav;
