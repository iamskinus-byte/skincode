import Link from "next/link";
import {
  aiInsights,
  integrations,
  moneyMetrics,
  transactions,
} from "@/lib/finance-data";

const pillars = [
  "Business spend controls",
  "Personal net-worth tracking",
  "AI cash-flow forecasting",
  "Accounting and banking sync",
];

const productAreas = [
  {
    eyebrow: "Command",
    title: "One operating cockpit for every entity",
    copy: "Unify company accounts, founder finances, cards, AP, invoices, investments, and policies without forcing teams into separate tools.",
  },
  {
    eyebrow: "Autopilot",
    title: "AI turns finance noise into next actions",
    copy: "Kira monitors cash movement, vendor drift, runway, taxes, personal goals, and anomalies to recommend work before it becomes urgent.",
  },
  {
    eyebrow: "Control",
    title: "Governance for business and personal money",
    copy: "Entity-aware rules, approval flows, audit trails, and smart categorization keep books cleaner while protecting personal privacy.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <span className="brand-mark">K</span>
          <span>Kira Finance</span>
        </Link>
        <div className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#insights">AI Insights</a>
          <a href="#integrations">Integrations</a>
        </div>
        <Link className="nav-cta" href="/dashboard">
          Open demo
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI finance OS for builders, operators, and families</p>
          <h1>Run business cash flow and personal wealth from one intelligent command center.</h1>
          <p className="hero-lede">
            Kira Finance blends Qashio-grade spend management with banking, accounting,
            investments, forecasting, and an always-on AI analyst that explains what changed,
            why it matters, and what to do next.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/dashboard">
              Explore the command center
            </Link>
            <a className="secondary-button" href="#platform">
              View capabilities
            </a>
          </div>
          <div className="pillar-grid" aria-label="Core capabilities">
            {pillars.map((pillar) => (
              <span key={pillar}>{pillar}</span>
            ))}
          </div>
        </div>

        <aside className="hero-card" aria-label="Finance command preview">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="glass-panel balance-panel">
            <div>
              <p className="muted-label">Unified liquidity</p>
              <strong>$1,284,620</strong>
            </div>
            <span className="health-badge">Healthy</span>
          </div>
          <div className="mini-chart" aria-hidden="true">
            <span style={{ height: "46%" }} />
            <span style={{ height: "72%" }} />
            <span style={{ height: "54%" }} />
            <span style={{ height: "88%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "96%" }} />
          </div>
          <div className="ai-note">
            <span className="spark">AI</span>
            <p>
              Move $210K idle cash into a 41-day ladder after payroll clears.
              Yield opportunity: <strong>$8.9K</strong>.
            </p>
          </div>
        </aside>
      </section>

      <section className="metric-strip" aria-label="Finance metrics">
        {moneyMetrics.map((metric) => (
          <article key={metric.label} className={`metric-card ${metric.tone}`}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.delta}</span>
          </article>
        ))}
      </section>

      <section id="platform" className="section-grid">
        <div>
          <p className="eyebrow">Platform depth</p>
          <h2>Beyond expense cards: every financial workflow in context.</h2>
        </div>
        <div className="feature-grid">
          {productAreas.map((area) => (
            <article className="feature-card" key={area.title}>
              <span>{area.eyebrow}</span>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="insights" className="split-section">
        <div>
          <p className="eyebrow">Kira AI analyst</p>
          <h2>Insight cards designed for decisions, not dashboards.</h2>
          <p className="section-copy">
            Each recommendation links the source transaction, bank feed, invoice,
            policy, and historical pattern so operators can act with confidence.
          </p>
        </div>
        <div className="insight-stack">
          {aiInsights.map((insight) => (
            <article className="insight-card" key={insight.title}>
              <span>Recommended</span>
              <h3>{insight.title}</h3>
              <p>{insight.detail}</p>
              <strong>{insight.impact}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="integrations" className="terminal-section">
        <div className="terminal-header">
          <div>
            <p className="eyebrow">Connected graph</p>
            <h2>Live integrations across revenue, banking, spend, books, and wealth.</h2>
          </div>
          <Link className="secondary-button" href="/dashboard">
            See full dashboard
          </Link>
        </div>
        <div className="integration-grid">
          {integrations.map((integration) => (
            <article className="integration-card" key={integration.name}>
              <span>{integration.category}</span>
              <h3>{integration.name}</h3>
              <p className={`status status-${integration.status.toLowerCase()}`}>
                {integration.status}
              </p>
            </article>
          ))}
        </div>
        <div className="transaction-preview">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.merchant}>
              <span>{transaction.type}</span>
              <strong>{transaction.merchant}</strong>
              <p>{transaction.signal}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
