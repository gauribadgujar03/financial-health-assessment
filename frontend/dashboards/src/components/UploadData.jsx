import { analyzeData } from "../services/api";

export default function UploadData({ setResult }) {
  const sampleData = {
    revenue: 100000,
    expenses: 70000,
    cash_flow: 20000,
    assets: 150000,
    liabilities: 60000
  };

  const handleAnalyze = async () => {
    const res = await analyzeData(sampleData);
    setResult(res.data);
  };

  return <button onClick={handleAnalyze}>Analyze Financial Health</button>;
}
