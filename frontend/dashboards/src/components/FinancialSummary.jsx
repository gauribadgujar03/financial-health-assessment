export default function FinancialSummary({ data }) {
  return (
    <div>
      <h3>Financial Summary</h3>
      <p>Profit Margin: {data.profit_margin}%</p>
      <p>Debt Ratio: {data.debt_ratio}</p>
      <p>Risk Score: {data.risk_score}</p>
    </div>
  );
}
