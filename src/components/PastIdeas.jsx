import React from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { generateStrategyData } from '../data/mockData';

export const PastIdeas = () => {
  const { pastIdeas, setCurrentStrategy, navigate } = useApp();

  const handleSelectIdea = (ideaItem) => {
    if (ideaItem.strategyData) {
      setCurrentStrategy(ideaItem.strategyData);
    } else {
      const generated = generateStrategyData(ideaItem.description, ideaItem.location, ideaItem.budget);
      setCurrentStrategy(generated);
    }
    navigate('STRATEGY');
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '40px' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', letterSpacing: '2px', textTransform: 'uppercase' }}>
              History Log
            </span>
            <h1 className="page-title" style={{ textAlign: 'left', fontSize: '38px', fontWeight: '800', marginTop: '2px', letterSpacing: '-1.5px' }}>
              Past Forged Ideas
            </h1>
          </div>

          <button 
            onClick={() => navigate('NEW_IDEA')}
            className="btn-primary"
            style={{ borderRadius: '14px', padding: '14px 28px', fontSize: '15px' }}
          >
            <PlusCircle size={18} />
            <span>Forge New Idea</span>
          </button>
        </div>

        {/* Ideas List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {pastIdeas.length === 0 ? (
            <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '48px', textAlign: 'center', color: '#666666' }}>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>No forged ideas yet.</p>
              <button 
                onClick={() => navigate('NEW_IDEA')} 
                className="btn-primary" 
                style={{ marginTop: '16px' }}
              >
                Forge Your First Startup Idea
              </button>
            </div>
          ) : (
            pastIdeas.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#e6e6e6',
                  borderRadius: '20px',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  gap: '24px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onClick={() => handleSelectIdea(item)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dadada'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e6e6e6'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111111' }}>
                      {item.title}
                    </h3>
                    <span style={{ backgroundColor: '#111111', color: '#ffffff', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '100px' }}>
                      Strategy Ready
                    </span>
                  </div>

                  <p style={{ fontSize: '15px', color: '#555555', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#777777', fontWeight: '500' }}>
                    <span>📍 {item.location || 'Global'}</span>
                    <span>💰 {item.budget || 'Flexible'}</span>
                    <span>🗓️ {item.date || 'Recent'}</span>
                  </div>
                </div>

                <button 
                  style={{ 
                    backgroundColor: '#111111', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    padding: '12px 24px', 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0
                  }}
                >
                  <span>View Strategy</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingTop: '24px' }}>
        Foundry Startup Strategy Archive
      </div>

    </div>
  );
};

export default PastIdeas;
