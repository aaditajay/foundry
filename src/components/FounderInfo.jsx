import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const FounderInfo = () => {
  const { user, founderInfo, handleSaveFounderInfo } = useApp();

  const [name, setName] = useState(user?.name || founderInfo?.name || "");
  const [industry, setIndustry] = useState(founderInfo?.industry || "Tech / Software");
  const [role, setRole] = useState(founderInfo?.role || "Founder & CEO");
  const [experience, setExperience] = useState(founderInfo?.experience || "First-time Founder");

  const displayName = name ? name.split(' ')[0] : "Founder";

  const handleNext = (e) => {
    e.preventDefault();
    handleSaveFounderInfo({
      name: name || user?.name || "Founder",
      industry,
      role,
      experience
    });
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between' }}>
      {/* Top Greeting */}
      <div className="greeting-header">
        Hello <strong>{displayName}</strong>,
      </div>

      {/* Center Card Input */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '640px', margin: 'auto' }}>
        
        <form onSubmit={handleNext} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          
          {/* Founder Name Input if not present */}
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px', width: '100%' }}>
            <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Your Name</span>
            <input 
              type="text" 
              placeholder="e.g. Alex Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '18px', fontWeight: '600', color: '#111111', width: '100%' }}
              required
            />
          </div>

          {/* Main Startup Description Container */}
          <div 
            style={{ 
              backgroundColor: '#e6e6e6', 
              borderRadius: '20px', 
              padding: '32px', 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <label style={{ fontSize: '20px', fontWeight: '500', color: '#111111' }}>
              Tell Us About Your Startup
            </label>
            <input 
              type="text"
              placeholder="e.g. Early-stage AI SaaS / EdTech / Consumer platform..."
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '17px',
                color: '#333333',
                fontFamily: 'inherit',
                width: '100%'
              }}
            />
          </div>

          {/* Role & Stage fields */}
          <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '16px', padding: '16px 22px' }}>
              <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Your Role</span>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600', color: '#111111', width: '100%' }}
              />
            </div>

            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '16px', padding: '16px 22px' }}>
              <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Stage</span>
              <input 
                type="text" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600', color: '#111111', width: '100%' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            style={{ marginTop: '8px', padding: '16px 44px', fontSize: '17px' }}
          >
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        </form>

      </div>

      {/* Footer text: Only "Founder Profile" as requested */}
      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingBottom: '8px' }}>
        Founder Profile
      </div>
    </div>
  );
};

export default FounderInfo;
