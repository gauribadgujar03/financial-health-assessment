import UploadData from "../components/UploadData";
import FinancialSummary from "../components/FinancialSummary";
import Recommendations from "../components/Recommendations";
import { useState } from "react";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <>
      <UploadData setResult={setResult} />
      {result && <FinancialSummary data={result.summary} />}
      {result && <Recommendations text={result.recommendations} />}
    </>
  );
}
