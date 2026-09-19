import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { Download, PlusCircle, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const FinalStrategy = () => {
  const { currentStrategy, navigate, ideaInput } = useApp();

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log("Confetti triggered");
    }
  }, []);

  const strat = currentStrategy || {
    meta: {
      title: ideaInput || "Startup Strategy",
      location: "India / Global",
      createdAt: "Today"
    },
    strategyReport: {
      executiveSummary: "High-potential venture operating in an expanding market segment, combining streamlined product execution with multi-tiered pricing.",
      targetMarket: {
        segment: "Early Adopter Professionals & Tech Enthusiasts",
        tam: "₹4,200 Cr ($500M) TAM",
        sam: "₹650 Cr ($80M) SAM",
        som: "₹45 Cr ($5.5M) SOM"
      },
      problem: "Target customers suffer from overly complex, expensive incumbents with steep learning curves.",
      solution: "A unified, minimal platform that delivers instant value with automated workflows.",
      mvpScope: [
        "One-click user onboarding with automated configuration",
        "Core workflow engine with status tracking",
        "Exportable reports and sharing capabilities"
      ],
      pricingStrategy: "Hybrid Freemium / Tiered Monthly Subscription (₹99 Basic / ₹149 Pro / ₹299 Enterprise)",
      unitEconomics: {
        arpu: "Blended ₹168 / month",
        cac: "₹380 estimated",
        ltv: "₹2,180 based on 13-month retention",
        ltvCacRatio: "5.7x"
      },
      risksAndMitigation: [
        { risk: "Incumbent price cutting", mitigation: "Faster feature iteration cycles" },
        { risk: "Trial churn", mitigation: "Instant time-to-value onboarding" }
      ],
      nextSteps: [
        "Finalize interactive prototype (Week 1-2)",
        "Deploy waitlist landing page (Week 2-3)",
        "Launch MVP with pilot users (Week 4-6)"
      ]
    }
  };

  const report = strat.strategyReport;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ paddingBottom: '60px' }}>
      
      {/* Header & Export Actions */}
      <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '24px', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#888888', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Foundry Strategy Output
            </span>
            <h1 className="page-title" style={{ textAlign: 'left', fontSize: '42px', fontWeight: '800', marginTop: '4px', letterSpacing: '-1.5px' }}>
              Your Strategy Is Ready.
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={handlePrint}
              className="btn-secondary"
              style={{ borderRadius: '12px', padding: '12px 20px' }}
            >
              <Download size={16} />
              <span>Export PDF</span>
            </button>

            <button 
              onClick={() => navigate('NEW_IDEA')}
              className="btn-primary"
              style={{ borderRadius: '12px', padding: '12px 24px' }}
            >
              <PlusCircle size={16} />
              <span>Forge Another Idea</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '24px', fontSize: '14px', color: '#666666' }}>
          <div><strong>Venture:</strong> {strat.meta.title}</div>
          <div>•</div>
          <div><strong>Location:</strong> {strat.meta.location}</div>
          <div>•</div>
          <div><strong>Generated:</strong> {strat.meta.createdAt}</div>
        </div>
      </div>

      {/* Editorial Strategy Document Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '44px', maxWidth: '900px' }}>
        
        {/* SECTION 1: EXECUTIVE SUMMARY */}
        <section>
          <h2 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>
            01. Executive Summary
          </h2>
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '32px', fontSize: '18px', color: '#111111', lineHeight: '1.6', fontWeight: '500' }}>
            {report.executiveSummary}
          </div>
        </section>

        {/* SECTION 2: TARGET MARKET & TAM/SAM/SOM */}
        <section>
          <h2 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>
            02. Target Market & Sizing
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#666666', display: 'block', marginBottom: '6px' }}>TOTAL MARKET (TAM)</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#111111' }}>{report.targetMarket.tam}</span>
            </div>
            <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#666666', display: 'block', marginBottom: '6px' }}>SERVICED MARKET (SAM)</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#111111' }}>{report.targetMarket.sam}</span>
            </div>
            <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#666666', display: 'block', marginBottom: '6px' }}>OBTAINABLE MARKET (SOM)</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#111111' }}>{report.targetMarket.som}</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROBLEM & SOLUTION */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#666666', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
              Problem Statement
            </h3>
            <p style={{ fontSize: '16px', color: '#111111', lineHeight: '1.5' }}>
              {report.problem}
            </p>
          </div>

          <div style={{ backgroundColor: '#161616', color: '#ffffff', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#aaaaaa', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
              Core Solution
            </h3>
            <p style={{ fontSize: '16px', color: '#ffffff', lineHeight: '1.5' }}>
              {report.solution}
            </p>
          </div>
        </section>

        {/* SECTION 4: MVP SCOPE */}
        <section>
          <h2 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>
            04. Minimum Viable Product (MVP) Scope
          </h2>
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {report.mvpScope.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '600', color: '#111111' }}>
                <CheckCircle2 size={20} style={{ color: '#111111', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: PRICING & UNIT ECONOMICS */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#666666', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
              Resolved Pricing Architecture
            </h3>
            <p style={{ fontSize: '17px', fontWeight: '700', color: '#111111', marginBottom: '16px' }}>
              {report.pricingStrategy}
            </p>
            <span style={{ fontSize: '13px', color: '#666666' }}>
              Synthesized by Market, Product & Finance Agent consensus.
            </span>
          </div>

          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#666666', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>
              Unit Economics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
              <div><strong>Blended ARPU:</strong> {report.unitEconomics.arpu}</div>
              <div><strong>Est. CAC:</strong> {report.unitEconomics.cac}</div>
              <div><strong>LTV:</strong> {report.unitEconomics.ltv}</div>
              <div><strong>LTV/CAC Ratio:</strong> <strong style={{ color: '#10b981' }}>{report.unitEconomics.ltvCacRatio}</strong></div>
            </div>
          </div>
        </section>

        {/* SECTION 6: RISKS & ACTIONABLE NEXT STEPS */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#666666', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
              Key Risks & Mitigations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {report.risksAndMitigation.map((r, idx) => (
                <div key={idx} style={{ fontSize: '14px' }}>
                  <strong style={{ color: '#111111' }}>Risk:</strong> {r.risk}<br />
                  <span style={{ color: '#555555' }}>→ <strong>Mitigation:</strong> {r.mitigation}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#161616', color: '#ffffff', borderRadius: '20px', padding: '28px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#aaaaaa', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
              Actionable Next Steps
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {report.nextSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <ArrowUpRight size={16} style={{ color: '#ffffff', flexShrink: 0 }} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};

export default FinalStrategy;
