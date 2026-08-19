import Link from "next/link";
import {
  aiInsights,
  forecastBars,
  integrations,
  moneyMetrics,
  transactions,
} from "@/lib/finance-data";

const actions = [
  "Approve payroll reserve transfer",
  "Request missing Amex receipt",
  "Review founder mixed-use split",
  "Send overdue invoice nudges",
];

const goals = [
  { name: "Series A runway", progress: 74, target: "24 months target" },
  { name: "Tax reserve", progress: 61, target: "$180K reserved" },
  { name: "Home down payment", progress: 82, target: "$325K target" },
];

export default function Dashboard() {
  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">K</span>
          <span>Kira Finance</span>
        </Link>
        <nav aria-label="Dashboard navigation">
          <a className="active" href="#overview">Overview</a>
          <a href="#cashflow">Cash flow</a>
          <a href="#wealth">Personal wealth</a>
          <a href="#integrations">Integrations</a>
          <a href="#transactions">Transactions</a>
        </nav>
        <div className="advisor-card">
          <span className="spark">AI</span>
          <h2>Daily brief ready</h2>
          <p>
            Kira found 7 decisions that can improve runway, savings yield, and
            bookkeeping accuracy this week.
          </p>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Wednesday command brief</p>
            <h1>Finance cockpit</h1>
          </div>
          <div className="header-actions">
            <button type="button">Sync feeds</button>
            <button type="button" className="primary-button compact">
              Ask Kira
            </button>
          </div>
        </header>

        <section id="overview" className="dashboard-metrics" aria-label="Overview metrics">
          {moneyMetrics.map((metric) => (
            <article key={metric.label} className={`metric-card ${metric.tone}`}>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <span>{metric.delta}</span>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article id="cashflow" className="panel large-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Cash flow forecast</p>
                <h2>Operating runway improves if receivables land by Oct 12.</h2>
              </div>
              <span className="health-badge">18.4 mo</span>
            </div>
            <div className="forecast-chart" aria-label="Six month cash-flow forecast">
              {forecastBars.map((bar) => (
                <div key={bar.month}>
                  <span style={{ height: `${bar.value}%` }} />
                  <p>{bar.month}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel action-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Autopilot queue</p>
                <h2>Recommended actions</h2>
              </div>
            </div>
            <div className="action-list">
              {actions.map((action, index) => (
                <label key={action}>
                  <input type="checkbox" defaultChecked={index === 0} />
                  <span>{action}</span>
                </label>
              ))}
            </div>
          </article>

          <article id="wealth" className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Personal finance</p>
                <h2>Goals and reserves</h2>
              </div>
            </div>
            <div className="goal-list">
              {goals.map((goal) => (
                <div key={goal.name} className="goal-row">
                  <div>
                    <strong>{goal.name}</strong>
                    <span>{goal.target}</span>
                  </div>
                  <div className="progress-track" aria-label={`${goal.name} ${goal.progress}%`}>
                    <span style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel insight-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">AI insights</p>
                <h2>Highest impact recommendations</h2>
              </div>
            </div>
            <div className="insight-stack compact-stack">
              {aiInsights.map((insight) => (
                <article className="insight-card" key={insight.title}>
                  <span>Signal</span>
                  <h3>{insight.title}</h3>
                  <p>{insight.detail}</p>
                  <strong>{insight.impact}</strong>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-grid bottom-grid">
          <article id="transactions" className="panel large-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Smart ledger</p>
                <h2>Recent money movement</h2>
              </div>
              <button type="button">Export</button>
            </div>
            <div className="transaction-table">
              {transactions.map((transaction) => (
                <div key={`${transaction.merchant}-${transaction.account}`} className="transaction-row">
                  <div>
                    <strong>{transaction.merchant}</strong>
                    <span>{transaction.account}</span>
                  </div>
                  <span className="transaction-type">{transaction.type}</span>
                  <p>{transaction.signal}</p>
                  <strong>{transaction.amount}</strong>
                </div>
              ))}
            </div>
          </article>

          <article id="integrations" className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Connections</p>
                <h2>Integration health</h2>
              </div>
            </div>
            <div className="integration-list">
              {integrations.map((integration) => (
                <div key={integration.name}>
                  <span>{integration.category}</span>
                  <strong>{integration.name}</strong>
                  <p className={`status status-${integration.status.toLowerCase()}`}>
                    {integration.status}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
