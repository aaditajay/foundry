import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Circle, ArrowRight, Loader2, Play } from 'lucide-react';

export const ForgingAgents = () => {
  const { currentStrategy, navigate, ideaInput } = useApp();
  
  // Step state for progressive agent checkmarks animation
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Auto progress checkmarks across Market, Product, and Finance
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < 6) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const data = currentStrategy || {
    meta: { title: ideaInput || "Startup Strategy" },
    agents: {
      market: { name: "MARKET", role: "Understanding customers and competition" },
      product: { name: "PRODUCT", role: "Shaping the solution" },
      finance: { name: "FINANCE", role: "Testing feasibility" }
    }
  };

  const marketChecks = [
    { text: "Target users identified", done: stepIndex >= 1 },
    { text: "Competitors analyzed", done: stepIndex >= 2 }
  ];

  const productChecks = [
    { text: "Value proposition", done: stepIndex >= 3 },
    { text: "MVP definition", done: stepIndex >= 4 }
  ];

  const financeChecks = [
    { text: "Pricing analysis", done: stepIndex >= 5 },
    { text: "Unit economics", done: stepIndex >= 6 }
  ];

  const isComplete = stepIndex >= 6;

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      
      {/* Top Bar with Idea Summary */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Forging Active Idea
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111111', marginTop: '2px' }}>
              {data.meta.title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#e6e6e6', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '700' }}>
            {!isComplete ? (
              <>
                <Loader2 size={16} className="animate-spin" style={{ color: '#111111' }} />
                <span>Agents Analyzing...</span>
              </>
            ) : (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span>Analysis Complete</span>
              </>
            )}
          </div>
        </div>

        {/* Visual Progression Pipeline Banner */}
        <div 
          style={{ 
            backgroundColor: '#161616', 
            borderRadius: '16px', 
            padding: '16px 28px', 
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '36px',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          <div style={{ color: '#ffffff', opacity: 1 }}>1. Idea</div>
          <span style={{ color: '#555555' }}>→</span>
          <div style={{ color: stepIndex >= 1 ? '#ffffff' : '#666666' }}>2. Market Analysis</div>
          <span style={{ color: '#555555' }}>→</span>
          <div style={{ color: stepIndex >= 3 ? '#ffffff' : '#666666' }}>3. Product Analysis</div>
          <span style={{ color: '#555555' }}>→</span>
          <div style={{ color: stepIndex >= 5 ? '#ffffff' : '#666666' }}>4. Financial Analysis</div>
          <span style={{ color: '#555555' }}>→</span>
          <div style={{ color: isComplete ? '#ffffff' : '#666666', fontWeight: isComplete ? '800' : '600' }}>5. Cooperation</div>
        </div>
      </div>

      {/* 3 Specialized Agent Cards Stacked / Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', margin: '12px 0' }}>
        
        {/* MARKET AGENT CARD */}
        <div 
          style={{ 
            backgroundColor: '#e6e6e6', 
            borderRadius: '20px', 
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            minHeight: '260px',
            border: stepIndex < 3 && stepIndex >= 1 ? '2px solid #111111' : '2px solid transparent',
            transition: 'all 0.3s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', color: '#111111' }}>
                MARKET
              </span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666' }}>
                {stepIndex >= 2 ? 'Done' : 'Working'}
              </span>
            </div>

            <p style={{ fontSize: '14px', color: '#555555', marginBottom: '24px' }}>
              Understanding customers and competition
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {marketChecks.map((chk, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: chk.done ? '#111111' : '#777777', fontWeight: chk.done ? '600' : '400' }}>
                  {chk.done ? (
                    <CheckCircle2 size={18} style={{ color: '#111111' }} />
                  ) : (
                    <Circle size={18} style={{ color: '#999999' }} />
                  )}
                  <span>{chk.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #d0d0d0', fontSize: '12px', color: '#555555', fontStyle: 'italic' }}>
            "Identified student & SMB price sensitivity."
          </div>
        </div>

        {/* PRODUCT AGENT CARD */}
        <div 
          style={{ 
            backgroundColor: '#e6e6e6', 
            borderRadius: '20px', 
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            minHeight: '260px',
            border: stepIndex >= 3 && stepIndex < 5 ? '2px solid #111111' : '2px solid transparent',
            transition: 'all 0.3s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', color: '#111111' }}>
                PRODUCT
              </span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666' }}>
                {stepIndex >= 4 ? 'Done' : stepIndex >= 3 ? 'Working' : 'Pending'}
              </span>
            </div>

            <p style={{ fontSize: '14px', color: '#555555', marginBottom: '24px' }}>
              Shaping the solution & MVP
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {productChecks.map((chk, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: chk.done ? '#111111' : '#777777', fontWeight: chk.done ? '600' : '400' }}>
                  {chk.done ? (
                    <CheckCircle2 size={18} style={{ color: '#111111' }} />
                  ) : (
                    <Circle size={18} style={{ color: '#999999' }} />
                  )}
                  <span>{chk.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #d0d0d0', fontSize: '12px', color: '#555555', fontStyle: 'italic' }}>
            "Designing premium feature set & rapid flow."
          </div>
        </div>

        {/* FINANCE AGENT CARD */}
        <div 
          style={{ 
            backgroundColor: '#e6e6e6', 
            borderRadius: '20px', 
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            minHeight: '260px',
            border: stepIndex >= 5 ? '2px solid #111111' : '2px solid transparent',
            transition: 'all 0.3s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px', color: '#111111' }}>
                FINANCE
              </span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#666666' }}>
                {stepIndex >= 6 ? 'Done' : stepIndex >= 5 ? 'Working' : 'Pending'}
              </span>
            </div>

            <p style={{ fontSize: '14px', color: '#555555', marginBottom: '24px' }}>
              Testing economic feasibility
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {financeChecks.map((chk, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: chk.done ? '#111111' : '#777777', fontWeight: chk.done ? '600' : '400' }}>
                  {chk.done ? (
                    <CheckCircle2 size={18} style={{ color: '#111111' }} />
                  ) : (
                    <Circle size={18} style={{ color: '#999999' }} />
                  )}
                  <span>{chk.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #d0d0d0', fontSize: '12px', color: '#555555', fontStyle: 'italic' }}>
            "Calculating minimum unit revenue targets."
          </div>
        </div>

      </div>

      {/* Bottom Action CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px' }}>
        <button 
          onClick={() => setStepIndex(6)}
          style={{ background: 'none', border: 'none', color: '#777777', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}
        >
          Fast-forward simulation
        </button>

        <button 
          onClick={() => navigate('COOPERATION')}
          className="btn-primary"
          style={{ padding: '16px 40px', fontSize: '16px' }}
        >
          <span>Proceed to Agent Cooperation</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default ForgingAgents;
