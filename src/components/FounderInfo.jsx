import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const FounderInfo = () => {
  const { user, founderInfo, setFounderInfo, navigate } = useApp();

  const userName = user?.name ? user.name.split(' ')[0] : "Founder";

  const handleNext = (e) => {
    e.preventDefault();
    navigate('NEW_IDEA');
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between' }}>
      {/* Top Greeting matching Reference Screen 4 */}
      <div className="greeting-header">
        Hello <strong>{userName}</strong>,
      </div>

      {/* Center Card Input matching Reference Screen 4 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '640px', margin: 'auto' }}>
        
        <form onSubmit={handleNext} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          
          {/* Main Gray Input Container matching Reference Screen 4 */}
          <div 
            style={{ 
              backgroundColor: '#e6e6e6', 
              borderRadius: '20px', 
              padding: '36px 32px', 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <label style={{ fontSize: '22px', fontWeight: '500', color: '#111111' }}>
              Tell Us About Your Startup
            </label>
            <input 
              type="text"
              placeholder="e.g. Early-stage AI SaaS / EdTech / Consumer platform..."
              value={founderInfo.industry}
              onChange={(e) => setFounderInfo({...founderInfo, industry: e.target.value})}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '18px',
                color: '#333333',
                fontFamily: 'inherit',
                width: '100%'
              }}
              autoFocus
            />
          </div>

          {/* Role / Experience fields in subtle style */}
          <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '16px', padding: '18px 24px' }}>
              <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Your Role</span>
              <input 
                type="text" 
                value={founderInfo.role}
                onChange={(e) => setFounderInfo({...founderInfo, role: e.target.value})}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600', color: '#111111', width: '100%' }}
              />
            </div>

            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '16px', padding: '18px 24px' }}>
              <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Stage</span>
              <input 
                type="text" 
                value={founderInfo.experience}
                onChange={(e) => setFounderInfo({...founderInfo, experience: e.target.value})}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600', color: '#111111', width: '100%' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            style={{ marginTop: '12px', padding: '16px 40px', fontSize: '17px' }}
          >
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        </form>

      </div>

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingBottom: '8px' }}>
        Step 1 of 2 • Founder Profile
      </div>
    </div>
  );
};

export default FounderInfo;
