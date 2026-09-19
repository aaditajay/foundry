import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const Cooperation = () => {
  const { currentStrategy, navigate } = useApp();

  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showConflict, setShowConflict] = useState(false);

  useEffect(() => {
    // Sequential reveal of agent perspectives
    const timer1 = setTimeout(() => setVisibleMessages(1), 600);
    const timer2 = setTimeout(() => setVisibleMessages(2), 1600);
    const timer3 = setTimeout(() => setVisibleMessages(3), 2600);
    const timer4 = setTimeout(() => setShowConflict(true), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const dialogue = currentStrategy?.cooperation?.dialogue || [
    {
      agent: "MARKET",
      avatar: "📊",
      message: "Target users & students are highly price sensitive. Pricing above ₹120 will trigger high friction and low conversion.",
      tone: "cautious"
    },
    {
      agent: "PRODUCT",
      avatar: "⚡",
      message: "A high-quality, premium user experience requires ₹199 to deliver optimal compute and features.",
      tone: "ambitious"
    },
    {
      agent: "FINANCE",
      avatar: "📈",
      message: "Unit economics fail below ₹150 revenue per user. Sub-₹150 pricing will burn capital prematurely.",
      tone: "analytical"
    }
  ];

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Foundry Engine • Step 5 of 7
          </span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#111111' }}>
            Theme: Multi-Agent Cooperation
          </span>
        </div>

        <h1 className="page-title" style={{ textAlign: 'left', fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>
          Agents Comparing Perspectives
        </h1>
        <p style={{ color: '#666666', fontSize: '16px', marginBottom: '32px' }}>
          AI agents do not work in isolation. They evaluate tradeoffs and critique each other's assumptions.
        </p>
      </div>

      {/* Visual Tri-Agent Dialogue Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', position: 'relative' }}>
        
        {/* MARKET PERSPECTIVE CARD */}
        <div 
          style={{ 
            backgroundColor: '#e6e6e6', 
            borderRadius: '24px', 
            padding: '28px',
            opacity: visibleMessages >= 1 ? 1 : 0.3,
            transform: visibleMessages >= 1 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            border: visibleMessages >= 1 ? '2px solid #111111' : '2px solid transparent'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>📊</span>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', color: '#111111' }}>
                  MARKET AGENT
                </h3>
                <span style={{ fontSize: '12px', color: '#666666' }}>Customer & Demand Focus</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '18px 20px', fontSize: '15px', color: '#111111', lineHeight: '1.5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              "{dialogue[0].message}"
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#555555' }}>
            <span>Stance: Low Price Barrier</span>
            <span>Weight: High</span>
          </div>
        </div>

        {/* PRODUCT PERSPECTIVE CARD */}
        <div 
          style={{ 
            backgroundColor: '#e6e6e6', 
            borderRadius: '24px', 
            padding: '28px',
            opacity: visibleMessages >= 2 ? 1 : 0.3,
            transform: visibleMessages >= 2 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            border: visibleMessages >= 2 ? '2px solid #111111' : '2px solid transparent'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>⚡</span>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', color: '#111111' }}>
                  PRODUCT AGENT
                </h3>
                <span style={{ fontSize: '12px', color: '#666666' }}>Value & Experience Focus</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '18px 20px', fontSize: '15px', color: '#111111', lineHeight: '1.5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              "{dialogue[1].message}"
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#555555' }}>
            <span>Stance: Premium Quality</span>
            <span>Weight: High</span>
          </div>
        </div>

        {/* FINANCE PERSPECTIVE CARD */}
        <div 
          style={{ 
            backgroundColor: '#e6e6e6', 
            borderRadius: '24px', 
            padding: '28px',
            opacity: visibleMessages >= 3 ? 1 : 0.3,
            transform: visibleMessages >= 3 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            border: visibleMessages >= 3 ? '2px solid #111111' : '2px solid transparent'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>📈</span>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px', color: '#111111' }}>
                  FINANCE AGENT
                </h3>
                <span style={{ fontSize: '12px', color: '#666666' }}>Feasibility & Margin Focus</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '18px 20px', fontSize: '15px', color: '#111111', lineHeight: '1.5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              "{dialogue[2].message}"
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#555555' }}>
            <span>Stance: Unit Viability</span>
            <span>Weight: High</span>
          </div>
        </div>

      </div>

      {/* CONFLICT DETECTED BANNER */}
      <div 
        style={{ 
          marginTop: '32px',
          backgroundColor: '#161616',
          borderRadius: '20px',
          padding: '24px 32px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          opacity: showConflict ? 1 : 0,
          transform: showConflict ? 'scale(1)' : 'scale(0.97)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>
                Conflict Detected
              </h3>
              <span style={{ backgroundColor: '#ffffff', color: '#111111', fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase' }}>
                Friction Point
              </span>
            </div>
            <p style={{ color: '#bbbbbb', fontSize: '14px', marginTop: '4px' }}>
              Product wants ₹199 • Market caps at ₹120 • Finance demands ₹150+ unit revenue.
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate('CONFLICT')}
          className="btn-primary"
          style={{ backgroundColor: '#ffffff', color: '#111111', padding: '14px 28px', fontSize: '15px', borderRadius: '12px', flexShrink: 0 }}
        >
          <span>Resolve Conflict</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingTop: '16px' }}>
        Different perspectives → Conflict → Discussion → Resolution
      </div>
    </div>
  );
};

export default Cooperation;
