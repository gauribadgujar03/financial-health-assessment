import { useMemo, useState } from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

const initialForm = {
  revenue: '',
  expenses: '',
  assets: '',
  liabilities: '',
  cash_flow: '',
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [summary, setSummary] = useState(null);
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hasValues = useMemo(
    () => Object.values(form).some((v) => v !== ''),
    [form]
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onReset = () => {
    setForm(initialForm);
    setSummary(null);
    setRecommendations('');
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSummary(null);
    setRecommendations('');

    const payload = {};
    for (const [key, value] of Object.entries(form)) {
      const num = Number(value);
      if (!Number.isFinite(num)) {
        setError('Please enter valid numbers for all fields.');
        return;
      }
      payload[key] = num;
    }

    if (payload.revenue === 0 || payload.expenses === 0 || payload.assets === 0) {
      setError('Revenue, expenses, and assets must be greater than 0.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed.');
      }

      const data = await res.json();
      setSummary(data.summary || null);
      setRecommendations(data.recommendations || '');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Financial Health Assessment</p>
          <h1>Turn raw numbers into a clear risk snapshot.</h1>
          <p className="subhead">
            Enter your latest financial figures to calculate margins, debt ratio,
            and an overall risk score. The backend can also generate actionable
            recommendations when your OpenAI key is configured.
          </p>
        </div>
        <div className="hero-card">
          <p className="label">API Base</p>
          <p className="value">{API_BASE}</p>
          <p className="hint">Set `REACT_APP_API_BASE` in Vercel to override.</p>
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <h2>Input</h2>
          <form onSubmit={onSubmit} className="form">
            <label>
              Revenue
              <input
                name="revenue"
                value={form.revenue}
                onChange={onChange}
                placeholder="e.g., 120000"
                inputMode="decimal"
              />
            </label>
            <label>
              Expenses
              <input
                name="expenses"
                value={form.expenses}
                onChange={onChange}
                placeholder="e.g., 85000"
                inputMode="decimal"
              />
            </label>
            <label>
              Assets
              <input
                name="assets"
                value={form.assets}
                onChange={onChange}
                placeholder="e.g., 250000"
                inputMode="decimal"
              />
            </label>
            <label>
              Liabilities
              <input
                name="liabilities"
                value={form.liabilities}
                onChange={onChange}
                placeholder="e.g., 120000"
                inputMode="decimal"
              />
            </label>
            <label>
              Cash Flow
              <input
                name="cash_flow"
                value={form.cash_flow}
                onChange={onChange}
                placeholder="e.g., 15000"
                inputMode="decimal"
              />
            </label>

            {error ? <p className="error">{error}</p> : null}

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Analyzing…' : 'Analyze'}
              </button>
              <button
                type="button"
                className="ghost"
                onClick={onReset}
                disabled={!hasValues && !summary}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="panel">
          <h2>Results</h2>
          {!summary ? (
            <div className="empty">
              <p>No results yet.</p>
              <p className="muted">Run an analysis to see your metrics.</p>
            </div>
          ) : (
            <div className="results">
              <div>
                <p className="label">Profit Margin</p>
                <p className="value">{summary.profit_margin}%</p>
              </div>
              <div>
                <p className="label">Debt Ratio</p>
                <p className="value">{summary.debt_ratio}</p>
              </div>
              <div>
                <p className="label">Risk Score</p>
                <p className="value">{summary.risk_score}</p>
              </div>
            </div>
          )}

          <div className="recommendations">
            <h3>Recommendations</h3>
            {recommendations ? (
              <p>{recommendations}</p>
            ) : (
              <p className="muted">
                No recommendations yet. Ensure the backend has `OPENAI_API_KEY` set.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
