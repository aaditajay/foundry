// Strategy Data Generator for FOUNDry AI Startup Platform

export const sampleIdeas = [
  {
    title: "CampusBite — Quick Meal Subscriptions for University Students",
    description: "A hyper-local food subscription app partnering with campus messes and local cloud kitchens to offer wholesome meals at flat ₹99/meal with 10-minute pickup points.",
    location: "Bengaluru, India",
    budget: "₹1,50,000 Initial Seed",
    additionalInfo: "Targeting 5 major university hubs initially. Needs high daily order volume.",
    date: "2026-09-18"
  },
  {
    title: "DevSprint AI — Automated PR Review & Security Scanner",
    description: "Autonomous GitHub bot that reads pull requests, executes static code analysis, suggests performance optimizations, and verifies security compliance before merge.",
    location: "Global / Remote",
    budget: "$10,000 Cloud credits",
    additionalInfo: "Developer tool space with existing competitors like SonarQube and CodeClimate.",
    date: "2026-09-15"
  }
];

export const generateStrategyData = (ideaInput, location = "India / Global", budget = "Flexible") => {
  const ideaTitle = ideaInput.length > 50 ? ideaInput.substring(0, 50) + "..." : ideaInput;
  
  return {
    meta: {
      id: "strat_" + Math.random().toString(36).substring(2, 9),
      title: ideaTitle || "Untitled Startup Idea",
      ideaText: ideaInput,
      location,
      budget,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },

    agents: {
      market: {
        name: "MARKET AGENT",
        role: "Understanding customers and competition",
        status: "Completed",
        avatar: "📊",
        progress: 100,
        checks: [
          { text: "Target user personas & pain points identified", done: true },
          { text: "Competitor landscape & pricing benchmarked", done: true },
          { text: "Total Addressable Market (TAM) calculated", done: true }
        ],
        insights: [
          "Primary demographic displays strong willingness to adopt digital-first solutions.",
          "Key customer sensitivity: Upfront cost vs value realization timeline.",
          "Unmet market gap: Existing competitors overcharge for enterprise-only features."
        ]
      },

      product: {
        name: "PRODUCT AGENT",
        role: "Shaping the solution & MVP scope",
        status: "Completed",
        avatar: "⚡",
        progress: 100,
        checks: [
          { text: "Core value proposition articulated", done: true },
          { text: "MVP feature set & user journey mapped", done: true },
          { text: "Technical stack & architecture defined", done: true }
        ],
        insights: [
          "MVP must prioritize ultra-fast onboarding (< 60 seconds).",
          "High-touch premium tier required to support custom integrations and white-labeling.",
          "Core differentiator relies on real-time feedback loops and automated workflows."
        ]
      },

      finance: {
        name: "FINANCE AGENT",
        role: "Testing economic feasibility & unit economics",
        status: "Completed",
        avatar: "📈",
        progress: 100,
        checks: [
          { text: "Unit economics & margin targets evaluated", done: true },
          { text: "Pricing model & CAC/LTV projection set", done: true },
          { text: "Burn rate & cash flow break-even timeline", done: true }
        ],
        insights: [
          "Minimum required Average Revenue Per User (ARPU) is ₹149 / $15 per month for profitability.",
          "Customer Acquisition Cost (CAC) estimated at 3.2x monthly subscription value.",
          "Payback period target: 4.5 months based on organic referral loops."
        ]
      }
    },

    cooperation: {
      dialogue: [
        {
          agent: "PRODUCT",
          avatar: "⚡",
          message: "Our premium experience requires a comprehensive tier priced at ₹199 / $20 per month to cover infrastructural compute and feature development.",
          tone: "ambitious"
        },
        {
          agent: "MARKET",
          avatar: "📊",
          message: "Our target audience survey indicates severe price sensitivity. Pricing above ₹120 / $12 creates an 82% drop-off in user conversion during onboarding.",
          tone: "cautious"
        },
        {
          agent: "FINANCE",
          avatar: "📈",
          message: "A single price point below ₹150 / $15 leads to negative gross margins after customer acquisition and server overhead costs.",
          tone: "analytical"
        }
      ],
      conflictDetected: {
        title: "Pricing & Positioning Friction Detected",
        summary: "Product Agent's high price requirement conflicts directly with Market Agent's price sensitivity data, while Finance Agent warns against sub-₹150 pricing.",
        severity: "High Impact on Go-To-Market Strategy"
      }
    },

    resolution: {
      title: "FOUNDry Multi-Tier Compromise Engine",
      beforeState: {
        product: "₹199 / $20 Fixed Premium Pricing",
        market: "Target users prefer ₹80 - ₹120 ($8 - $12)",
        finance: "Requires minimum ₹150 ($15) unit revenue for viability"
      },
      afterState: {
        tiers: [
          { name: "Basic Tier", price: "₹99 / $9.99", desc: "Essential features, high conversion driver for market capture." },
          { name: "Pro Tier", price: "₹149 / $14.99", desc: "Core feature set, optimized for mass adoption & financial viability." },
          { name: "Enterprise / Premium", price: "₹299 / $29.99", desc: "Unlocks advanced features, subsidizing basic tier users." }
        ],
        alignments: [
          { agent: "Market", status: "Aligned (Entry barrier removed with ₹99 tier)" },
          { agent: "Product", status: "Adapted (Feature gating protects premium value)" },
          { agent: "Finance", status: "Recalculated (Blended ARPU reaches ₹168 - profitable)" }
        ]
      }
    },

    strategyReport: {
      executiveSummary: `${ideaInput} represents a high-potential venture operating in an expanding market segment. By combining streamlined product execution with a multi-tiered pricing architecture resolved through multi-agent critique, the startup is positioned to achieve cash-flow positivity within 8 months of launch.`,
      targetMarket: {
        segment: "Early Adopter Tech Enthusiasts & Budget-Conscious Professionals",
        tam: "₹4,200 Cr ($500M) Total Addressable Market",
        sam: "₹650 Cr ($80M) Serviceable Addressable Market",
        som: "₹45 Cr ($5.5M) Serviceable Obtainable Market (Year 2)"
      },
      problem: "Target customers currently suffer from overly complex, expensive incumbents with steep learning curves and fragmented feature offerings.",
      solution: "A unified, frictionless platform that delivers instant value with minimalist design, automated execution, and affordable tiered entry points.",
      mvpScope: [
        "One-click user onboarding with automated configuration",
        "Core workflow engine with real-time status tracking",
        "Exportable reports and team sharing capabilities",
        "Essential analytics dashboard for tracking usage"
      ],
      pricingStrategy: "Hybrid Freemium / Tiered Monthly Subscription (₹99 Basic / ₹149 Pro / ₹299 Enterprise)",
      unitEconomics: {
        arpu: "Blended ₹168 / month",
        cac: "₹380 estimated via targeted organic channels",
        ltv: "₹2,180 based on 13-month estimated retention",
        ltvCacRatio: "5.7x (Extremely Healthy)"
      },
      risksAndMitigation: [
        { risk: "Incumbent pricing reduction", mitigation: "Maintain agility & faster feature deployment cycles" },
        { risk: "User drop-off after trial", mitigation: "Gamified onboarding & instant time-to-value triggers" },
        { risk: "Server infra cost scaling", mitigation: "Optimized serverless backend & smart caching" }
      ],
      nextSteps: [
        "Finalize interactive clickable prototype (Week 1-2)",
        "Deploy landing page to collect waitlist signups (Week 2-3)",
        "Build MVP core engine and beta test with 50 pilot users (Week 4-6)",
        "Launch v1.0 GTM campaign on ProductHunt & tech communities (Week 7)"
      ]
    }
  };
};
