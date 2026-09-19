import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, ArrowRight, GitMerge, Zap } from 'lucide-react';

export const ConflictResolution = () => {
  const { currentStrategy, navigate } = useApp();

  const resData = currentStrategy?.resolution || {
    beforeState: {
      product: "₹199 / $20 premium pricing",
      market: "Target users prefer ₹80–₹120 ($8–$12)",
      finance: "Requires ₹150+ ($15) unit revenue"
    },
    afterState: {
      tiers: [
        { name: "Basic Tier", price: "₹99 / $9.99", desc: "Low-friction entry for market adoption" },
        { name: "Premium Tier", price: "₹149 / $14.99", desc: "Core feature set & unit margin feasibility" },
        { name: "Enterprise", price: "₹299 / $29.99", desc: "High-value customization & white-labeling" }
      ],
      alignments: [
        { agent: "Market", status: "Aligned (₹99 barrier removed)" },
        { agent: "Product", status: "Adapted (Feature gating protects premium value)" },
        { agent: "Finance", status: "Recalculated (Blended ARPU reaches ₹168 - profitable)" }
      ]
    }
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Foundry Synthesis Engine • Step 6 of 7
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} /> Resolution Formulated
          </span>
        </div>

        <h1 className="page-title" style={{ textAlign: 'left', fontSize: '36px', fontWeight: '800', marginBottom: '6px' }}>
          Disagreement & Resolution Matrix
        </h1>
        <p style={{ color: '#666666', fontSize: '16px', marginBottom: '28px' }}>
          Foundry balances competing agent priorities into a single optimized strategy.
        </p>
      </div>

      {/* Before vs After Comparison Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '16px', alignItems: 'center', margin: '8px 0' }}>
        
        {/* BEFORE CARD */}
        <div style={{ backgroundColor: '#e6e6e6', borderRadius: '24px', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#666666', letterSpacing: '1.5px' }}>
                BEFORE (CONFLICT)
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#d0d0d0', color: '#333333', padding: '3px 10px', borderRadius: '100px' }}>
                3 Disjoint Stances
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px 20px', borderLeft: '4px solid #111111' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', display: 'block' }}>PRODUCT AGENT</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#111111' }}>{resData.beforeState.product}</span>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px 20px', borderLeft: '4px solid #666666' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', display: 'block' }}>MARKET AGENT</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#111111' }}>{resData.beforeState.market}</span>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '16px 20px', borderLeft: '4px solid #888888' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', display: 'block' }}>FINANCE AGENT</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#111111' }}>{resData.beforeState.finance}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', fontSize: '13px', color: '#666666', fontStyle: 'italic' }}>
            Result: Strategy deadlock without compromise logic.
          </div>
        </div>

        {/* CENTER CONVERGENCE ICON */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#161616', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <GitMerge size={22} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#888888', marginTop: '8px', letterSpacing: '0.5px' }}>
            SYNTHESIS
          </span>
        </div>

        {/* AFTER CARD (FOUNDRY RESOLUTION) */}
        <div style={{ backgroundColor: '#161616', color: '#ffffff', borderRadius: '24px', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#aaaaaa', letterSpacing: '1.5px' }}>
                AFTER (RESOLVED)
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#ffffff', color: '#111111', padding: '3px 10px', borderRadius: '100px' }}>
                Dual-Tier Compromise
              </span>
            </div>

            {/* Tier Breakdown */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div style={{ flex: 1, backgroundColor: '#262626', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>₹99</div>
                <div style={{ fontSize: '12px', color: '#aaaaaa', fontWeight: '600' }}>Basic</div>
              </div>
              <div style={{ flex: 1, backgroundColor: '#ffffff', color: '#111111', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>₹149</div>
                <div style={{ fontSize: '12px', fontWeight: '700' }}>Premium</div>
              </div>
            </div>

            {/* Agent Alignments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resData.afterState.alignments.map((alg, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} />
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff' }}>{alg.agent}:</strong>{' '}
                    <span style={{ color: '#cccccc' }}>{alg.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #333333', fontSize: '13px', color: '#888888' }}>
            ✓ Market aligned • Product adapted • Finance recalculated
          </div>
        </div>

      </div>

      {/* Bottom Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px' }}>
        <button 
          onClick={() => navigate('COOPERATION')}
          style={{ background: 'none', border: 'none', color: '#777777', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}
        >
          ← Back to Agent Dialogue
        </button>

        <button 
          onClick={() => navigate('STRATEGY')}
          className="btn-primary"
          style={{ padding: '18px 44px', fontSize: '17px', borderRadius: '16px' }}
        >
          <span>Reveal Final Strategy Report</span>
          <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default ConflictResolution;
