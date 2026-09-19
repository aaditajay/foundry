import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleIdeas } from '../data/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';

export const NewIdea = () => {
  const { 
    user, 
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

  const userName = user?.name ? user.name.split(' ')[0] : "Founder";

  const onSubmit = (e) => {
    e.preventDefault();
    handleForgeSubmit();
  };

  const fillSample = (sample) => {
    setIdeaInput(sample.description);
    setLocation(sample.location);
    setBudget(sample.budget);
    setAdditionalInfo(sample.additionalInfo);
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      {/* Top Greeting matching Reference Screen 5 */}
      <div className="greeting-header">
        Hello <strong>{userName}</strong>,
      </div>

      {/* Main Idea Form matching Reference Screen 5 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
        
        <h1 className="page-title" style={{ fontSize: '38px', fontWeight: '800', marginBottom: '28px', letterSpacing: '-1px' }}>
          Let’s Forge Your Idea.
        </h1>

        <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Large Main Box: "Describe your idea." matching Reference Screen 5 */}
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '24px 28px', minHeight: '140px' }}>
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

          {/* Two Side-by-Side Boxes: "Location" & "Budget(If Needed)" matching Reference Screen 5 */}
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

          {/* Bottom Box: "Anything else to know about" matching Reference Screen 5 */}
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

          {/* Quick Demo Sample Fillers for Hackathon Presentation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#777777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Sample Demo Ideas:
            </span>
            {sampleIdeas.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => fillSample(s)}
                style={{
                  background: '#f0f0f0',
                  border: '1px solid #dcdcdc',
                  borderRadius: '100px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e2e2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                💡 {s.title.split('—')[0]}
              </button>
            ))}
          </div>

          {/* Primary CTA: "Forge" matching Reference Screen 5 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
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

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingTop: '16px' }}>
        FOUNDry Multi-Agent Engine • Ready to analyze
      </div>
    </div>
  );
};

export default NewIdea;
