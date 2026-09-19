import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

export const NewIdea = () => {
  const { 
    user, 
    founderInfo,
    ideaInput, 
    setIdeaInput, 
    location, 
    setLocation, 
    budget, 
    setBudget, 
    additionalInfo, 
    setAdditionalInfo,
    handleForgeSubmit 
  } = useApp();

  // Show registered founder's name
  const registeredName = user?.name || founderInfo?.name || "Founder";
  const userName = registeredName.split(' ')[0];

  const onSubmit = (e) => {
    e.preventDefault();
    handleForgeSubmit();
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      {/* Top Greeting showing registered founder's name */}
      <div className="greeting-header">
        Hello <strong>{userName}</strong>,
      </div>

      {/* Main Idea Form */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
        
        <h1 className="page-title" style={{ fontSize: '38px', fontWeight: '800', marginBottom: '28px', letterSpacing: '-1px' }}>
          Let’s Forge Your Idea.
        </h1>

        <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Large Main Box: "Describe your idea." */}
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '24px 28px', minHeight: '150px' }}>
            <textarea
              placeholder="Describe your idea."
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              rows={4}
              required
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '18px',
                color: '#111111',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: '1.5'
              }}
              autoFocus
            />
          </div>

          {/* Two Side-by-Side Boxes: "Location" & "Budget(If Needed)" */}
          <div style={{ display: 'flex', gap: '18px' }}>
            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px' }}>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#111111',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px' }}>
              <input
                type="text"
                placeholder="Budget(If Needed)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#111111',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Bottom Box: "Anything else to know about" */}
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px' }}>
            <input
              type="text"
              placeholder="Anything else to know about"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#111111',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Primary CTA: "Forge" */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ padding: '18px 56px', fontSize: '18px', borderRadius: '16px' }}
            >
              <Sparkles size={20} />
              <span>Forge</span>
            </button>
          </div>

        </form>

      </div>

      {/* Bottom text updated to "Foundry" */}
      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingTop: '16px' }}>
        Foundry Multi-Agent Engine • Ready to analyze
      </div>
    </div>
  );
};

export default NewIdea;
